import { Role } from '../auth/role.enum';
import { FeedPost } from '../feed/feed.interface';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  imagePath?: string;
  role?: Role;
  posts?: FeedPost[];
}
