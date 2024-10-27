import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStadiumTimeDto } from "./dto/create-stadium_time.dto";
import { UpdateStadiumTimeDto } from "./dto/update-stadium_time.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StadiumTime } from "./models/stadium_time.model";

@Injectable()
export class StadiumTimeService {
  constructor(
    @InjectModel(StadiumTime) private stadiumTimeModel: typeof StadiumTime
  ) {}

  async create(
    createStadiumTimeDto: CreateStadiumTimeDto
  ): Promise<StadiumTime> {
    return this.stadiumTimeModel.create(createStadiumTimeDto);
  }

  async findAll(): Promise<StadiumTime[]> {
    return this.stadiumTimeModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<StadiumTime> {
    const stadiumTime = await this.stadiumTimeModel.findByPk(id, {
      include: { all: true },
    });
    if (!stadiumTime) {
      throw new NotFoundException(`Stadium time with ID ${id} not found`);
    }
    return stadiumTime;
  }

  async update(
    id: number,
    updateStadiumTimeDto: UpdateStadiumTimeDto
  ): Promise<StadiumTime> {
    const [affectedRows, [updatedStadiumTime]] =
      await this.stadiumTimeModel.update(updateStadiumTimeDto, {
        where: { id },
        returning: true,
      });

    if (!affectedRows) {
      throw new NotFoundException(`Stadium time with ID ${id} not found`);
    }
    return updatedStadiumTime;
  }

  async remove(id: number): Promise<void> {
    const affectedRows = await this.stadiumTimeModel.destroy({
      where: { id },
    });
    if (!affectedRows) {
      throw new NotFoundException(`Stadium time with ID ${id} not found`);
    }
  }
}
