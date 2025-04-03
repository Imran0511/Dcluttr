"use client";

import styles from "./ProgressRing.module.css";

export default function ProgressRing() {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const colorSegments = [
    { percent: 35, color: "#4E56C8" }, // New Delhi - blue
    { percent: 23, color: "#E05252" }, // Mumbai - red
    { percent: 21, color: "#EFBF31" }, // West Bengal - yellow
    { percent: 9, color: "#8D8D8D" }, // Others - gray
  ];

  // Calculate stroke-dasharray for each segment
  let startPercentage = 0;
  const segments = colorSegments.map((segment) => {
    const segmentLength = (segment.percent / 100) * circumference;
    const gap = 2; // Small gap between segments
    const dashArray = `${segmentLength - gap} ${
      circumference - segmentLength + gap
    }`;
    const dashOffset = circumference - (startPercentage / 100) * circumference;
    startPercentage += segment.percent;

    return { dashArray, dashOffset, color: segment.color };
  });

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      className={styles.progressRing}
    >
      {/* Background circle */}
      <circle
        cx="70"
        cy="70"
        r="65"
        fill="none"
        stroke="#E6E7E9"
        strokeWidth="12"
      />

      {/* Colored segments */}
      {segments.map((segment, index) => (
        <circle
          key={index}
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={segment.color}
          strokeWidth="16"
          strokeDasharray={segment.dashArray}
          strokeDashoffset={segment.dashOffset}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
