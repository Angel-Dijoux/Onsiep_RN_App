import React from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import { BaseToast, BaseToastProps } from "react-native-toast-message";

import { Box, Text } from "../../../../shared/ui/primitives";
import { colors } from "../../../../shared/ui/theme/colors";
import { fontFamily, textVariants } from "../../../../shared/ui/theme/fonts";
import { spacing } from "../../../../shared/ui/theme/spacing";

function createStyledToastComponent(
  BaseComponent: React.ComponentType<BaseToastProps>,
  style: ViewStyle
) {
  const ToastComponent = (props: BaseToastProps) => (
    <BaseComponent
      {...props}
      contentContainerStyle={styles.container}
      style={[styles.wrapper, style]}
      text1Style={styles.text1}
      text2NumberOfLines={2}
      text2Style={styles.text2}
    />
  );

  ToastComponent.displayName = `StyledToast(${
    BaseComponent.displayName ?? BaseComponent.name ?? "Component"
  })`;

  return ToastComponent;
}

function BasicToast({ props }: { props: { text: string } }) {
  return (
    <Box width="90%" bg="GREY_SEND_DARK" borderRadius="global_8" p="global_16">
      <Text variant="small" fontFamily={fontFamily.manropeRegular}>
        {props.text}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.global_16,
  },
  wrapper: {
    height: "auto",
    width: "90%",
    paddingVertical: spacing.global_16,
    backgroundColor: colors.PRIMARY_3,
  },
  text1: {
    ...textVariants.large,
    fontFamily: fontFamily.satoshiBold,
    color: colors.PRIMARY_12,
  },
  text2: {
    ...textVariants.small,
    fontFamily: fontFamily.manropeRegular,
    color: colors.PRIMARY_12,
  },
  success: {
    borderLeftColor: colors.SUCCESS,
  },
  error: {
    borderLeftColor: colors.ERROR,
  },
  info: {
    borderLeftColor: colors.INFO,
  },
});

export const toasterConfig = {
  success: createStyledToastComponent(BaseToast, styles.success),
  error: createStyledToastComponent(BaseToast, styles.error),
  info: createStyledToastComponent(BaseToast, styles.info),
  basicToast: BasicToast,
};
