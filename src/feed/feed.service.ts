import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { FeedPostEntity } from "./feed.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedPost } from "./feed.interface";
import { from, Observable } from "rxjs";

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedRepository: Repository<FeedPostEntity>)
  {}

  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedRepository.save(feedPost));
  }

  findAllPost(): Observable<FeedPost[]> {
    return from(this.feedRepository.find());
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedRepository.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedRepository.delete(id));
  }

}
