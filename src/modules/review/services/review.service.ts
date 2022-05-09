import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateReviewInputDto } from '../dtos';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { ReviewRepository } from '../repositories/review.repository';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(params: { input: CreateReviewInputDto; product: Product; user: User }): Promise<Review> {
    const { input, product, user } = params;
    let review = await this.reviewRepository.findOne({ reviewer: user, product });
    if (review) {
      throw new BadRequestException('Review is already existing.');
    }

    review = new Review();
    review.product = product;
    review.reviewer = user;
    review.reviewee = product.owner;
    review.rate = input.rate;
    review.feedback = input.feedback || '';

    return await this.reviewRepository.save(review);
  }

  async getReviews(user: User): Promise<Review[]> {
    return await this.reviewRepository.find({ where: { reviewee: user }, relations: ['reviewee', 'reviewer'] });
  }

  async updateReview(params: { reviewId: number; input: Partial<Review> }): Promise<Review> {
    const { reviewId, input } = params;
    const review = await this.reviewRepository.findOne(reviewId);
    if (!review) {
      throw new BadRequestException('Review does not exist.');
    }

    review.rate = input.rate;

    return await this.reviewRepository.save(review, { reload: true });
  }
}
