import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from '@/components/prisma/prisma.service';
import { Env } from '@/config/environments/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(winstonLogger);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  prismaService.enableLogger(winstonLogger);

  const pbEnv = app.get(Env);
  await app.listen(pbEnv.Port, '0.0.0.0');
  winstonLogger.log(`PORT: ${pbEnv.Port}`);
}
bootstrap();
