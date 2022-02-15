import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { FeedPost } from "./feed.interface";
import { FeedService } from "./feed.service";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService
  ) {}

  //
  // @Get()
  // findAll(): Observable<FeedPost[]> {
  //   return this.feedService.findAllPost();
  // }

  @Get()
  findSelected(
    @Query('perPage') perPage = 1,
    @Query('page') page = 1,
  ): Observable<FeedPost[]> {
    perPage = perPage > 20 ? 20 : perPage;
    return this.feedService.findPosts(perPage, page);
  }

  @Post()
  create(@Body() feedPost: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(feedPost);
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



