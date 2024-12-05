import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { KafkaConfigService } from './kafka/service/kafka.service'
import { KafkaModule } from './kafka/kafka.module'
import { StockModule } from './stock/stock.module'
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    KafkaModule,
    StockModule,
    ClientsModule.registerAsync([
      {
        name: 'STOCK_ALERTIFY_CLIENT',
        imports: [ConfigModule, KafkaModule],
        useFactory: (kafkaConfigService: KafkaConfigService) => kafkaConfigService.getKafkaConfig(),
        inject: [KafkaConfigService]
      }
    ])
  ],
  providers: [KafkaConfigService],
  exports: [KafkaConfigService],
})
export class AppModule {}
