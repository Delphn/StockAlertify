import { ConfigService } from '@nestjs/config';
import { KafkaOptions } from '@nestjs/microservices';
export declare class KafkaConfigService {
    private configService;
    constructor(configService: ConfigService);
    getKafkaConfig(): KafkaOptions;
}
