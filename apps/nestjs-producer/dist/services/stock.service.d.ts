export declare class StockService {
    private readonly logger;
    constructor();
    private client;
    private stocks;
    onModuleInit(): Promise<void>;
    private startGeneratingStockUpdates;
    private generateStockUpdate;
}
