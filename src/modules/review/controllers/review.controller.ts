import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { UserRoles } from '../../../common/constant';
import { Review } from '../../review/entities/review.entity';
import { User } from '../../user/entities/user.entity';
import { ReviewService } from '../services/review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async getReviews(@Req() req: { user: User }): Promise<Review[]> {
    const { user } = req;

    return await this.reviewService.getReviews(user);
  }
}
