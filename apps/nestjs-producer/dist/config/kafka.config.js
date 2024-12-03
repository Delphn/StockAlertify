"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConfig = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.kafkaConfig = {
    transport: microservices_1.Transport.KAFKA,
    options: {
        client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
            retry: {
                initialRetryTime: 100,
                retries: 8
            }
        },
        consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP,
        },
        producer: {
            allowAutoTopicCreation: true
        }
    },
};
//# sourceMappingURL=kafka.config.js.map