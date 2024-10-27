import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortModel: typeof Comfort) {}

  async create(createComfortDto: CreateComfortDto): Promise<Comfort> {
    return this.comfortModel.create(createComfortDto);
  }

  async findAll(): Promise<Comfort[]> {
    return this.comfortModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Comfort> {
    return this.comfortModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateComfortDto: UpdateComfortDto): Promise<Comfort> {
    const comfort = await this.comfortModel.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    return comfort[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.comfortModel.destroy({where: {id}});
  }
}
