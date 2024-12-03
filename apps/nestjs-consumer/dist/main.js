"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const kafka_config_service_1 = require("./config/kafka-config.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const kafkaConfigService = app.get(kafka_config_service_1.KafkaConfigService);
    app.connectMicroservice(kafkaConfigService.getKafkaConfig());
    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map