"use client";

import styles from "./ProgressRing.module.css";

interface Segment {
  color: string;
  percent: number;
  startAngle: number;
  endAngle: number;
}

export default function ProgressRing() {
  const radius = 100;
  const center = { x: 100, y: 150 };

  // Define segments with their colors and percentages
  const segments: Segment[] = [
    { percent: 24, color: "#8D8D8D" }, // Others - gray (leftmost)
    { percent: 12, color: "#EFBF31" }, // West Bengal - yellow
    { percent: 37, color: "#E05252" }, // Mumbai - red
    { percent: 27, color: "#4E56C8" }, // New Delhi - blue (rightmost)
  ].map((segment, index, array) => {
    // Calculate the start and end angles for each segment
    const total = array.reduce((sum, s) => sum + s.percent, 0);
    const startPercent = array
      .slice(0, index)
      .reduce((sum, s) => sum + s.percent, 0);
    const startAngle = (startPercent / total) * Math.PI;
    const endAngle = ((startPercent + segment.percent) / total) * Math.PI;
    return { ...segment, startAngle, endAngle };
  });

  // Function to calculate point coordinates on the arc
  const getPointOnArc = (angle: number) => {
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    };
  };

  // Function to create SVG arc path
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = getPointOnArc(startAngle);
    const end = getPointOnArc(endAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 200"
      className={styles.progressRing}
    >
      {/* Background semi-circle */}
      {/* <path
        d="M 20,100 A 80,80 0 0,1 180,100"
        fill="none"
        stroke="#E6E7E9"
        strokeWidth="12"
        strokeLinecap="round"
      /> */}

      {/* Colored segments */}
      {segments.map((segment, index) => (
        <path
          key={index}
          d={createArcPath(segment.startAngle, segment.endAngle)}
          fill="none"
          stroke={segment.color}
          strokeWidth="16"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
