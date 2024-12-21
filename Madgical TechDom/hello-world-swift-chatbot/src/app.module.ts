// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { AppController } from './app.controller';
import { UserService } from './model/user.service';
import * as dotenv from 'dotenv';
import { databaseConfig } from './config/database-config.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggingService } from './common/middleware/logger.middleware';
import { LocalizationModule } from './localization/localization.module';
import { SwiftchatModule } from './swiftchat/swiftchat.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ChatbotModule } from './chat/chatbot.module';
import { MessageModule } from './message/message.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return databaseConfig;
      },
    }),
    TypeOrmModule.forFeature([User]),
    MessageModule,
    ChatbotModule,
    SwiftchatModule,
  ],
  controllers: [AppController],
  providers: [
    LoggingService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
