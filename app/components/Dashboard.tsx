"use client";

import styles from "./Dashboard.module.css";
import ProgressRing from "./ProgressRing";
import SalesChart from "./SalesChart";
import Image from "next/image";
import { useDashboardData } from "../hooks/useDashboardData";
import { useEffect, useState, useRef, useCallback } from "react";
import { SkuItem, CityItem, CityMetric } from "../types/dashboardTypes";
import {
  testCubeApiAvailability,
  testCubeApiWithDirectQuery,
} from "../services/cubeService";

export default function Dashboard() {
  const {
    dateRange,
    selectedPlatforms,
    togglePlatform,
    skuData: apiSkuData,
    cityData: apiCityData,
    cityMetrics,
    salesData,
    itemsSoldData,
    revenueData,
    loading,
    error,
    data: rawData,
  } = useDashboardData();

  console.log("Dashboard received sales data:", salesData);
  console.log("Dashboard received items sold data:", itemsSoldData);
  console.log("Total Sales Value:", salesData.totalSales);
  console.log("Total Quantity Sold Value:", itemsSoldData.totalSold);

  // Check if we're using real data or fallback
  useEffect(() => {
    if (!loading) {
      console.log("🔍 Checking data sources:");

      // Check sales data
      const salesCardData = rawData["blinkit-insights-sku-sales_mrp"];
      console.log(
        "📊 Sales data:",
        salesCardData?.data?.length > 0 ? "REAL DATA" : "FALLBACK DATA"
      );

      // Check items sold data
      const itemsCardData = rawData["blinkit-insights-sku-qty_sold"];
      console.log(
        "📊 Items sold data:",
        itemsCardData?.data?.length > 0 ? "REAL DATA" : "FALLBACK DATA"
      );

      // Check city metrics data
      const cityMetricsData = rawData["blinkit-insights-city-sales_mrp_sum"];
      console.log(
        "📊 City metrics data:",
        cityMetricsData?.data?.length > 0 ? "REAL DATA" : "FALLBACK DATA"
      );

      // Check SKU data
      const skuCardData = rawData["blinkit-insights-sku"];
      console.log(
        "📊 SKU data:",
        skuCardData?.data?.length > 0 ? "REAL DATA" : "FALLBACK DATA"
      );

      // Check city data
      const cityCardData = rawData["blinkit-insights-city"];
      console.log(
        "📊 City data:",
        cityCardData?.data?.length > 0 ? "REAL DATA" : "FALLBACK DATA"
      );

      // Check if there was any API error
      if (error) {
        console.error("❌ API Error:", error);
      }
    }
  }, [loading, rawData, error]);

  // Destructure values from salesData and itemsSoldData
  const { totalSales, salesGrowth, lastMonthSales } = salesData;
  const { totalSold, soldGrowth, lastMonthSold } = itemsSoldData;
  const { totalRevenue, revenueGrowth } = revenueData;

  // References for initial load
  const initialLoadRef = useRef(false);

  // Local state to handle user interactions
  const [skuData, setSkuData] = useState<SkuItem[]>([]);
  const [cityData, setCityData] = useState<CityItem[]>([]);

  // Update local state when API data changes
  useEffect(() => {
    if (!loading && !initialLoadRef.current) {
      setSkuData(apiSkuData);
      setCityData(apiCityData);
      initialLoadRef.current = true;
    }
  }, [loading, apiSkuData, apiCityData]);

  // Create stable toggle functions
  const toggleSKUSelection = useCallback((id: number) => {
    setSkuData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  const toggleCitySelection = useCallback((id: number) => {
    setCityData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  }, []);

  // Test API availability on component mount
  useEffect(() => {
    const testApi = async () => {
      console.log("🧪 Testing Cube.js API availability from Dashboard...");

      // First try the original test
      const isApiAvailable = await testCubeApiAvailability();
      console.log(
        `🧪 Original API test result: ${
          isApiAvailable ? "AVAILABLE" : "UNAVAILABLE"
        }`
      );

      // Then try the direct query test
      const isDirectApiAvailable = await testCubeApiWithDirectQuery();
      console.log(
        `🧪 Direct API test result: ${
          isDirectApiAvailable ? "AVAILABLE" : "UNAVAILABLE"
        }`
      );

      // Overall result
      const apiStatus = isApiAvailable || isDirectApiAvailable;
      console.log(
        `🧪 Overall API availability: ${
          apiStatus ? "AVAILABLE" : "UNAVAILABLE"
        }`
      );

      if (!apiStatus) {
        console.log(
          "🧪 API is unavailable, using fallback data for all components"
        );
      }
    };

    testApi();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1>Quick Commerce</h1>
          <div className={styles.headerRight}>
            <button className={styles.chartButton}>
              <Image
                src="/icons/ChartLine.svg"
                width={20}
                height={20}
                alt="Chart"
              />
              <Image
                src="/icons/bi_toggle-on.svg"
                width={20}
                height={20}
                alt="Toggle"
              />
            </button>
            <div className={styles.dateSelector}>
              <Image
                src="/icons/CalendarDots.svg"
                width={18}
                height={18}
                alt="Calendar"
              />
              <span>{dateRange}</span>
              <Image
                src="/icons/arrow_down.svg"
                width={12}
                height={10}
                alt="Dropdown"
              />
            </div>
          </div>
        </div>

        <div className={styles.platformTags}>
          <div
            className={`${styles.platformTag} ${styles.blinkit} ${
              selectedPlatforms.includes("blinkit") ? styles.active : ""
            }`}
            onClick={() => togglePlatform("blinkit")}
          >
            <Image
              src="/icons/Blinkit Logo.svg"
              width={24}
              height={24}
              alt="Blinkit Logo"
            />
            <span>Blinkit</span>
          </div>
          <div
            className={`${styles.platformTag} ${styles.zepto} ${
              selectedPlatforms.includes("zepto") ? styles.active : ""
            }`}
            onClick={() => togglePlatform("zepto")}
          >
            <Image
              src="/icons/Zepto Logo.svg"
              width={24}
              height={24}
              alt="Zepto Logo"
            />
            <span>Zepto</span>
          </div>
          <div
            className={`${styles.platformTag} ${styles.instamart} ${
              selectedPlatforms.includes("instamart") ? styles.active : ""
            }`}
            onClick={() => togglePlatform("instamart")}
          >
            <Image
              src="/icons/instamart.svg"
              width={24}
              height={24}
              alt="Instamart Logo"
            />
            <span>Instamart</span>
          </div>
        </div>

        <div className={styles.metricsContainer}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3>Sales (MRP)</h3>
              <button className={styles.infoButton}>
                <Image
                  src="/icons/help.svg"
                  width={16}
                  height={16}
                  alt="Info"
                />
              </button>
            </div>
            <div className={styles.metricBody}>
              <div className={styles.metricValue}>
                {totalSales}
                <div className={styles.growth}>
                  <span
                    className={styles.growthIndicator}
                    style={{ color: "var(--success-color)" }}
                  >
                    ↑ {salesGrowth}%
                  </span>
                  <div className={styles.metricSubtext}>
                    vs {lastMonthSales} last month
                  </div>
                </div>
              </div>

              <div className={styles.chartWrapper}>
                <SalesChart type="sales" />
              </div>
            </div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3>Total Quantity Sold</h3>
              <button className={styles.infoButton}>
                <Image
                  src="/icons/help.svg"
                  width={16}
                  height={16}
                  alt="Info"
                />
              </button>
            </div>
            <div className={styles.metricBody}>
              <div className={styles.metricValue}>
                {totalSold}
                <div className={styles.growth}>
                  <span
                    className={styles.growthIndicator}
                    style={{ color: "var(--success-color)" }}
                  >
                    ↑ {soldGrowth}%
                  </span>
                  <div className={styles.metricSubtext}>
                    vs {lastMonthSold} last month
                  </div>
                </div>
              </div>

              <div className={styles.chartWrapper}>
                <SalesChart type="quantity" />
              </div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <h3>Top Cities</h3>
              <button className={styles.infoButton}>
                <Image
                  src="/icons/help.svg"
                  width={16}
                  height={16}
                  alt="Info"
                />
              </button>
            </div>
            <div className={styles.progressRingContainer}>
              <div className={styles.ringWrapper}>
                <ProgressRing />
                <div className={styles.ringCenter}>
                  <div>Total</div>
                  <div className={styles.ringValue}>{totalRevenue}</div>
                  <div
                    className={styles.ringGrowth}
                    style={{ color: "var(--success-color)" }}
                  >
                    ↑ {revenueGrowth}%
                  </div>
                </div>
              </div>
              <div className={styles.metricBody}>
                <div className={styles.cityMetrics}>
                  {cityMetrics.map((city: CityMetric, index: number) => (
                    <div key={index} className={styles.cityMetricItem}>
                      <div
                        className={styles.cityDot}
                        style={{ backgroundColor: getCityColor(index) }}
                      ></div>
                      <div className={styles.cityName}>{city.city}</div>
                      <div className={styles.cityAmount}>{city.amount}</div>
                      <div className={styles.cityPercentage}>
                        {city.percentage}%
                      </div>
                      <div
                        className={styles.cityGrowth}
                        style={{
                          color: city.positive
                            ? "var(--success-color)"
                            : "var(--danger-color)",
                        }}
                      >
                        {city.positive ? "↑" : "↓"} {city.growth}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dataSection}>
          <div className={styles.dataSectionHeader}>
            <div className={styles.sectionTitle}>
              <h2>SKU level data</h2>
              <p>Analytics for all your SKUs</p>
            </div>
            <div className={styles.filterButton}>
              <span>Filters(1)</span>
              <Image
                src="/icons/arrow_down_white.svg"
                width={12}
                height={10}
                alt="Filter dropdown"
              />
            </div>
          </div>

          <div className={styles.dataTable}>
            <div className={styles.mainheader}>
              <div className={styles.categoryHeaders}>
                <div className={styles.nameColumn}>
                  <div className={styles.headerCellContent}>
                    <Image
                      src="/icons/ChartLine.svg"
                      width={20}
                      height={20}
                      alt="Sort"
                    />
                    <span>SKU Name</span>
                  </div>
                </div>
                <div className={styles.availabilityCategory}>
                  <p className={styles.availabilityCategoryHeading}>
                    Availability
                  </p>
                  <div className={styles.items1}>
                    <div className={styles.headerCellContent}>
                      <span>Sales</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>

                    <div className={styles.headerCellContent}>
                      <span>Out of Stock</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>

                    <div className={styles.headerCellContent}>
                      <span>Total Inventory</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.visibilityCategory}>
                  <p className={styles.availabilityCategoryHeading}>
                    Visibility
                  </p>
                  <div className={styles.items1}>
                    <div className={styles.headerCellContent}>
                      <span>Average Rank</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>
                    <div className={styles.headerCellContent}>
                      <span>Est. Traffic</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>
                    <div className={styles.headerCellContent}>
                      <span>Est. Impressions</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>
                    <div className={styles.headerCellContent}>
                      <span>CR</span>
                      <Image
                        src="/icons/arrow_down.svg"
                        width={12}
                        height={10}
                        alt="Sort"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tableBody}>
              {skuData.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.tableRow} ${
                    item.selected ? styles.selected : ""
                  }`}
                >
                  <div className={styles.tableCell} style={{ width: "40px" }}>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSKUSelection(item.id)}
                    />
                  </div>
                  <div className={styles.tableCell} style={{ width: "180px" }}>
                    {item.name}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    <div>{item.sales}</div>
                    {item.salesPercentage > 0 && (
                      <div
                        className={styles.growthCell}
                        style={{
                          color: item.growthNegative
                            ? "var(--danger-color)"
                            : "var(--success-color)",
                        }}
                      >
                        {item.growthNegative ? "↓" : "↑"} {item.salesPercentage}
                        %
                      </div>
                    )}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    {item.outOfStock}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    {item.totalInventory}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    {item.avgRank}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    <div>{item.estTraffic}</div>
                    {item.salesPercentage > 0 && (
                      <div
                        className={styles.growthCell}
                        style={{
                          color: item.growthNegative
                            ? "var(--danger-color)"
                            : "var(--success-color)",
                        }}
                      >
                        {item.growthNegative ? "↓" : "↑"} {item.salesPercentage}
                        %
                      </div>
                    )}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    <div>{item.estImpressions}</div>
                    {item.salesPercentage > 0 && (
                      <div
                        className={styles.growthCell}
                        style={{
                          color: item.growthNegative
                            ? "var(--danger-color)"
                            : "var(--success-color)",
                        }}
                      >
                        {item.growthNegative ? "↓" : "↑"} {item.salesPercentage}
                        %
                      </div>
                    )}
                  </div>
                  <div className={styles.tableCell} style={{ width: "100px" }}>
                    {item.cr}
                  </div>
                </div>
              ))}

              <div className={styles.totalRow}>
                <div
                  className={styles.tableCell}
                  style={{ width: "40px" }}
                ></div>
                <div
                  className={styles.tableCell}
                  style={{ width: "180px", fontWeight: "600" }}
                >
                  Total
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  ₹2,93,132.12
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  16%
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  2931
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  8.3
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  61,985
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  2,61,768
                </div>
                <div className={styles.tableCell} style={{ width: "100px" }}>
                  1.9%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dataSection}>
          <div className={styles.dataSectionHeader}>
            <div className={styles.sectionTitle}>
              <h2>City level data</h2>
              <p>Analytics for all your Cities</p>
            </div>
            <div className={styles.filterButton}>
              <span>Filters(1)</span>
              <Image
                src="/icons/arrow_down_white.svg"
                width={12}
                height={10}
                alt="Filter dropdown"
              />
            </div>
          </div>

          <div className={styles.dataTable}>
            <div className={styles.categoryHeaders}>
              <div className={styles.nameColumn}>
                <div className={styles.headerCellContent}>
                  <span>City Name</span>
                </div>
              </div>
              <div className={styles.availabilityCategory}>
                <p className={styles.availabilityCategoryHeading}>
                  Availability
                </p>
                <div className={styles.items1}>
                  <div className={styles.headerCellContent}>
                    <span>Sales</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>

                  <div className={styles.headerCellContent}>
                    <span>Out of Stock</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>

                  <div className={styles.headerCellContent}>
                    <span>Total Inventory</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.visibilityCategory}>
                <p className={styles.availabilityCategoryHeading}>Visibility</p>
                <div className={styles.items1}>
                  <div className={styles.headerCellContent}>
                    <span>Average Rank</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>
                  <div className={styles.headerCellContent}>
                    <span>Est. Traffic</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>
                  <div className={styles.headerCellContent}>
                    <span>Est. Impressions</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>
                  <div className={styles.headerCellContent}>
                    <span>CR</span>
                    <Image
                      src="/icons/arrow_down.svg"
                      width={12}
                      height={10}
                      alt="Sort"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.tableBody}>
              {cityData.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.tableRow} ${
                    item.selected ? styles.selected : ""
                  }`}
                >
                  <div className={styles.tableCell} style={{ width: "40px" }}>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleCitySelection(item.id)}
                    />
                  </div>
                  <div className={styles.tableCell} style={{ width: "180px" }}>
                    {item.name}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    <div>{item.sales}</div>
                    {item.salesPercentage > 0 && (
                      <div
                        className={styles.growthCell}
                        style={{
                          color: item.growthNegative
                            ? "var(--danger-color)"
                            : "var(--success-color)",
                        }}
                      >
                        {item.growthNegative ? "↓" : "↑"} {item.salesPercentage}
                        %
                      </div>
                    )}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    {item.outOfStock}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    {item.totalInventory}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    {item.avgRank}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    <div>{item.estTraffic}</div>
                    {item.salesPercentage > 0 && (
                      <div
                        className={styles.growthCell}
                        style={{
                          color: item.growthNegative
                            ? "var(--danger-color)"
                            : "var(--success-color)",
                        }}
                      >
                        {item.growthNegative ? "↓" : "↑"} {item.salesPercentage}
                        %
                      </div>
                    )}
                  </div>
                  <div className={styles.tableCell} style={{ width: "120px" }}>
                    <div>{item.estImpressions}</div>
                    {item.salesPercentage > 0 && (
                      <div
                        className={styles.growthCell}
                        style={{
                          color: item.growthNegative
                            ? "var(--danger-color)"
                            : "var(--success-color)",
                        }}
                      >
                        {item.growthNegative ? "↓" : "↑"} {item.salesPercentage}
                        %
                      </div>
                    )}
                  </div>
                  <div className={styles.tableCell} style={{ width: "100px" }}>
                    {item.cr}
                  </div>
                </div>
              ))}

              <div className={styles.totalRow}>
                <div
                  className={styles.tableCell}
                  style={{ width: "40px" }}
                ></div>
                <div
                  className={styles.tableCell}
                  style={{ width: "180px", fontWeight: "600" }}
                >
                  Total
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  ₹2,93,132.12
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  16%
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  2931
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  8.3
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  61,985
                </div>
                <div className={styles.tableCell} style={{ width: "120px" }}>
                  2,61,768
                </div>
                <div className={styles.tableCell} style={{ width: "100px" }}>
                  1.9%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCityColor(index: number) {
  const colors = ["#4E56C8", "#E05252", "#EFBF31", "#8D8D8D"];
  return colors[index % colors.length];
}
