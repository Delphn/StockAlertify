import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { StockService } from './services/stock.service'
import { KafkaModule } from './kafka/kafka.module'
import { KafkaConfigService } from './kafka/service/kafka.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    KafkaModule,
    ClientsModule.registerAsync([
      {
        name: 'STOCK_ALERTIFY_CLIENT',
        imports: [ConfigModule, KafkaModule],
        useFactory: (kafkaConfigService: KafkaConfigService) => kafkaConfigService.getKafkaConfig(),
        inject: [KafkaConfigService]
      }
    ])
  ],
  providers: [StockService]
})
export class AppModule {}
