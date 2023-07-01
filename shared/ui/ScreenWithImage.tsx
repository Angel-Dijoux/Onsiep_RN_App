import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Screen } from "./navigation/Screen";
import { Box } from "./primitives";
import { borderRadii } from "./primitives/theme/borderRadii";
import { colors } from "./primitives/theme/colors";
import DisplayMessages from "../../src/components/ui/Notification/display_messages";

type ScreenWithImageProps = {
  children: ReactNode;
  title: string;
  canGoBack?: boolean;
};

const GRADIENT_START = {
  x: -1,
  y: -0.6,
};

const ScreenWithImage = ({
  children,
  title,
  canGoBack,
}: ScreenWithImageProps) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const diff = SCREEN_HEIGHT - SCREEN_HEIGHT / 2.2;
  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <DisplayMessages />
      <ImageBackground
        source={require("../../src/icons/onilogo.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "70%",
          position: "relative",
          marginBottom: SCREEN_HEIGHT / 3.5,
        }}
      />

      <LinearGradient
        colors={[
          colors.SECONDARY_BASE,
          colors.SECONDARY_DARK,
          colors.SECONDARY_50,
          colors.SECONDARY_40,
          colors.WHITE,
        ]}
        start={GRADIENT_START}
        style={{
          width: "100%",
          height: diff,
          position: "absolute",
          borderTopLeftRadius: borderRadii.global_16,
          borderTopRightRadius: borderRadii.global_16,
        }}
      >
        <Screen
          title={title}
          goBack={canGoBack}
          isScrollable={false}
          edges={["top"]}
        >
          <Box mt="global_24">
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </Box>
        </Screen>
      </LinearGradient>
    </SafeAreaView>
  );
};

export { ScreenWithImage };
