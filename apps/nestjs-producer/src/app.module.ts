import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaConfigService } from './config/kafka-config.service';
import { StockService } from './services/stock.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
  ],
  providers: [KafkaConfigService, StockService],
})
export class AppModule {}
