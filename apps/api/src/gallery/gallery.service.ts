import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.album.findUnique({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async create(data: any) {
    return this.prisma.album.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.album.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.album.delete({ where: { id } });
  }
}
