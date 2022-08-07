import { ArgsType, Args, Field, Resolver, Query } from '@nestjs/graphql';
import { UserModel } from '@/components/users/user.model';
import { PrismaService } from '@/components/prisma/prisma.service';

@ArgsType()
export class GetUsersArgs {
  @Field((type) => [Number], { nullable: true })
  gender?: number;
}

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [UserModel], { name: 'users', nullable: true })
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
}
