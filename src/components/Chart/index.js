import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Chart from "react-google-charts";
import {
  Colors,
  ChartWrapper,
  ChartContainer,
  FloatingLabels,
  FloatingLabel,
} from "../Styling";
import { Break } from "../Responsive";

const StyledChart = styled(Chart)`
  height: 260px;

  @media ${Break.sm} {
    height: 260px;
  }
`;

// Constantes para evitar recrear objetos en cada render
const CHART_CONFIG = {
  PIE_HOLE: 0.5,
  ANIMATION_DURATION: 1000,
  START_ANGLE: -Math.PI / 2, // -90 degrees
  CHART_AREA: { left: 0, top: 0, width: "100%", height: "100%" },
};

const CHART_COLORS = [Colors.yellow, Colors.blue, Colors.red, Colors.green];

export const Charts = ({ dataArray }) => {
  const [data, setData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  // Memoizar las opciones del chart para evitar recrearlas en cada render
  const chartOptions = useMemo(
    () => ({
      legend: { position: "none" },
      pieHole: CHART_CONFIG.PIE_HOLE,
      is3D: false,
      animation: {
        startup: true,
        easing: "linear",
        duration: CHART_CONFIG.ANIMATION_DURATION,
      },
      backgroundColor: "transparent",
      colors: CHART_COLORS,
      tooltip: { trigger: "none" },
      pieSliceText: "none",
      chartArea: CHART_CONFIG.CHART_AREA,
      width: "100%",
      enableInteractivity: false,
    }),
    []
  );

  // Función helper para procesar un item de datos
  const processDataItem = (item, index, totalValue, cumulativeAngle) => {
    const value = parseInt(item[1], 10);
    const originalLabel = item[0];

    // Calculate angle for this segment (center of the slice)
    const segmentAngle = (value / totalValue) * 2 * Math.PI;
    const centerAngle = cumulativeAngle + segmentAngle / 2;

    return {
      processedItem: [originalLabel, value],
      labelData: {
        label: `${originalLabel}: ${value} (${value}%)`,
        value,
        originalLabel,
        angle: centerAngle,
      },
      newCumulativeAngle: cumulativeAngle + segmentAngle,
    };
  };

  // Función principal de procesamiento de datos
  const processChartData = (inputArray) => {
    if (!inputArray || inputArray.length < 2) return { data: [], labels: [] };

    const dataArray = [...inputArray];
    const processedLabels = [];

    // Calculate total value
    const totalValue = dataArray.slice(1).reduce((sum, item) => {
      return item?.[1] ? sum + parseInt(item[1], 10) : sum;
    }, 0);

    if (totalValue === 0) return { data: dataArray, labels: [] };

    let cumulativeAngle = CHART_CONFIG.START_ANGLE;

    // Process each data point
    for (let i = 1; i < dataArray.length; i++) {
      if (dataArray[i]?.[1]) {
        const result = processDataItem(
          dataArray[i],
          i,
          totalValue,
          cumulativeAngle
        );

        dataArray[i] = result.processedItem;
        processedLabels.push(result.labelData);
        cumulativeAngle = result.newCumulativeAngle;
      }
    }

    return { data: dataArray, labels: processedLabels };
  };

  useEffect(() => {
    if (!dataArray) {
      setData([]);
      setProcessedData([]);
      return;
    }

    const { data: processedChartData, labels } = processChartData(dataArray);
    setData(processedChartData);
    setProcessedData(labels);
  }, [dataArray]);

  // Render chart only if we have data
  return (
    data.length &&
    processedData.length && (
      <ChartWrapper>
        <ChartContainer>
          <StyledChart
            chartType="PieChart"
            width="100%"
            data={data}
            options={chartOptions}
          />

          <FloatingLabels>
            {processedData.map((item, index) => (
              <FloatingLabel
                key={`${item.originalLabel}-${index}`}
                angle={item.angle}
              >
                {item.label}
              </FloatingLabel>
            ))}
          </FloatingLabels>
        </ChartContainer>
      </ChartWrapper>
    )
  );
};
