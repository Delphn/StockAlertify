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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StockController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const stock_service_1 = require("../services/stock.service");
let StockController = StockController_1 = class StockController {
    constructor(stockService) {
        this.stockService = stockService;
        this.logger = new common_1.Logger(StockController_1.name);
    }
    async handleStockUpdate(message) {
        this.logger.log(`Received message: ${JSON.stringify(message)}`);
        await this.stockService.processStockUpdate(message);
    }
};
exports.StockController = StockController;
__decorate([
    (0, microservices_1.EventPattern)(process.env.KAFKA_TOPIC),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "handleStockUpdate", null);
exports.StockController = StockController = StockController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
//# sourceMappingURL=stock.controller.js.map