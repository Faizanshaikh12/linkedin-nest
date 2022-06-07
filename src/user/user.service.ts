import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { User } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // find id by user
  findUserById(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({ id }, { relations: ['feedPosts'] }),
    ).pipe(
      map((user: User) => {
        delete user.password;
        return user;
      }),
    );
  }

  // update user image
  updateUserImageById(id: number, imagePath: string): Observable<UpdateResult> {
    const user: User = new UserEntity();
    user.id = id;
    user.imagePath = imagePath;
    return from(this.userRepository.update(id, user));
  }

  // find image name by id
  findImageNameByUserId(id: number): Observable<string> {
    return from(this.userRepository.findOne(id)).pipe(
      map((user: User) => {
        delete user.password;
        return user.imagePath;
      }),
    );
  }
}
