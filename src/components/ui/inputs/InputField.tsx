import React, { type ReactNode } from "react";
import { StyleSheet, TextInput, type KeyboardTypeOptions } from "react-native";

import { Box, Text } from "../../../../shared/ui/primitives";
import { colors } from "../../../../shared/ui/primitives/theme/colors";
import { textVariants } from "../../../../shared/ui/primitives/theme/fonts";
import { spacing } from "../../../../shared/ui/primitives/theme/spacing";

interface InputFieldProps {
  type?: KeyboardTypeOptions;
  children: ReactNode;
  title: string;
  value: string;
  editable?: boolean;
  password?: boolean;
  onSubmitEditing?: () => void;
  onChange?: (text: string) => void;
}

const InputField = ({
  type,
  children,
  title,
  value,
  editable,
  password,
  onSubmitEditing,
  onChange,
}: InputFieldProps) => {
  return (
    <Box mt="global_10">
      <Text
        fontFamily="satoshi"
        fontSize={15}
        fontWeight="700"
        color="PRIMARY_2"
        ml="global_10"
        mb="global_5"
        mt="global_5"
      >
        {title}
      </Text>
      <Box
        flexDirection="row"
        alignItems="center"
        padding="global_15"
        bg="PRIMARY_1"
        borderRadius="global_16"
      >
        {children}
        <TextInput
          style={styles.input}
          keyboardType={type}
          value={value}
          editable={editable}
          secureTextEntry={password}
          placeholder={title}
          placeholderTextColor={colors.PRIMARY_12}
          onChangeText={onChange}
          onSubmitEditing={onSubmitEditing}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    ...textVariants.regular,
    color: colors.PRIMARY_12,
    marginLeft: spacing.global_15,
  },
});

export { InputField };
