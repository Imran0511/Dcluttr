export interface SkuItem {
  id: number;
  selected: boolean;
  name: string;
  sales: string;
  salesPercentage: number;
  outOfStock: string;
  totalInventory: string;
  avgRank: string | number;
  estTraffic: string;
  estImpressions: string;
  cr: string;
  growthNegative?: boolean;
}

export interface CityItem {
  id: number;
  selected: boolean;
  name: string;
  sales: string;
  salesPercentage: number;
  outOfStock: string;
  totalInventory: string;
  avgRank: string | number;
  estTraffic: string;
  estImpressions: string;
  cr: string;
  growthNegative?: boolean;
}

export interface CityMetric {
  city: string;
  amount: string;
  percentage: number;
  growth: number;
  positive: boolean;
}

export interface SalesData {
  totalSales: string;
  salesGrowth: number | string;
  lastMonthSales: string;
}

export interface ItemsSoldData {
  totalSold: string;
  soldGrowth: number | string;
  lastMonthSold: string;
}

export interface RevenueData {
  totalRevenue: string;
  revenueGrowth: number | string;
}
