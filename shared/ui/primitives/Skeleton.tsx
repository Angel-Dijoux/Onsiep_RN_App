import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { Box, BoxProps } from "./Box";

type SkeletonProps = {
  skeletonWidth: number;
  colors: string[];
} & BoxProps;

export function Skeleton({
  skeletonWidth,
  colors,
  ...props
}: Readonly<SkeletonProps>) {
  const translateX = useRef(new Animated.Value(-skeletonWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: skeletonWidth,
        useNativeDriver: true,
        duration: 1200,
      })
    ).start();
  }, [skeletonWidth, translateX]);

  return (
    <Box overflow="hidden" width={skeletonWidth} {...props}>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={colors}
          start={{ x: 1, y: 1.1 }}
        />
      </Animated.View>
    </Box>
  );
}
