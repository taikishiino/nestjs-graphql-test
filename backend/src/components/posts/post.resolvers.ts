import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './post.model';
import { Env } from '@/config/environments/env.service';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private env: Env,
  ) {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }

  @Query(() => String)
  helloEnv(): string {
    return this.env.DatabaseUrl;
  }
}
