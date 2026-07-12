import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as crypto from 'crypto';

@Injectable()
export class MediaService implements OnModuleInit {
  private readonly storageBasePath = path.resolve(process.cwd(), '../../storage');

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await fs.mkdir(path.join(this.storageBasePath, 'uploads'), { recursive: true });
    await fs.mkdir(path.join(this.storageBasePath, 'optimized'), { recursive: true });
    await fs.mkdir(path.join(this.storageBasePath, 'thumbnails'), { recursive: true });
  }

  async uploadFile(file: Express.Multer.File) {
    const ext = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${ext}`;
    const uploadPath = path.join(this.storageBasePath, 'uploads', filename);

    try {
      await fs.writeFile(uploadPath, file.buffer);
      
      const asset = await this.prisma.mediaAsset.create({
        data: {
          id: crypto.randomUUID(),
          filename: filename,
          mimeType: file.mimetype,
          size: file.size,
          storagePath: `/uploads/${filename}`,
        },
      });

      return asset;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Failed to save file');
    }
  }
}
