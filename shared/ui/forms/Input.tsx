import React from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

import { Text } from "../primitives";
import { colors } from "../primitives/theme/colors";
import { fontFamily } from "../primitives/theme/fonts";

type InputProps = TextInputProps & {
  label?: string;
  style?: StyleProp<TextStyle>;
};

function Input({ label, style = {}, ...rest }: InputProps) {
  return (
    <>
      {label?.length && (
        <Text
          variant="small"
          fontFamily={fontFamily.satoshi}
          color="PRIMARY_12"
          pb="global_16"
        >
          {label}
        </Text>
      )}

      <TextInput
        {...rest}
        cursorColor={colors.PRIMARY_9}
        placeholderTextColor={colors.PRIMARY_12}
        style={[{ color: colors.PRIMARY_12 }, style]}
      />
    </>
  );
}

export { Input };
