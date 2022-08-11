import { ArgsType, Args, Field, Resolver, Query } from '@nestjs/graphql';
import { User } from '@/components/users/user.model';
import { PrismaService } from '@/components/prisma/prisma.service';
import { Env } from '@/config/environments/env.service';

@ArgsType()
export class GetUsersArgs {
  @Field((type) => [Number], { nullable: true })
  gender?: number;
}

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly env: Env
  ) {}

  @Query(() => [User], { name: 'users', nullable: true })
  async getUsers(@Args() args: GetUsersArgs) {
    console.warn("args: ", args)
    return this.prisma.user.findMany({
      where: {
        gender: {
          in: args.gender
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => String)
  databaseUrl(): string {
    return this.env.DatabaseUrl;
  }
}
