import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet } from "react-native";

import { type FormationTabStackNavigationParamsList } from "../../navigation/formations/FormationTabStackNavigation.types";
import { Input } from "../../shared/ui/forms/Input";
import { Box } from "../../shared/ui/primitives";
import { borderRadii } from "../../shared/ui/primitives/theme/borderRadii";
import { colors } from "../../shared/ui/primitives/theme/colors";
import { spacing } from "../../shared/ui/primitives/theme/spacing";

export const HeaderHomeScreen = ({ prevQuery }: { prevQuery?: string }) => {
  const [query, setQuery] = useState<string>(prevQuery ?? "");

  const navigation =
    useNavigation<
      StackNavigationProp<FormationTabStackNavigationParamsList, "HomeScreen">
    >();

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

  const handleInputChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  useEffect(() => {
    toggleCrossIcon(query.length > 0);
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
      <Pressable onPress={clearSearchBar}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/03/05/21/55/emoticon-2120024_960_720.png",
          }}
          style={styles.profilePicture}
          borderRadius={borderRadii.round}
        />
      </Pressable>

      <Box
        borderWidth={1.5}
        borderColor={query.length > 0 ? "PRIMARY_6" : "TRANSPARENT"}
        style={[styles.inputContainer]}
      >
        <Input
          placeholder="Rechercher un formation..."
          value={query}
          onChangeText={(text: string) => handleInputChange(text)}
          onSubmitEditing={handleSearchQuery}
        />
        {query.length > 0 ? (
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
    </Box>
  );
};
const PROFILE_PICTURE_SIZE = 38;

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
  profilePicture: {
    height: PROFILE_PICTURE_SIZE,
    width: PROFILE_PICTURE_SIZE,
    borderColor: colors.PRIMARY_8,
    borderWidth: 1,
  },
  clearSearch: {
    padding: spacing.global_2,
    backgroundColor: colors.PRIMARY_6,
    borderRadius: borderRadii.round,
  },
});
