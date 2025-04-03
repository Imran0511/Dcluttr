import axios from "axios";

// Cube.js API configuration
const CUBE_API_URL =
  process.env.NEXT_PUBLIC_CUBE_API_URL || "https://api.cube.dev/cubejs-api/v1";
const CUBE_API_TOKEN =
  process.env.NEXT_PUBLIC_CUBE_API_TOKEN || "your_default_api_token";

type CubeResponse = {
  data: Record<string, unknown>[];
  meta?: Record<string, unknown>;
};

type CardData = Record<
  string,
  {
    data: Record<string, unknown>[];
    meta?: Record<string, unknown>;
  }
>;

interface TimeDimension {
  dimension: string;
  dateRange?: [string, string];
  granularity?: string;
}

/**
 * Fetch data from Cube.js API
 * @param queryJson JSON string containing the Cube.js query
 * @returns Promise with the response data
 */
export async function fetchCubeData(queryJson: string): Promise<CubeResponse> {
  try {
    // Parse the query JSON
    const query = JSON.parse(queryJson);

    // Modify date range to be February 2025
    if (query.timeDimensions && query.timeDimensions.length > 0) {
      query.timeDimensions.forEach((timeDimension: TimeDimension) => {
        if (timeDimension.dateRange) {
          timeDimension.dateRange = ["2025-02-01", "2025-02-28"];
        }
      });
    }

    // Make API request to Cube.js
    const response = await axios.post(
      `${CUBE_API_URL}/load`,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CUBE_API_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Cube data:", error);
    throw new Error("Failed to fetch data from Cube.js API");
  }
}

/**
 * Fetch data for all active cards from dashboard config
 * @returns Promise with all card data
 */
export async function fetchAllCardData(): Promise<CardData> {
  try {
    // In a real implementation, you would import dashboardConfig here
    // and iterate through all active cards
    // For now, we'll create a mock response

    const mockData: CardData = {
      "blinkit-insights-sku": {
        data: [
          {
            "blinkit_insights_sku.name": "Protein Bar 100g",
            "blinkit_insights_sku.sales_mrp_sum": 93132.12,
            "blinkit_scraping_stream.on_shelf_availability": 98.32,
            "blinkit_insights_sku.inv_qty": 931.9,
            "blinkit_scraping_stream.rank_avg": 3.2,
          },
          {
            "blinkit_insights_sku.name": "Choco Bar 100g",
            "blinkit_insights_sku.sales_mrp_sum": 8526.32,
            "blinkit_scraping_stream.on_shelf_availability": 93.21,
            "blinkit_insights_sku.inv_qty": 679,
            "blinkit_scraping_stream.rank_avg": 7,
          },
        ],
      },
      "blinkit-insights-city": {
        data: [
          {
            "blinkit_insights_city.name": "Delhi",
            "blinkit_insights_city.sales_mrp_sum": 93132.12,
            "blinkit_insights_city.inv_qty": 931.9,
          },
          {
            "blinkit_insights_city.name": "Bengaluru",
            "blinkit_insights_city.sales_mrp_sum": 8526.32,
            "blinkit_insights_city.inv_qty": 679,
          },
        ],
      },
      "blinkit-insights-city-sales_mrp_sum": {
        data: [
          {
            "blinkit_insights_city.name": "New Delhi",
            "blinkit_insights_city.sales_mrp_sum": 2650000,
          },
          {
            "blinkit_insights_city.name": "Mumbai",
            "blinkit_insights_city.sales_mrp_sum": 3640000,
          },
          {
            "blinkit_insights_city.name": "West Bengal",
            "blinkit_insights_city.sales_mrp_sum": 1220000,
          },
          {
            "blinkit_insights_city.name": "Others",
            "blinkit_insights_city.sales_mrp_sum": 2430000,
          },
        ],
      },
      "blinkit-insights-sku-sales_mrp": {
        data: [
          {
            "blinkit_insights_sku.sales_mrp_sum": 125490,
          },
        ],
      },
      "blinkit-insights-sku-qty_sold": {
        data: [
          {
            "blinkit_insights_sku.qty_sold": 125.49,
          },
        ],
      },
    };

    return mockData;
  } catch (error) {
    console.error("Error fetching all card data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}
