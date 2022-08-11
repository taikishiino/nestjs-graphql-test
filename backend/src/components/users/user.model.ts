import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  gender: number;
  @Field()
  dateOfBirth: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
