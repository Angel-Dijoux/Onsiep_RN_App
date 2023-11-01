import React, { useEffect, useRef } from "react";
import { LineChart } from "react-native-chart-kit";

import {
  FormationsRepartition,
  useGetFormationRepartition,
} from "./useGetFormationRepartition";
import { Loading } from "../../shared/ui/Loading";
import { Box } from "../../shared/ui/primitives";
import { colors } from "../../shared/ui/primitives/theme/colors";
import { deviceWidth } from "../../utils/deviceInfo";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DetailsFormationRepartitionModal } from "./DetailsFormationRepartitionModal";

const GRAPH_HEIGHT = 300;
const GRAPH_WIDTH = deviceWidth - 40;

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "5",
    fill: colors.PRIMARY_9,
  },
  decimalPlaces: 0,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: true,
};

const makeGraphData = (data: FormationsRepartition[]) => {
  const labels = data.map((formation) => formation.key.slice(0, 13));
  const values = data.map((formation) => formation.doc_count);

  return {
    labels,
    datasets: [
      {
        data: values,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
      },
    ],
  };
};

export function FormationsRepartionGraph({
  query = "ingenieur",
}: {
  query?: string;
}) {
  const detailsRepartitionModalRef = useRef<BottomSheetModal>(null);
  const { data, isLoading, refetch } = useGetFormationRepartition(query);

  useEffect(() => {
    refetch();
  }, [query]);

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <LineChart
        withVerticalLines={false}
        withHorizontalLines={false}
        transparent
        data={makeGraphData(data!.slice(0, 5))}
        width={GRAPH_WIDTH}
        height={GRAPH_HEIGHT}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={10}
        bezier
        // onDataPointClick={(data) => console.log(data)}
        style={{ marginLeft: -40 }}
      />
      <DetailsFormationRepartitionModal
        detailsRepartitionModalRef={detailsRepartitionModalRef}
      />
    </Box>
  );
}
