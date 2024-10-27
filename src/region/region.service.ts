import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionModel: typeof Region) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionModel.create(createRegionDto);
  }

  async findAll(): Promise<Region[]> {
    return this.regionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Region> {
    return this.regionModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionModel.update(updateRegionDto, {
      where: { id },
      returning: true,
    });
    return region[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.regionModel.destroy({ where: { id } });
  }
}
