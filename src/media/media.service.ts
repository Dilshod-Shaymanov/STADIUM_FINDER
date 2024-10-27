import { Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./models/media.model";

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaModel: typeof Media) {}

  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediaModel.create(createMediaDto);
  }

  async findAll(): Promise<Media[]> {
    return this.mediaModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Media> {
    return this.mediaModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaModel.update(updateMediaDto, {
      where: { id },
      returning: true,
    });
    return media[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.mediaModel.destroy({ where: { id } });
  }
}
