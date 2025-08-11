import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allows connections from any address. For now, this is fine.
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // This gives us access to the main Socket.IO server instance
  @WebSocketServer()
  server: Server;

  // This function will run automatically when a new client connects
  handleConnection(client: Socket) {
    console.log(`✅ Client Connected: ${client.id}`);
  }

  // This function will run when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`❌ Client Disconnected: ${client.id}`);
  }
}