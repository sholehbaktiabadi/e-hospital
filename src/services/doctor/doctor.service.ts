import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './model/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  ) {}

  async find() {
    return await this.doctorRepository.find();
  }

  async findOne(id: number) {
    return await this.doctorRepository.findOneOrFail(id);
  }

  async create(data: DoctorDto) {
    const entity = new Doctor();
    entity.name = data.name;
    entity.title = data.title;
    entity.spesialis = data.spesialis;
    entity.npa = data.npa;
    entity.phone_number = data.phone_number;
    try {
      return await this.doctorRepository.save(entity);
    } catch (error) {
      return error;
    }
  }

  async update(id: number, data: DoctorDto) {
    const selected = await this.doctorRepository.findOne(id);
    selected.name = data.name ? data.name : selected.name;
    selected.title = data.title ? data.title : selected.title;
    selected.spesialis = data.spesialis ? data.spesialis : selected.spesialis;
    selected.phone_number = data.phone_number
      ? data.phone_number
      : selected.phone_number;
    selected.npa = data.npa ? data.npa : selected.npa;
    try {
      return await this.doctorRepository.save(selected);
    } catch (error) {
      return error;
    }
  }

  async delete(id: number) {
    return await this.doctorRepository.delete(id);
  }
}
