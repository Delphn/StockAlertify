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
const kafka_config_service_1 = require("../../config/kafka-config.service");
let StockService = StockService_1 = class StockService {
    constructor(kafkaConfigService) {
        this.kafkaConfigService = kafkaConfigService;
        this.logger = new common_1.Logger(StockService_1.name);
        this.stocks = [];
        this.userSubscriptions = [
            { userId: 1, symbol: 'AAPL', threshold: 155 },
            { userId: 2, symbol: 'GOOGL', threshold: 2700 },
            { userId: 3, symbol: 'MSFT', threshold: 310 }
        ];
        const kafkaOptions = this.kafkaConfigService.getKafkaConfig().options;
        this.kafkaClient = new microservices_1.ClientKafka(kafkaOptions);
    }
    async onModuleInit() {
        await this.kafkaClient.connect();
        this.logger.log(`Subscribed to Kafka topic: ${process.env.KAFKA_TOPIC}`);
    }
    async processStockUpdate(stockUpdate) {
        this.stocks.push(stockUpdate);
        const matchingSubscriptions = this.userSubscriptions.filter((sub) => sub.symbol === stockUpdate.symbol &&
            ((stockUpdate.price >= sub.threshold && sub.threshold > 0) ||
                (stockUpdate.price <= sub.threshold && sub.threshold < 0)));
        if (matchingSubscriptions.length > 0) {
            this.notifyUsers(matchingSubscriptions, stockUpdate);
        }
    }
    notifyUsers(subscriptions, stockUpdate) {
        subscriptions.forEach((sub) => {
            this.logger.log(`Notifying user ${sub.userId} about ${stockUpdate.symbol} reaching price ${stockUpdate.price}`);
        });
    }
};
exports.StockService = StockService;
exports.StockService = StockService = StockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_config_service_1.KafkaConfigService])
], StockService);
//# sourceMappingURL=stock.service.js.map