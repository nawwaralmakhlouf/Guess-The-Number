import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import MessageSchema from './message.schema';
import { MessagesService } from './messages.service';
import { IMessage } from 'src/shared/dto/message.interface';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getAllMessages() {
    const messages = await this.messagesService.all();
    return messages;
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string){
    const message = await this.messagesService.find(Number(id));
    return message;
  }

  @Post()
  async createMessage(@Body('IMessage') content: string) {
    const newMessage = await this.messagesService.add(content);
    return newMessage;
  }
}
