import { Module } from '@nestjs/common';
import { UserResolver } from '@/components/users/user.resolvers';

@Module({
  providers: [UserResolver],
})
export class UsersModule {}
