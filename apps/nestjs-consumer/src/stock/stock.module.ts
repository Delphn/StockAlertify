import { Module } from '@nestjs/common'
import { StockService } from './services/stock.service'
import { KafkaConfigService } from '../config/kafka-config.service'
import { StockController } from './controllers/stock.controller'

@Module({
  controllers: [StockController],
  providers: [StockService, KafkaConfigService],
  exports: [StockService]
})
export class StockModule {}