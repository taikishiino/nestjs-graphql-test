import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Env } from './env.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
    }),
  ],
  providers: [Env],
  exports: [Env],
})
export class EnvModule {}
