import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { FeedPostEntity } from "./feed.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedPostEntity])
  ],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {}
