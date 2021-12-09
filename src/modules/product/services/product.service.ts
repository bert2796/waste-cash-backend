import { BadRequestException, Injectable } from '@nestjs/common';

import { ProductStatus, ProductOfferStatus } from '../../../common/constant';
import { CreateProductInputDto } from '../dtos';
import { CreateProductOfferInputDto } from '../../productOffer/dtos';
import { CategoryService } from '../../category/services/category.service';
import { ProductOfferService } from '../../productOffer/services/productOffer.service';
import { SpaceService } from '../../space/services/space.service';
import { ProductOffer } from '../../productOffer/entities/productOffer.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { randomString, slugify } from '../../../common/utils';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productOfferService: ProductOfferService,
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
      input: { category: categoryName, description, name, price, status },
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

    // create product
    const product = new Product();
    product.category = category;
    product.owner = owner;
    product.description = description;
    product.name = name;
    product.price = +price;
    product.slug = slug;
    product.status = status;
    product.thumbnail = uploadedImage.Location;

    return await this.productRepository.save(product);
  }

  async updateProduct(params: { productId: number; input: Partial<Product> }): Promise<Product> {
    const {
      productId,
      input: { status, bidder },
    } = params;
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new BadRequestException('Product does not exist.');
    }

    product.status = status || product.status;
    product.bidder = bidder || product.bidder;

    return await this.productRepository.save(product);
  }

  async getProducts(filter?: Partial<Product>): Promise<Product[]> {
    return await this.productRepository.findProducts({ filter });
  }

  async getProductsByOwner(owner: User, filter?: Partial<Product>): Promise<Product[]> {
    return await this.productRepository.findProducts({ filter, owner });
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['category', 'owner', 'bidder', 'offers', 'offers.user'],
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

    // update product status
    if (input.status === ProductOfferStatus.ACCEPTED) {
      await this.updateProduct({
        productId: product.id,
        input: { status: ProductStatus.SOLD, bidder: productOffer.user },
      });
    }

    return productOffer;
  }
}
