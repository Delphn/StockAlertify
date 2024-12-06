import { Module } from '@nestjs/common'
import { StockGateway } from './stock.gateway'
import { StockService } from './stock.service'
import { KafkaConfigService } from '../kafka/kafka.service'
import { StockController } from './stock.controller'

@Module({
  controllers: [StockController],
  providers: [StockService, KafkaConfigService, StockGateway],
  exports: [StockService]
})
export class StockModule {}
