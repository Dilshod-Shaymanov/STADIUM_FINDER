import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStadiumDto } from "./dto/create-stadium.dto";
import { UpdateStadiumDto } from "./dto/update-stadium.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Stadium } from "./models/stadium.model";

@Injectable()
export class StadiumService {
  constructor(@InjectModel(Stadium) private stadiumModel: typeof Stadium) {}

  async create(createStadiumDto: CreateStadiumDto): Promise<Stadium> {
    return this.stadiumModel.create(createStadiumDto);
  }

  async findAll(): Promise<Stadium[]> {
    return this.stadiumModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Stadium> {
    const stadium = await this.stadiumModel.findByPk(id, {
      include: { all: true },
    });
    if (!stadium) {
      throw new NotFoundException(`Stadium with ID ${id} not found`);
    }
    return stadium;
  }

  async update(
    id: number,
    updateStadiumDto: UpdateStadiumDto
  ): Promise<Stadium> {
    const [affectedRows, [updatedStadium]] = await this.stadiumModel.update(
      updateStadiumDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (!affectedRows) {
      throw new NotFoundException(`Stadium with ID ${id} not found`);
    }
    return updatedStadium;
  }

  async remove(id: number): Promise<void> {
    const affectedRows = await this.stadiumModel.destroy({ where: { id } });
    if (!affectedRows) {
      throw new NotFoundException(`Stadium with ID ${id} not found`);
    }
  }
}
