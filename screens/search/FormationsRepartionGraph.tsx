import React from "react";

import { LineChart } from "react-native-chart-kit";

import { Loading } from "../../shared/ui/Loading";
import { Box, Text } from "../../shared/ui/primitives";
import { deviceWidth } from "../../utils/deviceInfo";
import {
  FormationsRepartition,
  useGetFormationRepartition,
} from "./useGetFormationRepartition";

const GRAPH_HEIGHT = 300;
const GRAPH_WIDTH = deviceWidth - 40;

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const makeGraphData = (data: FormationsRepartition[]) => {
  const labels = data.map((formation) => formation.key);
  const values = data.map((formation) => formation.doc_count);

  return {
    labels,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };
};

export function FormationsRepartionGraph({ query }: { query: string }) {
  const { data, isLoading } = useGetFormationRepartition(query);

  if (isLoading) return <Loading />;

  return (
    <Box>
      <LineChart
        data={makeGraphData(data!)}
        width={deviceWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </Box>
  );
}
