import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { FeedPost } from "./feed.interface";
import { FeedService } from "./feed.service";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService
  ) {}

  @Post()
  create(@Body() feedPost: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(feedPost);
  }

  @Get()
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPost();
  }

  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() feedPost: FeedPost
  ): Observable<UpdateResult>{
    return this.feedService.updatePost(id, feedPost)
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: number,
  ): Observable<DeleteResult>{
    return this.feedService.deletePost(id)
  }
}



