import { Injectable } from "@nestjs/common";
import { from, map, Observable, switchMap } from "rxjs";
import * as bcrypt from "bcrypt";
import { User } from "./user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  createUser(user: User): Observable<User> {
    const { firstName, lastName, email, password } = user;
    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            firstName,
            lastName,
            email,
            password: hashedPassword
          })
        ).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          })
        );
      }));
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(this.userRepository.findOne(
      { email },
      { select: ["id", "firstName", "lastName", "email", "password", "role"] }
    )).pipe(
      switchMap((user: User) =>
        from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
          })
        ))
    );
  }

  loginUser(user: User): Observable<string> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        if (user) {
          //create JWT credentials
          return from(this.jwtService.signAsync({ user }));
        }
      })
    );
  }

  findUserById(id: number): Observable<User>{
    return from(
      this.userRepository.findOne({ id }, { relations: ['feedPosts'] }),
    ).pipe(
      map((user: User) => {
        delete user.password;
        return user;
      }),
    );
  }
}
