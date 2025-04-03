"use client";

import { useEffect, useRef } from "react";
import styles from "./SalesChart.module.css";

interface SalesChartProps {
  type?: "sales" | "quantity";
}

export default function SalesChart({ type = "sales" }: SalesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas responsive
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Sample data - this will create different patterns for sales vs quantity
    const thisPeriodData =
      type === "sales"
        ? [1.5, 2.5, 3.2, 4.5, 2.8, 3.5, 5.8]
        : [2.0, 2.5, 3.5, 3.2, 3.8, 2.5, 3.5];

    const lastPeriodData =
      type === "sales"
        ? [1.8, 2.0, 2.5, 3.8, 3.5, 2.5, 3.0]
        : [2.2, 2.0, 2.2, 3.2, 3.5, 3.8, 3.2];

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 10, right: 10, bottom: 30, left: 30 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Draw grid lines and labels
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Y-axis grid lines and labels
    const ySteps = 4;
    const yMax = 6.0;
    const yMin = 1.5;
    const yStep = (yMax - yMin) / ySteps;

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= ySteps; i++) {
      const y = padding.top + (chartHeight * (ySteps - i)) / ySteps;
      const value = yMin + i * yStep;

      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Label
      ctx.fillText(value.toFixed(1), padding.left - 5, y + 4);
    }

    // X-axis labels
    ctx.textAlign = "center";
    const xLabels = ["09", "10", "11", "12", "13", "14", "15"];
    const xStep = chartWidth / (xLabels.length - 1);

    xLabels.forEach((label, i) => {
      const x = padding.left + i * xStep;
      ctx.fillText(label, x, height - padding.bottom + 15);
    });

    // Function to convert data point to coordinates
    const toCoords = (value: number, index: number, data: number[]) => ({
      x: padding.left + (index * chartWidth) / (data.length - 1),
      y:
        padding.top +
        chartHeight -
        ((value - yMin) / (yMax - yMin)) * chartHeight,
    });

    // Color settings based on chart type
    const primaryColor = type === "sales" ? "#22c55e" : "#3b82f6";
    const secondaryColor = "#fb923c";
    const fillColor =
      type === "sales" ? "rgba(34, 197, 94, 0.1)" : "rgba(59, 130, 246, 0.1)";

    // Draw last period line (dotted orange)
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    lastPeriodData.forEach((value, i) => {
      const { x, y } = toCoords(value, i, lastPeriodData);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw this period line with background fill
    ctx.setLineDash([]);

    // Fill area under the line
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    thisPeriodData.forEach((value, i) => {
      const { x, y } = toCoords(value, i, thisPeriodData);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Draw the line
    ctx.beginPath();
    thisPeriodData.forEach((value, i) => {
      const { x, y } = toCoords(value, i, thisPeriodData);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add legend
    const legendY = height - 10;
    const legendSpacing = 100;

    // This month legend
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.arc(padding.left, legendY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#374151";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("This Month", padding.left + 10, legendY + 4);

    // Last month legend
    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    ctx.arc(padding.left + legendSpacing, legendY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#374151";
    ctx.fillText("Last Month", padding.left + legendSpacing + 10, legendY + 4);
  }, [type]);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={canvasRef} className={styles.chart}></canvas>
    </div>
  );
}
