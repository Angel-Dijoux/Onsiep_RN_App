import React from "react";
import { StyleSheet } from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

type SafeViewProps = NativeSafeAreaViewProps;

const SafeView = ({ children, edges }: SafeViewProps) => (
  <SafeAreaView edges={edges} style={styles.wrapper}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
});

export { SafeView };
