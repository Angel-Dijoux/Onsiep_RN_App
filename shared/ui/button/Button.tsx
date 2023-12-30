import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { PropsWithChildren } from "react";
import { Pressable } from "react-native";

import { ButtonVariants } from "./buttonVariants";
import { BoxProps } from "../primitives";
import { Theme } from "../theme/theme";

export type ButtonProps = {
  isDisabled?: boolean;
  variant?: ButtonVariants;
  onPress: () => void;
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

function BaseButton({
  isDisabled = false,
  variant = "primary",
  onPress,
  children,
}: PropsWithChildren<ButtonProps>) {
  const isButtonDisabled = isDisabled || getIsDisabledVariant(variant);

  return (
    <Pressable disabled={isButtonDisabled} onPress={onPress}>
      <PrimitiveButton variant={variant}>{children}</PrimitiveButton>
    </Pressable>
  );
}

export { BaseButton };
