import { useState, useEffect, useMemo } from "react";
import { fetchAllCardData } from "../services/cubeService";
import type {
  SkuItem,
  CityItem,
  CityMetric,
  SalesData,
  ItemsSoldData,
  RevenueData,
} from "../types/dashboardTypes";

// Define a type for the API response data
type ApiResponseData = Record<
  string,
  {
    data: Array<Record<string, unknown>>;
    meta?: Record<string, unknown>;
  }
>;

export function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponseData>({});
  const [dateRange] = useState("Feb 01, 2025 - Feb 28, 2025");
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "blinkit",
    "zepto",
    "instamart",
  ]);

  // Helper functions - moved to the top before they're used
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const formatCurrency = (num: number) => {
    if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(2);
  };

  // Simple hash function for consistent pseudorandom values
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const cardData = await fetchAllCardData();
        setData(cardData);
        setError(null);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Memoize the computed data to prevent unnecessary recalculations
  const skuData = useMemo((): SkuItem[] => {
    if (!data["blinkit-insights-sku"] || loading) {
      return [
        {
          id: 1,
          selected: true,
          name: "Protein Bar 100g",
          sales: "₹93,132.12",
          salesPercentage: 2.4,
          outOfStock: "1.68%",
          totalInventory: "931.9",
          avgRank: "3.2",
          estTraffic: "12,303",
          estImpressions: "25,005",
          cr: "1.8%",
        },
        {
          id: 2,
          selected: true,
          name: "Choco Bar 100g",
          sales: "₹8,526.32",
          salesPercentage: 6.79,
          outOfStock: "6.79%",
          totalInventory: "679",
          avgRank: "7",
          estTraffic: "3005",
          estImpressions: "4231",
          cr: "2.3%",
        },
        {
          id: 3,
          selected: true,
          name: "Choco Bar 100g",
          sales: "₹7,012.72",
          salesPercentage: 2.4,
          outOfStock: "3.28%",
          totalInventory: "328",
          avgRank: "4",
          estTraffic: "2960",
          estImpressions: "3657",
          cr: "4.8%",
          growthNegative: true,
        },
      ];
    }

    // Here you would transform the Cube.JS data into the format expected by your UI
    return data["blinkit-insights-sku"].data.map(
      (item: Record<string, unknown>, index: number) => ({
        id: index + 1,
        selected: index < 3,
        name:
          (item["blinkit_insights_sku.name"] as string) ||
          `Product ${index + 1}`,
        sales: `₹${formatNumber(
          (item["blinkit_insights_sku.sales_mrp_sum"] as number) || 0
        )}`,
        salesPercentage: 2.4, // This would come from comparing with previous period
        outOfStock: `${
          (item["blinkit_scraping_stream.on_shelf_availability"] as number) || 0
        }%`,
        totalInventory: formatNumber(
          (item["blinkit_insights_sku.inv_qty"] as number) || 0
        ),
        avgRank: (item["blinkit_scraping_stream.rank_avg"] as string) || "0",
        estTraffic: formatNumber(Math.round(Math.random() * 10000)),
        estImpressions: formatNumber(Math.round(Math.random() * 20000)),
        cr: `${(Math.random() * 5).toFixed(1)}%`,
        growthNegative: index % 3 === 2, // Just for demonstration
      })
    );
  }, [data, loading]);

  // Memoize city data
  const cityData = useMemo((): CityItem[] => {
    if (!data["blinkit-insights-city"] || loading) {
      return [
        {
          id: 1,
          selected: true,
          name: "Delhi",
          sales: "₹93,132.12",
          salesPercentage: 1.68,
          outOfStock: "1.68%",
          totalInventory: "931.9",
          avgRank: "3.2",
          estTraffic: "12,303",
          estImpressions: "25,005",
          cr: "1.8%",
        },
        {
          id: 2,
          selected: true,
          name: "Bengaluru",
          sales: "₹8,526.32",
          salesPercentage: 2.4,
          outOfStock: "6.79%",
          totalInventory: "679",
          avgRank: "7",
          estTraffic: "3005",
          estImpressions: "4231",
          cr: "2.3%",
          growthNegative: true,
        },
      ];
    }

    // Transform Cube.JS data
    return data["blinkit-insights-city"].data.map(
      (item: Record<string, unknown>, index: number) => ({
        id: index + 1,
        selected: index < 2,
        name:
          (item["blinkit_insights_city.name"] as string) || `City ${index + 1}`,
        sales: `₹${formatNumber(
          (item["blinkit_insights_city.sales_mrp_sum"] as number) || 0
        )}`,
        salesPercentage: Number((Math.random() * 3).toFixed(2)),
        outOfStock: `${(Math.random() * 10).toFixed(2)}%`,
        totalInventory: formatNumber(
          (item["blinkit_insights_city.inv_qty"] as number) || 0
        ),
        avgRank: (Math.random() * 10).toFixed(1),
        estTraffic: formatNumber(Math.round(Math.random() * 15000)),
        estImpressions: formatNumber(Math.round(Math.random() * 30000)),
        cr: `${(Math.random() * 5).toFixed(1)}%`,
        growthNegative: index % 2 === 1, // Alternate for demonstration
      })
    );
  }, [data, loading]);

  // Memoize city metrics
  const cityMetrics = useMemo((): CityMetric[] => {
    if (!data["blinkit-insights-city-sales_mrp_sum"] || loading) {
      return [
        {
          city: "New Delhi",
          amount: "₹26.5L",
          percentage: 35,
          growth: 1.2,
          positive: true,
        },
        {
          city: "Mumbai",
          amount: "₹36.4L",
          percentage: 23,
          growth: 3.3,
          positive: false,
        },
        {
          city: "West Bengal",
          amount: "₹12.2L",
          percentage: 21,
          growth: 2.3,
          positive: false,
        },
        {
          city: "Others",
          amount: "₹24.3L",
          percentage: 9,
          growth: 1.09,
          positive: true,
        },
      ];
    }

    // Calculate total for percentages
    const cityData = data["blinkit-insights-city-sales_mrp_sum"].data;
    const total = cityData.reduce(
      (sum: number, city: Record<string, unknown>) =>
        sum + ((city["blinkit_insights_city.sales_mrp_sum"] as number) || 0),
      0
    );

    // Use a seed to make random values consistent between renders
    const seed = total.toString();

    return cityData.map((city: Record<string, unknown>, index: number) => {
      const sales =
        (city["blinkit_insights_city.sales_mrp_sum"] as number) || 0;
      const percentage = total > 0 ? Math.round((sales / total) * 100) : 0;

      // Use hash-based pseudorandom values instead of pure random
      const hash = hashCode(`${seed}-${index}`);
      const growthValue = (hash % 500) / 100; // Value between 0 and 5
      const positiveGrowth = hash % 2 === 0;

      return {
        city:
          (city["blinkit_insights_city.name"] as string) || `City ${index + 1}`,
        amount: `₹${formatCurrency(sales)}`,
        percentage,
        growth: Number(growthValue.toFixed(2)),
        positive: positiveGrowth,
      };
    });
  }, [data, loading]);

  // Memoize sales data
  const salesData = useMemo((): SalesData => {
    if (!data["blinkit-insights-sku-sales_mrp"] || loading) {
      return {
        totalSales: "125.49",
        salesGrowth: 2.4,
        lastMonthSales: "119.69",
      };
    }

    const salesData = data["blinkit-insights-sku-sales_mrp"].data[0];
    const totalSales =
      (salesData["blinkit_insights_sku.sales_mrp_sum"] as number) || 0;
    // This would need to be calculated based on previous period data
    const lastMonthSales = totalSales * 0.95; // Just an example
    const salesGrowth = ((totalSales - lastMonthSales) / lastMonthSales) * 100;

    return {
      totalSales: totalSales.toFixed(2),
      salesGrowth: Number(salesGrowth.toFixed(1)),
      lastMonthSales: lastMonthSales.toFixed(2),
    };
  }, [data, loading]);

  // Memoize items sold data
  const itemsSoldData = useMemo((): ItemsSoldData => {
    if (!data["blinkit-insights-sku-qty_sold"] || loading) {
      return {
        totalSold: "125.49",
        soldGrowth: 2.4,
        lastMonthSold: "119.69",
      };
    }

    const salesData = data["blinkit-insights-sku-qty_sold"].data[0];
    const totalSold =
      (salesData["blinkit_insights_sku.qty_sold"] as number) || 0;
    // This would need to be calculated based on previous period data
    const lastMonthSold = totalSold * 0.95; // Just an example
    const soldGrowth = ((totalSold - lastMonthSold) / lastMonthSold) * 100;

    return {
      totalSold: totalSold.toFixed(2),
      soldGrowth: Number(soldGrowth.toFixed(1)),
      lastMonthSold: lastMonthSold.toFixed(2),
    };
  }, [data, loading]);

  // Memoize revenue data
  const revenueData = useMemo((): RevenueData => {
    if (!data["blinkit-insights-city-sales_mrp_sum"] || loading) {
      return {
        totalRevenue: "₹68.2L",
        revenueGrowth: 2.2,
      };
    }

    const cityData = data["blinkit-insights-city-sales_mrp_sum"].data;
    const total = cityData.reduce(
      (sum: number, city: Record<string, unknown>) =>
        sum + ((city["blinkit_insights_city.sales_mrp_sum"] as number) || 0),
      0
    );

    return {
      totalRevenue: `₹${formatCurrency(total)}`,
      revenueGrowth: 2.2, // This would need calculation with previous period
    };
  }, [data, loading]);

  // Toggle functions for platform and item selection
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms((prev) => prev.filter((p) => p !== platform));
      }
    } else {
      setSelectedPlatforms((prev) => [...prev, platform]);
    }
  };

  return {
    loading,
    error,
    dateRange,
    selectedPlatforms,
    togglePlatform,
    toggleSKUSelection: () => {}, // These are now managed in Dashboard.tsx
    toggleCitySelection: () => {}, // These are now managed in Dashboard.tsx
    skuData,
    cityData,
    cityMetrics,
    salesData,
    itemsSoldData,
    revenueData,
  };
}
