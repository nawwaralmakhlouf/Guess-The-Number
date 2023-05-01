import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) { }

  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    const newMessage = await this.messagesService.add(payload);
    this.wss.emit('receiveMessage', payload);
  }

  @SubscribeMessage('gameStarted')
  async handleGameStarted(client: Socket, payload: string): Promise<void> {
    var data = JSON.parse(payload);
    let players: any = data.players;
    players[0].points = data.points + '';
    players[1].points = data.points + '';
    players[2].points = data.points + '';
    players[3].points = data.points + '';
    players[4].points = data.points + '';
    players[1].multiplier = parseFloat(Math.random() * 10 + "").toFixed(2);
    players[2].multiplier = parseFloat(Math.random() * 10 + "").toFixed(2);
    players[3].multiplier = parseFloat(Math.random() * 10 + "").toFixed(2);
    players[4].multiplier = parseFloat(Math.random() * 10 + "").toFixed(2);

    var gues_value = parseFloat((Math.random() * (5)) + 5 + "").toFixed(2);
    // console.log(players);

    this.wss.emit('gameStarted', JSON.stringify({
      'players': players,
      'speed': parseFloat(data.speed),
      'gues_value': parseFloat(gues_value)
    }));
  }

  @SubscribeMessage('gameFinished')
  async handleGameFinished(client: Socket, payload: string): Promise<void> {
    let data = JSON.parse(payload);
    let players = data.players;
    let gues_value = data.gues_value;


    for (var i = 0; i < players.length; i++) {
      if (players[i].multiplier > gues_value) {
        players[i].points = 0;
      } else {
        players[i].score = parseFloat(parseFloat(players[i].score) + (players[i].points * players[i].multiplier) + "").toFixed(2);
        players[i].points = parseFloat(players[i].score).toFixed(2);
      }
    }

    let sorted_players = JSON.parse(JSON.stringify(players));
    sorted_players.sort((a: any, b: any) => a.score > b.score ? 1 : -1);

    this.wss.emit('gameFinished', JSON.stringify({
      'players': players,
      'sorted_players': sorted_players,
    }));
  }
}
