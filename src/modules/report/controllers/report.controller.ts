import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { UserRoles } from '../../../common/constant';
import { User } from '../../user/entities/user.entity';
import { ReportService } from '../services/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/monthly-sales')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async getMonthlySales(@Req() req: { user: User }): Promise<{ [key: string]: { total: number } }> {
    const { user } = req;

    return await this.reportService.getMonthlySales(user.id);
  }

  @Get('/monthly-clicks')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async getMonthlyClicks(@Req() req: { user: User }): Promise<{ [key: string]: { total: number } }> {
    const { user } = req;

    return await this.reportService.getMonthlyClicks(user.id);
  }
}
