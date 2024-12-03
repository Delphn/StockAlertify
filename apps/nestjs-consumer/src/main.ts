import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { KafkaConfigService } from './config/kafka-config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaConfigService = app.get(KafkaConfigService);
  app.connectMicroservice(kafkaConfigService.getKafkaConfig());

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
