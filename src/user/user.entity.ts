import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from '../auth/role.enum';
import { FeedPostEntity } from '../feed/feed.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
  feedPosts: FeedPostEntity[];
}
