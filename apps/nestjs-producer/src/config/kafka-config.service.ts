import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConfigService {
  private readonly logger = new Logger(KafkaConfigService.name);

  constructor(private configService: ConfigService) {}

  getKafkaConfig(): KafkaOptions {
    const brokers = this.configService.get<string>('KAFKA_BROKERS').split(',');
    
    this.logger.log(`Configuring Kafka with brokers: ${brokers}`);
    
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.configService.get('KAFKA_CLIENT_ID'),
          brokers: brokers,
          retry: {
            initialRetryTime: 100,
            retries: 8
          }
        },
        consumer: {
          groupId: this.configService.get('KAFKA_CONSUMER_GROUP'),
        },
        producer: {
          allowAutoTopicCreation: this.configService.get<boolean>('KAFKA_AUTO_TOPIC_CREATION'),
        }
      },
    };
  }
} 