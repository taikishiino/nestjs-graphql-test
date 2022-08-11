import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { LoggingWinston } from "@google-cloud/logging-winston";
import {
 utilities as nestWinstonModuleUtilities,
 WinstonModuleOptions,
} from 'nest-winston';
import winston from "winston";
import { PrismaClientOptions } from '@prisma/client/runtime';

@Injectable()
export class Env {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get NodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get DatabaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }

  get Port(): number {
    return this.configService.get('PORT');
  }

  get GqlModuleOptionsFactory(): ApolloDriverConfig {
    return {
      autoSchemaFile: this.isProduction() ? true : path.join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      debug: this.isProduction() ? false : true,
      playground: this.isProduction() ? false : true,
      cors: {
        origin: [
          "https://nestjs-graphql-test-frontend-wb26trvrea-an.a.run.app",
          "http://localhost:3000"
        ],
        credentials: true,
      },
      subscriptions: {
        'graphql-ws': {
          path: '/graphql'
        },
        // graphql-wsに移行されたら以下の記述とライブラリを削除する
        // https://github.com/apollographql/subscriptions-transport-ws#readme
        'subscriptions-transport-ws': {
          path: '/graphql'
        },
      },
    }
  }

  get WinstonModuleOptionsFactory(): WinstonModuleOptions {
    const loggingConsole = new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.errors({ stack: true }),
        nestWinstonModuleUtilities.format.nestLike('PB_BACKEND', {
          prettyPrint: true,
        }),
      ),
    });
    const loggingCloudLogging = new LoggingWinston({
      serviceContext: {
        service: 'pb-backend',
        version: '1.0.0',
      },
    });
    return {
      level: this.isProduction() ? 'info' : 'debug',
      transports: this.isProduction()
        ? [loggingConsole, loggingCloudLogging]
        : [loggingConsole],
    };
  }

  get PrismaOptionsFactory(): PrismaClientOptions {
    const logOptions = {
      development: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      production: [{ emit: 'event', level: 'warn' }],
      test: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    };
    return {
      errorFormat: 'colorless',
      rejectOnNotFound: true,
      log: logOptions[this.NodeEnv],
    };
  }
}
