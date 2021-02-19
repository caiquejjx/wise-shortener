import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['slug'])
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  originalUrl: string;

  @Column()
  shortenedUrl: string;

  @Column()
  expiration: Date;
}
