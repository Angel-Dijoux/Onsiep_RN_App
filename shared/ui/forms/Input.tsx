import React from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";

import { Text } from "../primitives";
import { fontFamily } from "../primitives/theme/fonts";
import { colors } from "../primitives/theme/colors";

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
          color="PRIMARY"
          pb="global_16"
        >
          {label}
        </Text>
      )}

      <TextInput
        {...rest}
        cursorColor={colors.PRIMARY_50}
        placeholderTextColor={colors.PRIMARY}
        style={[{ color: colors.PRIMARY }, style]}
      />
    </>
  );
}

export { Input };
