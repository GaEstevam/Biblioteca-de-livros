import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn()
  ISBN!: string;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  year!: number;
}
