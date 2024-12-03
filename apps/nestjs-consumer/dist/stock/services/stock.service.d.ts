import { OnModuleInit } from '@nestjs/common';
import { KafkaConfigService } from '../../config/kafka-config.service';
export interface Stock {
    symbol: string;
    price: number;
    timestamp: number;
    change: number;
    volume: number;
}
export declare class StockService implements OnModuleInit {
    private kafkaConfigService;
    private readonly logger;
    private kafkaClient;
    private stocks;
    private userSubscriptions;
    constructor(kafkaConfigService: KafkaConfigService);
    onModuleInit(): Promise<void>;
    processStockUpdate(stockUpdate: Stock): Promise<void>;
    private notifyUsers;
}
