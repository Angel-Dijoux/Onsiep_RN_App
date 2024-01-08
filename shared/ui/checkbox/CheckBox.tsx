import BouncyCheckbox from "react-native-bouncy-checkbox";

import { colors } from "../theme/colors";
import { makeAppStyles } from "../theme/theme";

type CheckBoxProps = {
  text: React.ReactNode;
  onPress: (isChecked: boolean) => void;
};

export function CheckBox({ text, onPress }: Readonly<CheckBoxProps>) {
  const styles = useStyles();
  return (
    <BouncyCheckbox
      size={CHECKBOX_SIZE}
      useNativeDriver
      fillColor={colors.TRANSPARENT_10}
      textComponent={text}
      iconStyle={styles.icon}
      innerIconStyle={styles.icon}
      onPress={onPress}
    />
  );
}

const useStyles = makeAppStyles(({ colors }) => ({
  icon: {
    borderColor: colors.PRIMARY_3,
    borderWidth: 2,
  },
  innerIcon: {
    borderWidth: 2,
    borderRadius: 0,
  },
}));
const CHECKBOX_SIZE = 30;
