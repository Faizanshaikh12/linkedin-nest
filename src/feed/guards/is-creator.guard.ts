import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { map, Observable, switchMap } from 'rxjs';
import { FeedService } from '../feed.service';
import { User } from '../../user/user.interface';
import { FeedPost } from '../feed.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private feedService: FeedService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: { id: number } } = request;
    if (!user || !params) return false;
    if (user.role === 'admin') return true; //allow admin to get make requests
    const userId = user.id;
    const feedId = params.id;

    //Determine if logged-in user is same as the user that created the feed post
    return this.userService.findUserById(userId).pipe(
      switchMap((user: User) =>
        this.feedService.findPostById(feedId).pipe(
          map((feedPost: FeedPost) => {
            const isAuthor = user.id === feedPost.author.id;
            return isAuthor;
          }),
        ),
      ),
    );

    // return true;
  }
}
