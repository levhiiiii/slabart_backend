import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get dashboard summary with all financial data' })
  @ApiResponse({
    status: 200,
    description: 'Returns aggregated dashboard data including balance, stats, spending, and transactions',
  })
  async getDashboardSummary(@Request() req) {
    return this.dashboardService.getDashboardSummary(req.user.sub);
  }
}
