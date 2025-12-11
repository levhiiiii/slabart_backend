import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FinancialService } from './financial.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Financial Setup')
@Controller('financial')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  // Save salary data during onboarding
  @Post('salary')
  @ApiOperation({ summary: 'Save salary data during onboarding' })
  async saveSalary(@Body() data: any, @Request() req) {
    return this.financialService.saveSalary(data, req.user.sub);
  }

  // Save income sources during onboarding
  @Post('income-sources')
  @ApiOperation({ summary: 'Save income sources during onboarding' })
  async saveIncomeSources(@Body() data: any, @Request() req) {
    return this.financialService.saveIncomeSources(data, req.user.sub);
  }

  // Save loans data during onboarding
  @Post('loans')
  @ApiOperation({ summary: 'Save loans/EMI data during onboarding' })
  async saveLoans(@Body() data: any, @Request() req) {
    return this.financialService.saveLoans(data, req.user.sub);
  }

  // Save borrowed data during onboarding
  @Post('borrowed')
  @ApiOperation({ summary: 'Save borrowed/lent data during onboarding' })
  async saveBorrowed(@Body() data: any, @Request() req) {
    return this.financialService.saveBorrowed(data, req.user.sub);
  }

  // Save goals during onboarding
  @Post('goals')
  @ApiOperation({ summary: 'Save financial goals during onboarding' })
  async saveGoals(@Body() data: any, @Request() req) {
    return this.financialService.saveGoals(data, req.user.sub);
  }

  // Save expense categories during onboarding
  @Post('expense-categories')
  @ApiOperation({ summary: 'Save expense categories during onboarding' })
  async saveExpenseCategories(@Body() data: any, @Request() req) {
    return this.financialService.saveExpenseCategories(data, req.user.sub);
  }

  // Save all financial setup data at once
  @Post('setup')
  @ApiOperation({ summary: 'Save all financial setup data at once' })
  async saveAllSetupData(@Body() data: any, @Request() req) {
    return this.financialService.saveAllSetupData(data, req.user.sub);
  }

  // Mark setup as complete
  @Post('setup/complete')
  @ApiOperation({ summary: 'Mark financial setup as complete' })
  async completeSetup(@Request() req) {
    return this.financialService.completeSetup(req.user.sub);
  }

  // Get all financial data
  @Get('setup')
  @ApiOperation({ summary: 'Get all financial setup data' })
  async getSetupData(@Request() req) {
    return this.financialService.getSetupData(req.user.sub);
  }
}
