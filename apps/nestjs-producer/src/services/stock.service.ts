import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Stock } from '../types/stock.interface';

@Injectable()
export class StockService {
  private readonly topic: string;
  private readonly logger = new Logger(StockService.name);

  constructor(
    @Inject('STOCK_ALERTIFY_CLIENT') private readonly stockAlertifyClient: ClientKafka,
    private readonly configService: ConfigService
  ) {
    this.topic = this.configService.get<string>('KAFKA_TOPIC');
  }

  private stocks = [
    { symbol: 'AAPL', price: 150 },
    { symbol: 'GOOGL', price: 2800 },
    { symbol: 'MSFT', price: 300 },
    { symbol: 'AMZN', price: 3300 },
    { symbol: 'META', price: 330 },
  ];

  async onModuleInit() {
    try {
      await this.stockAlertifyClient.connect()
      this.startGeneratingStockUpdates()
    } catch (error) {
      this.logger.error('Error connecting to Kafka:', error)
    }
  }

  private startGeneratingStockUpdates() {
    setInterval(() => {
      this.stocks.forEach((stock) => {
        const stockUpdate = this.generateStockUpdate(stock)
        this.stockAlertifyClient.emit(this.topic, stockUpdate)
        this.logger.log(`Stock update emitted: ${JSON.stringify(stockUpdate)}`)
      })
    }, 1000)
  }

  private generateStockUpdate(stock: { symbol: string; price: number }): Stock {
    const changePercent = (Math.random() * 4 - 2) / 100;
    const newPrice = stock.price * (1 + changePercent);

    return {
      symbol: stock.symbol,
      price: Number(newPrice.toFixed(2)),
      timestamp: Date.now(),
      change: Number((changePercent * 100).toFixed(2)),
      volume: Math.floor(Math.random() * 10000),
    };
  }
}