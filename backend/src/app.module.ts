import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './components/posts/posts.module';
import { EnvModule } from './config/environments/env.module';
import { Env } from './config/environments/env.service';
import { UsersModule } from '@/components/users/users.module';
import { PrismaModule } from '@/components/prisma/prisma.module';

@Module({
  imports: [
    EnvModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [Env],
      useFactory: (env: Env) => env.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [Env],
      useFactory: (env: Env) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [Env],
      isGlobal: true,
      useFactory: (env: Env) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    PostsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})




export class AppModule {}
