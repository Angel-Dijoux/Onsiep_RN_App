import React, { ReactNode } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Screen } from "./navigation/Screen";
import { Box } from "./primitives";
import DisplayMessages from "../../src/components/ui/Notification/display_messages";

type ScreenWithImageProps = {
  children: ReactNode;
  title: string;
};

const ScreenWithImage = ({ children, title }: ScreenWithImageProps) => {
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
          marginBottom: SCREEN_HEIGHT / 3,
        }}
      ></ImageBackground>
      <Box
        width="100%"
        height={diff}
        position="absolute"
        backgroundColor="SECONDARY_40"
        borderTopLeftRadius="global_16"
        borderTopRightRadius="global_16"
      >
        <Screen title={title} goBack isScrollable={false} edges={["top"]}>
          <Box mt="global_24">
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </Box>
        </Screen>
      </Box>
    </SafeAreaView>
  );
};

export { ScreenWithImage };
