"use client";

import { useState } from "react";
import styles from "./Dashboard.module.css";

import ProgressRing from "./ProgressRing";
import SalesChart from "./SalesChart";
import Image from "next/image";
export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateRange, setDateRange] = useState("Aug 01, 2024 - Aug 03, 2024");
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "blinkit",
    "zepto",
    "instamart",
  ]);
  const [skuData, setSkuData] = useState([
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
      selected: false,
      name: "SKU 3",
      sales: "₹9313",
      salesPercentage: 1.68,
      outOfStock: "1.68%",
      totalInventory: "931.9",
      avgRank: "11",
      estTraffic: "1931.9",
      estImpressions: "₹931.9",
      cr: "1.8%",
    },
    {
      id: 4,
      selected: false,
      name: "SKU 4",
      sales: "₹0",
      salesPercentage: 0,
      outOfStock: "0",
      totalInventory: "0",
      avgRank: "0",
      estTraffic: "₹0",
      estImpressions: "₹0",
      cr: "0.0%",
    },
  ]);

  const [cityData, setCityData] = useState([
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
      salesPercentage: 3.28,
      outOfStock: "6.79%",
      totalInventory: "679",
      avgRank: "7",
      estTraffic: "3005",
      estImpressions: "4231",
      cr: "2.3%",
    },
    {
      id: 3,
      selected: false,
      name: "SKU 3",
      sales: "₹9313",
      salesPercentage: 1.68,
      outOfStock: "1.68%",
      totalInventory: "931.9",
      avgRank: "11",
      estTraffic: "1931.9",
      estImpressions: "₹931.9",
      cr: "1.8%",
    },
    {
      id: 4,
      selected: false,
      name: "SKU 4",
      sales: "₹0",
      salesPercentage: 0,
      outOfStock: "0",
      totalInventory: "0",
      avgRank: "0",
      estTraffic: "₹0",
      estImpressions: "₹0",
      cr: "0.0%",
    },
  ]);

  const cityMetrics = [
    { city: "New Delhi", amount: "₹26.5L", percentage: 35, growth: 1.2 },
    { city: "Mumbai", amount: "₹16.4L", percentage: 23, growth: 3.3 },
    { city: "West Bengal", amount: "₹12.2L", percentage: 21, growth: 2.3 },
    { city: "Others", amount: "₹24.3L", percentage: 9, growth: 1.09 },
  ];

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const toggleSKUSelection = (id: number) => {
    setSkuData(
      skuData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleCitySelection = (id: number) => {
    setCityData(
      cityData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const totalSales = "125.49";
  const salesGrowth = 2.4;
  const lastMonthSales = "119.69";

  const totalSold = "125.49";
  const soldGrowth = 2.4;
  const lastMonthSold = "119.69";

  const totalRevenue = "68.2L";
  const revenueGrowth = 2.2;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Quick Commerce</h1>
        <div className={styles.headerRight}>
          <button className={styles.chartButton}></button>
          <div className={styles.dateSelector}>
            <Image
              src="/icons/CalendarDots.svg"
              width={18}
              height={18}
              alt="Calendar"
            />
            <span>{dateRange}</span>
            <Image
              src="/icons/ArrowDown.svg"
              width={16}
              height={16}
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
              <Image src="/icons/help.svg" width={16} height={16} alt="Info" />
            </button>
          </div>
          <div className={styles.metricValue}>
            {totalSales}
            <span
              className={styles.growthIndicator}
              style={{
                color:
                  salesGrowth > 0
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {salesGrowth > 0 ? "↑" : "↓"} {Math.abs(salesGrowth)}%
            </span>
          </div>
          <div className={styles.metricSubtext}>
            vs {lastMonthSales} last month
          </div>
          <div className={styles.chartWrapper}>
            <SalesChart />
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3>Total Quantity Sold</h3>
            <button className={styles.infoButton}>
              <Image src="/icons/help.svg" width={16} height={16} alt="Info" />
            </button>
          </div>
          <div className={styles.metricValue}>
            {totalSold}
            <span
              className={styles.growthIndicator}
              style={{
                color:
                  soldGrowth > 0
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {soldGrowth > 0 ? "↑" : "↓"} {Math.abs(soldGrowth)}%
            </span>
          </div>
          <div className={styles.metricSubtext}>
            vs {lastMonthSold} last month
          </div>
          <div className={styles.chartWrapper}>
            <SalesChart />
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3>Top Cities</h3>
            <button className={styles.infoButton}>
              <Image src="/icons/help.svg" width={16} height={16} alt="Info" />
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
            <div className={styles.cityMetrics}>
              {cityMetrics.map((city, index) => (
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
                      color:
                        city.growth > 0
                          ? "var(--success-color)"
                          : "var(--danger-color)",
                    }}
                  >
                    {city.growth > 0 ? "↑" : "↓"} {city.growth}%
                  </div>
                </div>
              ))}
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
              src="/icons/ArrowDown.svg"
              width={16}
              height={16}
              alt="Filter dropdown"
            />
          </div>
        </div>

        <div className={styles.dataTable}>
          <div className={styles.tableHeader}>
            <div
              className={styles.tableHeaderCell}
              style={{ width: "40px" }}
            ></div>
            <div className={styles.tableHeaderCell} style={{ width: "200px" }}>
              <div className={styles.headerCellContent}>
                <Image
                  src="/icons/channels.svg"
                  width={16}
                  height={16}
                  alt="List"
                />
                <span>SKU Name</span>
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Sales</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Out of Stock</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Total Inventory</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Average Rank</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Est. Traffic</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Est. Impressions</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>CR</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
          </div>

          <div className={styles.tableBody}>
            {skuData.map((item) => (
              <div key={item.id} className={styles.tableRow}>
                <div className={styles.tableCell} style={{ width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSKUSelection(item.id)}
                  />
                </div>
                <div className={styles.tableCell} style={{ width: "200px" }}>
                  {item.name}
                </div>
                <div className={styles.tableCell}>
                  <div>{item.sales}</div>
                  {item.salesPercentage > 0 && (
                    <div
                      className={styles.growthCell}
                      style={{ color: "var(--success-color)" }}
                    >
                      ↑ {item.salesPercentage}%
                    </div>
                  )}
                </div>
                <div className={styles.tableCell}>{item.outOfStock}</div>
                <div className={styles.tableCell}>{item.totalInventory}</div>
                <div className={styles.tableCell}>{item.avgRank}</div>
                <div className={styles.tableCell}>
                  <div>{item.estTraffic}</div>
                  {item.salesPercentage > 0 && (
                    <div
                      className={styles.growthCell}
                      style={{ color: "var(--success-color)" }}
                    >
                      ↑ {item.salesPercentage}%
                    </div>
                  )}
                </div>
                <div className={styles.tableCell}>
                  <div>{item.estImpressions}</div>
                  {item.salesPercentage > 0 && (
                    <div
                      className={styles.growthCell}
                      style={{ color: "var(--success-color)" }}
                    >
                      ↑ {item.salesPercentage}%
                    </div>
                  )}
                </div>
                <div className={styles.tableCell}>{item.cr}</div>
              </div>
            ))}

            <div className={styles.tableFooter}>
              <div className={styles.tableCell} style={{ width: "40px" }}></div>
              <div
                className={styles.tableCell}
                style={{ width: "200px", fontWeight: "bold" }}
              >
                Total
              </div>
              <div className={styles.tableCell}>₹2,93,132.12</div>
              <div className={styles.tableCell}>16%</div>
              <div className={styles.tableCell}>2931</div>
              <div className={styles.tableCell}>8.3</div>
              <div className={styles.tableCell}>61,985</div>
              <div className={styles.tableCell}>2,61,768</div>
              <div className={styles.tableCell}>1.9%</div>
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
              src="/icons/ArrowDown.svg"
              width={16}
              height={16}
              alt="Filter dropdown"
            />
          </div>
        </div>

        <div className={styles.dataTable}>
          <div className={styles.tableHeader}>
            <div
              className={styles.tableHeaderCell}
              style={{ width: "40px" }}
            ></div>
            <div className={styles.tableHeaderCell} style={{ width: "200px" }}>
              <div className={styles.headerCellContent}>
                <Image
                  src="/icons/channels.svg"
                  width={16}
                  height={16}
                  alt="List"
                />
                <span>SKU Name</span>
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Sales</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Out of Stock</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Total Inventory</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Average Rank</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Est. Traffic</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>Est. Impressions</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
            <div className={styles.tableHeaderCell}>
              <div className={styles.headerCellContent}>
                <span>CR</span>
                <Image
                  src="/icons/ArrowDown.svg"
                  width={16}
                  height={16}
                  alt="Sort"
                />
              </div>
            </div>
          </div>

          <div className={styles.tableBody}>
            {cityData.map((item) => (
              <div key={item.id} className={styles.tableRow}>
                <div className={styles.tableCell} style={{ width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleCitySelection(item.id)}
                  />
                </div>
                <div className={styles.tableCell} style={{ width: "200px" }}>
                  {item.name}
                </div>
                <div className={styles.tableCell}>
                  <div>{item.sales}</div>
                  {item.salesPercentage > 0 && (
                    <div
                      className={styles.growthCell}
                      style={{ color: "var(--success-color)" }}
                    >
                      ↑ {item.salesPercentage}%
                    </div>
                  )}
                </div>
                <div className={styles.tableCell}>{item.outOfStock}</div>
                <div className={styles.tableCell}>{item.totalInventory}</div>
                <div className={styles.tableCell}>{item.avgRank}</div>
                <div className={styles.tableCell}>
                  <div>{item.estTraffic}</div>
                  {item.salesPercentage > 0 && (
                    <div
                      className={styles.growthCell}
                      style={{ color: "var(--success-color)" }}
                    >
                      ↑ {item.salesPercentage}%
                    </div>
                  )}
                </div>
                <div className={styles.tableCell}>
                  <div>{item.estImpressions}</div>
                  {item.salesPercentage > 0 && (
                    <div
                      className={styles.growthCell}
                      style={{ color: "var(--success-color)" }}
                    >
                      ↑ {item.salesPercentage}%
                    </div>
                  )}
                </div>
                <div className={styles.tableCell}>{item.cr}</div>
              </div>
            ))}

            <div className={styles.tableFooter}>
              <div className={styles.tableCell} style={{ width: "40px" }}></div>
              <div
                className={styles.tableCell}
                style={{ width: "200px", fontWeight: "bold" }}
              >
                Total
              </div>
              <div className={styles.tableCell}>₹2,93,132.12</div>
              <div className={styles.tableCell}>16%</div>
              <div className={styles.tableCell}>2931</div>
              <div className={styles.tableCell}>8.3</div>
              <div className={styles.tableCell}>61,985</div>
              <div className={styles.tableCell}>2,61,768</div>
              <div className={styles.tableCell}>1.9%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCityColor(index: number) {
  const colors = ["#5c6ac4", "#e05252", "#ffc107", "#777777"];
  return colors[index % colors.length];
}
