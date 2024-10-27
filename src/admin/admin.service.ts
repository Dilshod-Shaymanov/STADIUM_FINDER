import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    return this.adminModel.create({
      ...createAdminDto,
      hashed_password: hashedPassword,
    });
  }

  // Login bo'yicha admin qidirish
  async findAdminByLogin(login: string): Promise<Admin> {
    const admin = await this.adminModel.findOne({ where: { login } });

    if (!admin) {
      throw new NotFoundException(`Admin login "${login}" topilmadi`);
    }
    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });
    if (!admin) {
      throw new NotFoundException(`Admin ID "${id}" topilmadi`);
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const [affectedRows, [updatedAdmin]] = await this.adminModel.update(
      updateAdminDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (affectedRows === 0) {
      throw new NotFoundException(
        `Admin ID "${id}" yangilanmadi, chunki topilmadi`
      );
    }
    return updatedAdmin;
  }

  async remove(id: number): Promise<number> {
    const affectedRows = await this.adminModel.destroy({ where: { id } });

    if (affectedRows === 0) {
      throw new NotFoundException(`Admin ID "${id}" topilmadi`);
    }

    return affectedRows;
  }
}
