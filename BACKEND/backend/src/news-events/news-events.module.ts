import { Module } from '@nestjs/common';
import { NewsEventsController } from './news-events.controller';
import { NewsEventsService } from './news-events.service';

@Module({
  controllers: [NewsEventsController],
  providers: [NewsEventsService],
  exports: [NewsEventsService],
})
export class NewsEventsModule {}