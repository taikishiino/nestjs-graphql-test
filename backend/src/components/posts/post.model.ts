import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  type: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
