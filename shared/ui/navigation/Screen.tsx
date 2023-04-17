import React, { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Edge } from "react-native-safe-area-context";

import { Header } from "./Header";
import { SafeView } from "./SafeView";
import { Box } from "../primitives";

type ScreenProps = {
  edges?: Edge[];
  children: ReactNode;
  title?: string | null;
  goBack?: boolean;
  shouldSkipMargins?: boolean;
  colorScheme?: "light" | "dark";
  isScrollable?: boolean;
  onGoBack?: () => void;
};

const Screen = ({
  children,
  edges,
  title,
  goBack,
  shouldSkipMargins = false,
  colorScheme = "light",
  isScrollable = true,
  onGoBack,
}: ScreenProps) => {
  const Content = (
    <Box flex={1} px={shouldSkipMargins ? "zero" : "global_20"}>
      {children}
    </Box>
  );

  return (
    <SafeView edges={edges}>
      <Header
        title={title}
        colorScheme={colorScheme}
        goBack={goBack}
        onGoBack={onGoBack}
      />

      {isScrollable ? (
        <KeyboardAwareScrollView>{Content}</KeyboardAwareScrollView>
      ) : (
        <>{Content}</>
      )}
    </SafeView>
  );
};

export { Screen };
