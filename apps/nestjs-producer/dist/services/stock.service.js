"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let StockService = StockService_1 = class StockService {
    constructor() {
        this.logger = new common_1.Logger(StockService_1.name);
        this.stocks = [
            { symbol: 'AAPL', price: 150 },
            { symbol: 'GOOGL', price: 2800 },
            { symbol: 'MSFT', price: 300 },
            { symbol: 'AMZN', price: 3300 },
            { symbol: 'META', price: 330 },
        ];
        this.logger.log('StockService initialized');
    }
    async onModuleInit() {
        try {
            this.logger.log('StockService onModuleInit started');
            this.logger.log(`Attempting to connect to Kafka with config:
        clientId: ${process.env.KAFKA_CLIENT_ID}
        brokers: ${process.env.KAFKA_BROKERS}
        topic: ${process.env.KAFKA_TOPIC}
        autoTopicCreation: ${process.env.KAFKA_AUTO_TOPIC_CREATION}
      `);
            await this.client.connect();
            this.logger.log('Successfully connected to Kafka');
            this.startGeneratingStockUpdates();
        }
        catch (error) {
            this.logger.error('Failed to connect to Kafka', error.stack);
            throw error;
        }
    }
    startGeneratingStockUpdates() {
        this.logger.log('Starting stock updates generation...');
        setInterval(() => {
            this.stocks.forEach((stock) => {
                try {
                    const stockUpdate = this.generateStockUpdate(stock);
                    this.client.emit(process.env.KAFKA_TOPIC || 'stock-updates', stockUpdate);
                    this.logger.log(`Emitted update for ${stock.symbol}: ${JSON.stringify(stockUpdate)}`);
                }
                catch (error) {
                    this.logger.error(`Failed to emit stock update for ${stock.symbol}`, error.stack);
                }
            });
        }, 1000);
    }
    generateStockUpdate(stock) {
        const changePercent = (Math.random() * 4 - 2) / 100;
        const newPrice = stock.price * (1 + changePercent);
        return {
            symbol: stock.symbol,
            price: Number(newPrice.toFixed(2)),
            timestamp: Date.now(),
            change: Number((changePercent * 100).toFixed(2)),
            volume: Math.floor(Math.random() * 10000),
        };
    }
};
exports.StockService = StockService;
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                clientId: process.env.KAFKA_CLIENT_ID,
                brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
            },
            producer: {
                allowAutoTopicCreation: process.env.KAFKA_AUTO_TOPIC_CREATION === 'true',
            },
        },
    }),
    __metadata("design:type", microservices_1.ClientKafka)
], StockService.prototype, "client", void 0);
exports.StockService = StockService = StockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StockService);
//# sourceMappingURL=stock.service.js.map