"use client";

import { useEffect, useRef } from "react";
import styles from "./SalesChart.module.css";

export default function SalesChart() {
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

    // Sample data
    const thisPeriodData = [
      1.5, 1.6, 1.8, 2.1, 2.3, 2.7, 2.5, 3.0, 3.2, 3.5, 3.7, 3.8, 4.0, 4.2, 4.5,
    ];
    const lastPeriodData = [
      1.3, 1.5, 1.7, 1.9, 2.0, 2.1, 2.3, 2.1, 2.3, 2.5, 2.7, 2.8, 2.9, 3.0, 3.2,
    ];

    const maxValue = Math.max(...thisPeriodData, ...lastPeriodData) * 1.1;
    const width = rect.width;
    const height = rect.height;

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    const gridStep = height / 3;
    for (let i = 1; i <= 3; i++) {
      const y = height - i * gridStep;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "10px Inter, sans-serif";
    ctx.textAlign = "center";

    // X-axis labels (days)
    for (let i = 9; i <= 15; i++) {
      const x = (i - 9) * (width / (thisPeriodData.length - 1));
      ctx.fillText(i.toString(), x, height - 5);
    }

    // Y-axis labels
    ctx.textAlign = "left";
    for (let i = 1; i <= 3; i++) {
      const y = height - i * gridStep;
      ctx.fillText((i * 1.5).toString(), 5, y - 5);
    }

    // Draw last period line
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2;
    ctx.beginPath();

    lastPeriodData.forEach((value, index) => {
      const x = index * (width / (lastPeriodData.length - 1));
      const y = height - (value / maxValue) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw this period line
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();

    thisPeriodData.forEach((value, index) => {
      const x = index * (width / (thisPeriodData.length - 1));
      const y = height - (value / maxValue) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Add legend
    const legendY = height - 20;
    const legendSpacing = 80;

    // This month legend
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(15, legendY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#374151";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("This Month", 25, legendY + 4);

    // Last month legend
    ctx.fillStyle = "#d1d5db";
    ctx.beginPath();
    ctx.arc(15 + legendSpacing, legendY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#374151";
    ctx.fillText("Last Month", 25 + legendSpacing, legendY + 4);
  }, []);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={canvasRef} className={styles.chart}></canvas>
    </div>
  );
}
