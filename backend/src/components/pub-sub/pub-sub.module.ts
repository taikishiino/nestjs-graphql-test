import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PubSub } from 'graphql-subscriptions';
 
export const PUB_SUB = 'PUB_SUB';
 
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () => new PubSub(),
      inject: [ConfigService]
    }
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
