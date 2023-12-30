import React, { type ReactNode } from "react";
import { StyleSheet, TextInput, type KeyboardTypeOptions } from "react-native";

import { Box, Text } from "../../../../shared/ui/primitives";
import { colors } from "../../../../shared/ui/theme/colors";
import { textVariants } from "../../../../shared/ui/theme/fonts";
import { spacing } from "../../../../shared/ui/theme/spacing";

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
        variant="large"
        fontWeight="800"
        color="PRIMARY_2"
        ml="global_5"
        my="global_5"
        p="global_2"
      >
        {title}
      </Text>
      <Box
        flexDirection="row"
        alignItems="center"
        padding="global_15"
        bg="BLACK"
        borderRadius="global_8"
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
