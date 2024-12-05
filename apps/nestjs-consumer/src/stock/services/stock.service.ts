import { Injectable } from '@nestjs/common'
import { OnModuleInit } from '@nestjs/common'

export interface Stock {
  symbol: string
  price: number
  timestamp: number
  change: number
  volume: number
}

@Injectable()
export class StockService implements OnModuleInit {
  async onModuleInit() {}

  async processStockUpdate(stockUpdate: Stock) {
    console.log(`Processing stock update: ${JSON.stringify(stockUpdate)}`)
  }
}
