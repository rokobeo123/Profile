import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { ProfileModule } from './profile/profile.module';
import { GalleryModule } from './gallery/gallery.module';
import { TimelineModule } from './timeline/timeline.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusModule } from './status/status.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    MediaModule,
    ProfileModule,
    GalleryModule,
    TimelineModule,
    ProjectsModule,
    StatusModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
