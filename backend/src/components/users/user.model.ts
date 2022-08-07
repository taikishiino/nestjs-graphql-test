import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Number)
  gender: number;

  @Field((type) => String)
  dateOfBirth: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
