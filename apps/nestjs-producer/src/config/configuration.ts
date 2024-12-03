import { registerAs } from '@nestjs/config';

export const kafkaConfiguration = registerAs('kafka', () => ({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  consumerGroup: process.env.KAFKA_CONSUMER_GROUP,
  autoTopicCreation: process.env.KAFKA_AUTO_TOPIC_CREATION === 'true',
})); 