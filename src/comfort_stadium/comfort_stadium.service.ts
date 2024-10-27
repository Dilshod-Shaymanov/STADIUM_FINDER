import { Injectable } from "@nestjs/common";
import { CreateComfortStadiumDto } from "./dto/create-comfort_stadium.dto";
import { UpdateComfortStadiumDto } from "./dto/update-comfort_stadium.dto";
import { InjectModel } from "@nestjs/sequelize";
import { ComfortStadium } from "./models/comfort_stadium.entity";

@Injectable()
export class ComfortStadiumService {
  constructor(
    @InjectModel(ComfortStadium)
    private comfortStadiumModel: typeof ComfortStadium
  ) {}

  async create(
    createComfortStadiumDto: CreateComfortStadiumDto
  ): Promise<ComfortStadium> {
    return this.comfortStadiumModel.create(createComfortStadiumDto);
  }

  async findAll(): Promise<ComfortStadium[]> {
    return this.comfortStadiumModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<ComfortStadium> {
    return this.comfortStadiumModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateComfortStadiumDto: UpdateComfortStadiumDto
  ): Promise<ComfortStadium> {
    const comforStadium = await this.comfortStadiumModel.update(
      updateComfortStadiumDto,
      { where: { id }, returning: true }
    );
    return comforStadium[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.comfortStadiumModel.destroy({ where: { id } });
  }
}
