import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { FeedPostEntity } from "./feed.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsCreatorGuard } from "./guards/is-creator.guard";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([FeedPostEntity])],
  providers: [FeedService, IsCreatorGuard],
  controllers: [FeedController],
})
export class FeedModule {}
