import { Injectable } from '@nestjs/common'
import { OnModuleInit } from '@nestjs/common'
import { StockGateway } from './stock.gateway'

export interface Stock {
  symbol: string
  price: number
  timestamp: number
  change: number
  volume: number
}

@Injectable()
export class StockService implements OnModuleInit {
  constructor(private readonly stockGateway: StockGateway) {}

  async onModuleInit() {}

  async processStockUpdate(stockUpdate: Stock) {
    console.log(`Processing stock update: ${JSON.stringify(stockUpdate)}`)
    this.stockGateway.handleStockUpdate(stockUpdate)
  }
}
