import { Module } from '@nestjs/common';
import { KafkaConfigService } from './kafka.service';

@Module({
  providers: [KafkaConfigService],
  exports: [KafkaConfigService],
})
export class KafkaModule {}