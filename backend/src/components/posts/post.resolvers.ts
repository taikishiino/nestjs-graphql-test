import { InputType, Query, Mutation, Subscription, Args, Field, Resolver } from '@nestjs/graphql';
import { Post } from './post.model';
import { PrismaService } from '@/components/prisma/prisma.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '@/components/pub-sub/pub-sub.module';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  @Field()
  type: string;
  @Field()
  contentPath: string;
  @Field()
  md5Hash: string;
}

const POST_ADDED_EVENT = 'subscribePostCreated';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(PUB_SUB) private pubSub: PubSub
  ) {}

  @Query(() => [Post], { name: 'posts', nullable: true })
  findMany() {
    return this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Mutation(() => Post, { name: 'createPost', nullable: true })
  async create(@Args("input") input: CreatePostInput) {
    const post = await this.prisma.post.create({ data: input });
    this.pubSub.publish(POST_ADDED_EVENT, { subscribePostCreated: post });
  }

  @Subscription(() => Post, { name: 'subscribePostCreated', nullable: true })
  subscribeCreated() {
    return this.pubSub.asyncIterator(POST_ADDED_EVENT);
  }
}
