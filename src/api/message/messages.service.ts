import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import urlSlug from 'url-slug'
import { IMessage } from '../../shared/dto/message.interface';

export class MessagesService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>) { }

  public async all(): Promise<IMessage[]> {
    try {
      const posts = await this.messageModel.find({});
      return posts;
    } catch (e) {
      // console.log('Post service error============', e);
      return [];
    }
  }

  public async find(number: Number): Promise<IMessage | null> {
    try {
      const post = await this.messageModel.findOne({ number: number });
      return post;
    } catch (e) {
      return null;
    }
  }

  public async add(data: string): Promise<IMessage> {
    try {
      const message = await this.messageModel.create(data);
      return message;
    } catch (e) {
      return null;
    }
  }
}
