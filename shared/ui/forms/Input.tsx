import React from "react";
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native";
import { Text } from "../primitives";
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
          color="BLACK"
          opacity={0.5}
          pb="global_16"
        >
          {label}
        </Text>
      )}

      <TextInput
        {...rest}
        placeholderTextColor={PLACEHOLDER_COLOR}
        style={[style]}
      />
    </>
  );
}

const PLACEHOLDER_COLOR = "rgba(0, 0, 0, 0.3)";

export { Input };
