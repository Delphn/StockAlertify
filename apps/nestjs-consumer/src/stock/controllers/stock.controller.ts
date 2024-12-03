import { Controller, Logger } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { StockService } from '../services/stock.service'

@Controller()
export class StockController {
  private readonly logger = new Logger(StockController.name)

  constructor(private readonly stockService: StockService) {}

  @EventPattern(process.env.KAFKA_TOPIC)
  async handleStockUpdate(@Payload() message: any) {
    this.logger.log(`Received message: ${JSON.stringify(message)}`)
    await this.stockService.processStockUpdate(message)
  }
}
