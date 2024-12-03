import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { KafkaConfigService } from './config/kafka-config.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  try {
    const kafkaConfigService = app.get(KafkaConfigService);
    app.connectMicroservice(kafkaConfigService.getKafkaConfig());
    
    await app.startAllMicroservices();
    await app.listen(process.env.NESTJS_PRODUCER_PORT ?? 3000);
    
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log('Kafka microservice is running');
  } catch (error) {
    logger.error('Failed to start the application', error);
    throw error;
  }
}

bootstrap();
