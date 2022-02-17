import { User } from "../auth/user.interface";

export interface FeedPost{
  id?: number;
  body?: string;
  createdAt?: Date;
  author?: User;
}
