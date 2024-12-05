import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { Stock, StockService } from '../services/stock.service'

@Controller()
export class StockController {

  constructor(private readonly stockService: StockService) {}

  @EventPattern('stock-updates')
  async handleStockUpdate(message: any) {
    console.log(`Received message: ${JSON.stringify(message)}`)
    await this.stockService.processStockUpdate(message)
  }
}
