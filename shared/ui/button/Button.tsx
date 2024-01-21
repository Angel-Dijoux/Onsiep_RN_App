import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Pressable } from "react-native";

import { Box } from "$shared/ui/primitives";

import { ButtonVariants, buttonTextStyle } from "./buttonVariants";
import { BoxProps, Text } from "../primitives";
import { Spacing } from "../theme/spacing";
import { Theme } from "../theme/theme";
import { Loading } from "../Loading";

export type ButtonProps = {
  isDisabled?: boolean;
  variant?: ButtonVariants;
  size?: "regular";
  isLoading?: boolean;
  onPress: () => void;
  children: string;
};

const ButtonVariant = createVariant({
  themeKey: "buttonVariants",
});

const PrimitiveButton = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & BoxProps,
  Theme
>([ButtonVariant]);

const getIsDisabledVariant = (variant: ButtonVariants) =>
  variant.toString().toLowerCase().includes("disabled");

function Button({
  isDisabled = false,
  variant = "primary",
  size = "regular",
  isLoading,
  onPress,
  children,
}: Readonly<ButtonProps>) {
  const isButtonDisabled = isDisabled || getIsDisabledVariant(variant);

  const getButtonSize = (): {
    paddingBottom?: Spacing;
    paddingHorizontal: Spacing;
    paddingVertical?: Spacing;
  } => {
    switch (size) {
      case "regular":
      default:
        return {
          paddingHorizontal: "global_16",
          paddingVertical: "global_16",
        };
    }
  };

  return (
    <Pressable disabled={isButtonDisabled} onPress={onPress}>
      <PrimitiveButton variant={variant}>
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          {...getButtonSize()}
        >
          <Text
            {...buttonTextStyle[variant]}
            textAlign="center"
            fontWeight="700"
          >
            {isLoading ? <Loading /> : children}
          </Text>
        </Box>
      </PrimitiveButton>
    </Pressable>
  );
}

export { Button };
