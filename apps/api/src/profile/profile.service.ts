import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.profile.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.profile.findUnique({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async create(data: any) {
    return this.prisma.profile.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.profile.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
