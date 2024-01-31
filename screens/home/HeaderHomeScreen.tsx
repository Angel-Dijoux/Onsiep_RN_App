import { Entypo } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import { SettingsModal } from "$screens/Settings/SettingsModal";

import { type FormationTabStackNavigationParamsList } from "../../navigation/formations/FormationTabStackNavigation.types";
import { Input } from "../../shared/ui/forms/Input";
import { Box } from "../../shared/ui/primitives";
import { borderRadii } from "../../shared/ui/theme/borderRadii";
import { colors } from "../../shared/ui/theme/colors";
import { spacing } from "../../shared/ui/theme/spacing";
import { useCurrentUser } from "../../src/hooks/user/useCurrentUser";
import { ProfilePicture } from "./ProfilePicture";

export const HeaderHomeScreen = ({ prevQuery }: { prevQuery?: string }) => {
  const [query, setQuery] = useState<string>(prevQuery ?? "");
  const settingsModalRef = useRef<BottomSheetModal>(null);
  const { accessToken } = useCurrentUser();

  const navigation =
    useNavigation<
      StackNavigationProp<FormationTabStackNavigationParamsList, "HomeScreen">
    >();

  const handleOpenModal = () =>
    accessToken && settingsModalRef.current?.present();

  const handleSearchQuery = () => {
    navigation.navigate("SearchScreen", { query });
    setQuery("");
  };

  const opacity = useRef(new Animated.Value(0)).current;

  const toggleCrossIcon = (isVisible: boolean) => {
    Animated.timing(opacity, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const shouldShowClearSearch = query.length > 0;

  const handleInputChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  useEffect(() => {
    toggleCrossIcon(shouldShowClearSearch);
  }, [query]);

  const clearSearchBar = (): void => {
    navigation.navigate("HomeScreen");
    setQuery("");
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py="global_15"
    >
      <ProfilePicture
        onClearSearch={clearSearchBar}
        onOpenModal={handleOpenModal}
      />
      <Box
        borderWidth={1.5}
        borderColor={shouldShowClearSearch ? "PRIMARY_6" : "TRANSPARENT"}
        style={[styles.inputContainer]}
      >
        <Input
          placeholder="Rechercher un formation..."
          value={query}
          onChangeText={(text: string) => handleInputChange(text)}
          onSubmitEditing={handleSearchQuery}
          style={{ width: shouldShowClearSearch ? "85%" : "100%" }}
        />
        {shouldShowClearSearch ? (
          <Animated.View
            style={{
              opacity: opacity,
            }}
          >
            <Pressable onPress={clearSearchBar} style={styles.clearSearch}>
              <Entypo name="cross" size={22} color={colors.PRIMARY_12} />
            </Pressable>
          </Animated.View>
        ) : null}
      </Box>
      <SettingsModal settingsModalRef={settingsModalRef} />
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 41,
    borderRadius: borderRadii.global_8,
    backgroundColor: colors.PRIMARY_3,
    paddingHorizontal: spacing.global_15,
    alignItems: "center",
    width: "85%",
  },
  clearSearch: {
    padding: spacing.global_2,
    backgroundColor: colors.PRIMARY_6,
    borderRadius: borderRadii.round,
  },
});
