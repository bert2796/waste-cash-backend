import {
  Controller,
  Get,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Req,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { UserRoles } from '../../../common/constant';
import { CreateProductInputDto } from '../dtos';
import { CreateBidderSetupInputDto } from '../../bidderSetup/dtos';
import { CreateProductOfferInputDto } from '../../productOffer/dtos';
import { CreateReviewInputDto } from '../../review/dtos';
import { BidderSetup } from '../../bidderSetup/entities/bidderSetup.entity';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../user/entities/user.entity';
import { ProductOffer } from '../../productOffer/entities/productOffer.entity';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Products API
  @UseInterceptors(FileInterceptor('image'))
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.SELLER])
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() input: CreateProductInputDto,
    @Req() req: { user: User }
  ): Promise<Product> {
    const { user } = req;

    return await this.productService.createProduct({ input, image, owner: user });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query() query: Partial<Product>): Promise<Product[]> {
    return await this.productService.getProducts(query);
  }

  @Get('/owners')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async getProductsByOwner(@Query() query: Partial<Product>, @Req() req: { user: User }): Promise<Product[]> {
    const { user } = req;

    return await this.productService.getProductsByOwner(user, query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.getProduct(+id);
  }

  // Product Offers API
  @Post('/:id/offers')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.BUYER])
  async createProductOffer(
    @Param('id') id: string,
    @Body() input: CreateProductOfferInputDto,
    @Req() req: { user: User }
  ): Promise<ProductOffer> {
    const { user } = req;

    return await this.productService.createProductOffer({ productId: +id, input, user });
  }

  @Patch('/:productId/offers/:productOfferId')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async updatedProductOffer(
    @Param('productId') productId: string,
    @Param('productOfferId') productOfferId: string,
    @Body() input: Partial<ProductOffer>,
    @Req() req: { user: User }
  ): Promise<ProductOffer> {
    const { user } = req;

    return await this.productService.updateProductOffer({
      productId: +productId,
      productOfferId: +productOfferId,
      input,
      user,
    });
  }

  // Product Bidder Setups API
  @Post('/:id/bidderSetups')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.SELLER])
  async createBidderSetup(
    @Param('id') id: string,
    @Body() input: CreateBidderSetupInputDto,
    @Req() req: { user: User }
  ): Promise<BidderSetup> {
    console.log(input);

    const { user } = req;

    return await this.productService.createBidderSetup({ productId: +id, input, user });
  }

  @Patch('/:productId/bidderSetups/:bidderSetupId')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async updateBidderSetup(
    @Param('productId') productId: string,
    @Param('bidderSetupId') bidderSetupId: string,
    @Body() input: Partial<BidderSetup>,
    @Req() req: { user: User }
  ): Promise<BidderSetup> {
    const { user } = req;

    return await this.productService.updateBidderSetup({
      productId: +productId,
      bidderSetupId: +bidderSetupId,
      input,
      user,
    });
  }

  // Review API
  @Post('/:id/reviews')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.BUYER])
  async createReview(
    @Param('id') id: string,
    @Body() input: CreateReviewInputDto,
    @Req() req: { user: User }
  ): Promise<Review> {
    const { user } = req;

    return await this.productService.createReview({ productId: +id, input, user });
  }
}
