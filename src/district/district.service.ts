import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtModel: typeof District) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    return this.districtModel.create(createDistrictDto);
  }

  async findAll(): Promise<District[]> {
    return this.districtModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<District> {
    return this.districtModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtModel.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
    return district[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.districtModel.destroy({ where: { id } });
  }
}
