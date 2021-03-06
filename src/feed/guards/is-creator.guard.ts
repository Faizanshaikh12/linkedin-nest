import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { map, Observable, switchMap } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { FeedService } from "../feed.service";
import { User } from "../../auth/user.interface";
import { FeedPost } from "../feed.interface";

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private feedService: FeedService
  ) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: User; params: { id: number } } = request;
    if (!user || !params) return false;
    if (user.role === "admin") return true; //allow admin to get make requests
    const userId = user.id;
    const feedId = params.id;

    //Determine if logged-in user is same as the user that created the feed post
    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) =>
        this.feedService.findPostById(feedId).pipe(
          map((feedPost: FeedPost) => {
            let isAuthor = user.id === feedPost.author.id;
            return isAuthor;
          })
        ))
    );


    // return true;
  }
}
