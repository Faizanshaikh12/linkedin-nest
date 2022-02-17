import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./guards/jwt.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "3600s" },
      })
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService, JwtModule, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
