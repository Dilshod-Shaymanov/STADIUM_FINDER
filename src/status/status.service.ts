import { Injectable } from "@nestjs/common";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "./models/status.model";

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusModel.create(createStatusDto);
  }

  async findAll(): Promise<Status[]> {
    return this.statusModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Status> {
    return this.statusModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusModel.update(updateStatusDto, {
      where: { id },
      returning: true,
    });
    return status[1][0];
  }

  async remove(id: number): Promise<number> {
    return this.statusModel.destroy({where: {id}});
  }
}
