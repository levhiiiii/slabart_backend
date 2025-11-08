import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SalaryService } from './salary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Salary')
@Controller('salary')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all salaries' })
  async findAll(@Request() req) {
    return this.salaryService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get salary by ID' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.salaryService.findOne(id, req.user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Create new salary' })
  async create(@Body() data: any, @Request() req) {
    return this.salaryService.create(data, req.user.sub);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update salary' })
  async update(@Param('id') id: string, @Body() data: any, @Request() req) {
    return this.salaryService.update(id, data, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete salary' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.salaryService.delete(id, req.user.sub);
  }
}
