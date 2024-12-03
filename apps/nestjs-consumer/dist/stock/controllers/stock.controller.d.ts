import { StockService } from '../services/stock.service';
export declare class StockController {
    private readonly stockService;
    private readonly logger;
    constructor(stockService: StockService);
    handleStockUpdate(message: any): Promise<void>;
}
