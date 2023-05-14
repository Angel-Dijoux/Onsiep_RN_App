import React, { type ReactNode } from "react";
import { StyleSheet, TextInput, type KeyboardTypeOptions } from "react-native";

import { Box, Text } from "../../../../shared/ui/primitives";
import { colors } from "../../../../shared/ui/primitives/theme/colors";
import { textVariants } from "../../../../shared/ui/primitives/theme/fonts";

interface InputFieldProps {
  type?: KeyboardTypeOptions;
  children: ReactNode;
  title: string;
  value: string;
  editable?: boolean;
  password?: boolean;
  onSubmitEditing?: () => void;
}

const InputField = ({
  type,
  children,
  title,
  value,
  editable,
  password,
  onSubmitEditing,
}: InputFieldProps) => {
  return (
    <Box>
      <Text fontSize={15} ml="global_10">
        {title}
      </Text>
      <Box
        flexDirection="row"
        alignItems="center"
        padding="global_15"
        bg="SECONDARY_DARK"
        borderRadius="global_16"
        mt="global_5"
        mb="global_5"
      >
        {children}
        <TextInput
          style={styles.input}
          keyboardType={type}
          value={value}
          editable={editable}
          secureTextEntry={password}
          placeholder={title}
          placeholderTextColor={colors.GREY_DARK}
          onSubmitEditing={onSubmitEditing}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    ...textVariants.regular,
    color: colors.WHITE,
  },
});

export { InputField };
