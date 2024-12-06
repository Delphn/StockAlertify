import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { KafkaConfigService } from './kafka/kafka.service'
import { MicroserviceOptions } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const kafkaConfigService = new KafkaConfigService(new ConfigService())

  // Create HTTP server
  const app = await NestFactory.create(AppModule)
  app.enableCors() // Enable CORS for frontend access

  app.connectMicroservice<MicroserviceOptions>(
    kafkaConfigService.getKafkaConfig()
  )
  await app.startAllMicroservices()

  await app.listen(process.env.NESTJS_CONSUMER_PORT)
}
bootstrap()
