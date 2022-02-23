import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { FeedPost } from "./feed.interface";
import { FeedService } from "./feed.service";
import { Observable } from "rxjs";
import { DeleteResult, UpdateResult } from "typeorm";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { IsCreatorGuard } from "./guards/is-creator.guard";

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

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() feedPost: FeedPost
  ): Observable<UpdateResult>{
    return this.feedService.updatePost(id, feedPost)
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete(':id')
  deleteOne(
    @Param('id') id: number,
  ): Observable<DeleteResult>{
    return this.feedService.deletePost(id)
  }
}



