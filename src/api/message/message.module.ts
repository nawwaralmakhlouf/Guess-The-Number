import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import MessageSchema from './message.schema';
import { MessageGateway } from './message.gateway';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
  controllers: [MessagesController],
  providers: [MessagesService, MessageGateway],
})
export class MessagesModule {}
