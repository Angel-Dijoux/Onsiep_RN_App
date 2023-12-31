import React from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

import { Text } from "../primitives";
import { colors } from "../theme/colors";
import { fontFamily } from "../theme/fonts";
import { makeAppStyles } from "../theme/theme";

type InputProps = TextInputProps & {
  label?: string;
  style?: StyleProp<TextStyle>;
};

function Input({ label, style = {}, ...rest }: InputProps) {
  const styles = useStyles();

  return (
    <>
      {label?.length && (
        <Text
          variant="regular"
          fontFamily={fontFamily.satoshiRegular}
          color="PRIMARY_12"
          pb="global_10"
        >
          {label}
        </Text>
      )}

      <TextInput
        {...rest}
        cursorColor={colors.PRIMARY_9}
        placeholderTextColor={TRANSPARENT_PLACEHOLDER}
        style={[styles.input, style]}
      />
    </>
  );
}

const useStyles = makeAppStyles(({ colors, textVariants }) => ({
  input: {
    fontSize: textVariants.large.fontSize,
    color: colors.WHITE,
  },
}));

const TRANSPARENT_PLACEHOLDER = "rgba(246, 238, 180, 0.35)";

export { Input };
