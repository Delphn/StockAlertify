import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaConfigService } from './config/kafka-config.service';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
    }),
    StockModule,
  ],
  providers: [KafkaConfigService],
  exports: [KafkaConfigService],
})
export class AppModule {}
