import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
export class StockGateway {
  @WebSocketServer()
  server: Server

  handleStockUpdate(stockData: any) {
    console.log('stock-update: ', stockData)
    this.server.emit('stock-update', stockData)
  }
}
