"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const kafka_config_service_1 = require("./config/kafka-config.service");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const kafkaConfigService = app.get(kafka_config_service_1.KafkaConfigService);
        app.connectMicroservice(kafkaConfigService.getKafkaConfig());
        await app.startAllMicroservices();
        await app.listen(process.env.NESTJS_PRODUCER_PORT ?? 3000);
        logger.log(`Application is running on: ${await app.getUrl()}`);
        logger.log('Kafka microservice is running');
    }
    catch (error) {
        logger.error('Failed to start the application', error);
        throw error;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map