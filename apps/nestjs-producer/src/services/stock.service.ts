import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Stock } from '../types/stock.interface';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor() {
    this.logger.log('StockService initialized');
  }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      },
      producer: {
        allowAutoTopicCreation: process.env.KAFKA_AUTO_TOPIC_CREATION === 'true',
      },
    },
  })
  private client: ClientKafka;

  private stocks = [
    { symbol: 'AAPL', price: 150 },
    { symbol: 'GOOGL', price: 2800 },
    { symbol: 'MSFT', price: 300 },
    { symbol: 'AMZN', price: 3300 },
    { symbol: 'META', price: 330 },
  ];

  async onModuleInit() {
    try {
      this.logger.log('StockService onModuleInit started');
      this.logger.log(`Attempting to connect to Kafka with config:
        clientId: ${process.env.KAFKA_CLIENT_ID}
        brokers: ${process.env.KAFKA_BROKERS}
        topic: ${process.env.KAFKA_TOPIC}
        autoTopicCreation: ${process.env.KAFKA_AUTO_TOPIC_CREATION}
      `);
      
      await this.client.connect();
      this.logger.log('Successfully connected to Kafka');
      this.startGeneratingStockUpdates();
    } catch (error) {
      this.logger.error('Failed to connect to Kafka', error.stack);
      throw error;
    }
  }

  private startGeneratingStockUpdates() {
    this.logger.log('Starting stock updates generation...');
    setInterval(() => {
      this.stocks.forEach((stock) => {
        try {
          const stockUpdate = this.generateStockUpdate(stock);
          this.client.emit(process.env.KAFKA_TOPIC || 'stock-updates', stockUpdate);
          this.logger.log(`Emitted update for ${stock.symbol}: ${JSON.stringify(stockUpdate)}`);
        } catch (error) {
          this.logger.error(`Failed to emit stock update for ${stock.symbol}`, error.stack);
        }
      });
    }, 1000);
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