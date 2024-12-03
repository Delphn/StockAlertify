import { Injectable, Logger } from '@nestjs/common'
import { OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { KafkaConfigService } from '../../config/kafka-config.service'

export interface Stock {
  symbol: string
  price: number
  timestamp: number
  change: number
  volume: number
}

@Injectable()
export class StockService implements OnModuleInit {
  private readonly logger = new Logger(StockService.name)

  private kafkaClient: ClientKafka

  private stocks: Stock[] = []

  private userSubscriptions = [
    { userId: 1, symbol: 'AAPL', threshold: 155 },
    { userId: 2, symbol: 'GOOGL', threshold: 2700 },
    { userId: 3, symbol: 'MSFT', threshold: 310 }
  ]

  constructor(private kafkaConfigService: KafkaConfigService) {
    const kafkaOptions = this.kafkaConfigService.getKafkaConfig().options
    this.kafkaClient = new ClientKafka(kafkaOptions)
  }

  async onModuleInit() {
    await this.kafkaClient.connect()
    this.logger.log(`Subscribed to Kafka topic: ${process.env.KAFKA_TOPIC}`)
  }

  async processStockUpdate(stockUpdate: Stock) {
    this.stocks.push(stockUpdate)
    // Filter subscriptions that match the stock symbol and threshold
    const matchingSubscriptions = this.userSubscriptions.filter(
      (sub) =>
        sub.symbol === stockUpdate.symbol &&
        ((stockUpdate.price >= sub.threshold && sub.threshold > 0) ||
          (stockUpdate.price <= sub.threshold && sub.threshold < 0))
    )

    if (matchingSubscriptions.length > 0) {
      this.notifyUsers(matchingSubscriptions, stockUpdate)
    }
  }

  private notifyUsers(subscriptions: any[], stockUpdate: Stock) {
    subscriptions.forEach((sub) => {
      this.logger.log(
        `Notifying user ${sub.userId} about ${stockUpdate.symbol} reaching price ${stockUpdate.price}`
      )
    })
  }
}
