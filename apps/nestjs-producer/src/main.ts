import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions } from '@nestjs/microservices'
import { KafkaConfigService } from './kafka/service/kafka.service'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const kafkaConfigService = new KafkaConfigService(new ConfigService())

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: kafkaConfigService.getKafkaConfig().transport,
      options: kafkaConfigService.getKafkaConfig().options
    }
  )

  await app.listen()
}

bootstrap()
