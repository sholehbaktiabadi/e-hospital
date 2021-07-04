import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../user-auth/jwt-auth.guard';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';

@UseGuards(JwtAuthGuard)
@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Get()
  async find() {
    return this.doctorService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  @Post()
  async create(@Body() data: DoctorDto) {
    return this.doctorService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: DoctorDto) {
    return this.doctorService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.doctorService.delete(id);
  }
}
