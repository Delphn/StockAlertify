import { Injectable } from '@nestjs/common'
import { KafkaOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class KafkaConfigService {

  getKafkaConfig(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: process.env.KAFKA_CLIENT_ID || 'stock-consumer',
          brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
        },
        consumer: {
          groupId: process.env.KAFKA_CONSUMER_GROUP || 'stock-consumer-group'
        },
        subscribe: {
          fromBeginning: true
        }
      }
    }
  }
}
