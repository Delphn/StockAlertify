export interface Stock {
  symbol: string;
  price: number;
  timestamp: number;
  change: number;  // Percentage change
  volume: number;
}
