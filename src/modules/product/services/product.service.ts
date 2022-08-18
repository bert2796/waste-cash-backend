import { BadRequestException, Injectable } from '@nestjs/common';

import { ProductStatus, ProductOfferStatus } from '../../../common/constant';
import { CreateProductInputDto } from '../dtos';
import { CreateBidderSetupInputDto } from '../../bidderSetup/dtos';
import { CreateProductOfferInputDto } from '../../productOffer/dtos';
import { CreateReviewInputDto } from '../../review/dtos';
import { AddressService } from '../../address/services/address.service';
import { BidderSetupService } from '../../bidderSetup/services/bidderSetup.service';
import { CategoryService } from '../../category/services/category.service';
import { ProductOfferService } from '../../productOffer/services/productOffer.service';
import { ReviewService } from '../../review/services/review.service';
import { SpaceService } from '../../space/services/space.service';
import { BidderSetup } from '../../bidderSetup/entities/bidderSetup.entity';
import { ProductOffer } from '../../productOffer/entities/productOffer.entity';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { randomString, slugify } from '../../../common/utils';

@Injectable()
export class ProductService {
  constructor(
    private readonly addressService: AddressService,
    private readonly bidderSetupService: BidderSetupService,
    private readonly categoryService: CategoryService,
    private readonly productOfferService: ProductOfferService,
    private readonly reviewService: ReviewService,
    private readonly spaceService: SpaceService,
    private readonly productRepository: ProductRepository
  ) {}

  // Products API
  async createProduct(params: {
    input: CreateProductInputDto;
    image: Express.Multer.File;
    owner: User;
  }): Promise<Product> {
    const {
      input: { category: categoryName, description, name, price, status, latitude, location, longitude },
      image,
      owner,
    } = params;

    // retrieve category
    const category = await this.categoryService.getCategoryByName(categoryName);

    // generate slug
    const slug = `${slugify(name)}-${randomString()}`;

    // upload file
    const fileExtension = image?.mimetype?.split('/')?.[1] || 'jpeg';
    const uploadedImage = await this.spaceService.uploadFile({
      bucket: 'wastecash/product_images',
      file: image,
      name: `${slug}.${fileExtension}`,
    });

    // create address
    const address = await this.addressService.createAddress({
      location,
      latitude,
      longitude,
    });

    // create product
    const product = new Product();
    product.address = address;
    product.category = category;
    product.owner = owner;
    product.description = description;
    product.name = name;
    product.price = +price;
    product.slug = slug;
    product.status = status;
    product.thumbnail = uploadedImage.Location;
    product.thumbnail = `${+new Date()}`;

    return await this.productRepository.save(product);
  }

  async updateProduct(params: { productId: number; input: Partial<Product> }): Promise<Product> {
    const {
      productId,
      input: { status, bidder, bidderSetup, offer, review },
    } = params;

    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new BadRequestException('Product does not exist.');
    }

    product.status = status || product.status;
    product.bidder = bidder || product.bidder;
    product.offer = offer || product.offer;
    product.bidderSetup = bidderSetup || product.bidderSetup;
    product.review = review || product.review;

    return await this.productRepository.save(product);
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.productRepository.softDelete(productId);
  }

  async getProducts(filter?: Partial<Product>): Promise<Product[]> {
    return await this.productRepository.findProducts({ filter });
  }

  async getProductsByOwner(owner: User, filter?: Partial<Product>): Promise<Product[]> {
    return await this.productRepository.findProducts({ filter, owner });
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: [
        'category',
        'owner',
        'bidder',
        'bidderSetup',
        'bidderSetup.address',
        'offer',
        'offers',
        'offers.user',
        'review',
      ],
    });
    if (!product) {
      throw new BadRequestException('Product does not exist.');
    }

    return product;
  }

  // Product Offers API
  async createProductOffer(params: {
    productId: number;
    input: CreateProductOfferInputDto;
    user: User;
  }): Promise<ProductOffer> {
    const { productId, input, user } = params;
    const product = await this.getProduct(productId);
    if (product.status === ProductStatus.SOLD) {
      throw new BadRequestException('Product is already sold.');
    }

    const productOffer = await this.productOfferService.createProductOffer({ input, product, user });

    return productOffer;
  }

  async updateProductOffer(params: {
    productId: number;
    productOfferId: number;
    input: Partial<ProductOffer>;
    user: User;
  }): Promise<ProductOffer> {
    const { productId, productOfferId, input, user } = params;
    const product = await this.getProduct(productId);
    if (product.owner.id !== user.id) {
      throw new BadRequestException('Product does not exist.');
    }

    // update product offer
    const productOffer = await this.productOfferService.updateProductOffer(productOfferId, input);

    if (input.status === ProductOfferStatus.ACCEPTED) {
      // update product status
      await this.updateProduct({
        productId: product.id,
        input: { status: ProductStatus.SOLD, bidder: productOffer.user, offer: productOffer },
      });

      const rejectedProductOffers = product.offers.filter((offer) => offer.id !== productOffer.id);
      if (rejectedProductOffers.length) {
        await Promise.all(
          rejectedProductOffers.map(async (offer) => {
            return await this.productOfferService.updateProductOffer(
              offer.id,
              { status: ProductOfferStatus.REJECTED },
              true
            );
          })
        );
      }
    }

    return productOffer;
  }

  // Product Bidder Setups API
  async createBidderSetup(params: {
    productId: number;
    input: CreateBidderSetupInputDto;
    user: User;
  }): Promise<BidderSetup> {
    const { productId, input, user } = params;
    const product = await this.getProduct(productId);
    if (product.owner.id !== user.id) {
      throw new BadRequestException('Product does not exist.');
    }

    const bidderSetup = await this.bidderSetupService.createBidderSetup({ product, input });

    await this.updateProduct({
      productId: product.id,
      input: { bidderSetup },
    });

    return bidderSetup;
  }

  async updateBidderSetup(params: {
    productId: number;
    bidderSetupId: number;
    input: Partial<BidderSetup>;
    user: User;
  }): Promise<BidderSetup> {
    const { productId, bidderSetupId, input, user } = params;
    const product = await this.getProduct(productId);
    if (product.owner.id !== user.id) {
      throw new BadRequestException('Product does not exist.');
    }

    // update bidder setup
    const bidderSetup = await this.bidderSetupService.updateBidderSetup(bidderSetupId, input);

    return bidderSetup;
  }

  // Review API
  async createReview(params: { productId: number; input: CreateReviewInputDto; user: User }): Promise<Review> {
    const { productId, input, user } = params;
    const product = await this.getProduct(productId);

    const review = await this.reviewService.createReview({ product, input, user });

    await this.updateProduct({
      productId,
      input: { review },
    });

    return review;
  }
}
