import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { NewsEventsModule } from './news-events/news-events.module';
import { GalleryModule } from './gallery/gallery.module';
import { DonationsModule } from './donations/donations.module';
import { ProgramsModule } from './programs/programs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ContactModule,
    ProjectsModule,
    NewsEventsModule,
    GalleryModule,
    DonationsModule,
    ProgramsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
