import React, { useCallback } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useImperativeHandle } from "react/cjs/react.development";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 100;

type ModalFilterProps = {
  children?: React.ReactNode;
};
export type ModalFilterRefProps = {
  scroolTo: (destination: number) => void;
  isActive: () => boolean;
};

const ModalFilter = React.forwardRef<ModalFilterRefProps, ModalFilterProps>(
  ({ children }, ref) => {
    const translationY = useSharedValue(30);
    const active = useSharedValue(false);

    const scroolTo = useCallback((destination: number) => {
      "worklet";

      active.value = destination !== 30;

      translationY.value = withSpring(destination, { damping: 15 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scroolTo, isActive }), [
      scroolTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 30 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translationY.value };
      })
      .onUpdate((e) => {
        translationY.value = e.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translationY.value > -SCREEN_HEIGHT / 3) {
          scroolTo(30);
        } else if (translationY.value < -SCREEN_HEIGHT / 1.5) {
          scroolTo(MAX_TRANSLATE_Y);
        }
      });

    const rModalFilterStyle = useAnimatedStyle(() => {
      // reanimated modal filter style
      const borderRadius = interpolate(
        translationY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translationY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottommodal, rModalFilterStyle]}>
          <Animated.View style={styles.lines} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default ModalFilter;

const styles = StyleSheet.create({
  bottommodal: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    elevation: 500,
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "700",
  },
  lines: {
    width: 75,
    height: 3,
    backgroundColor: "black",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});
