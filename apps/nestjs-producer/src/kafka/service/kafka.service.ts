import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { KafkaOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class KafkaConfigService {
  constructor(private readonly configService: ConfigService) {}

  getKafkaConfig(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.configService.get<string>('KAFKA_CLIENT_ID'),
          brokers: this.configService.get<string>('KAFKA_BROKERS').split(',')
        },
        consumer: {
          groupId: this.configService.get<string>('KAFKA_CONSUMER_GROUP')
        }
      }
    }
  }
}
