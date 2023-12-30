import { Colors } from "../theme/colors";

type Variant = keyof typeof buttonVariants;

const buttonVariants = {
  primary: {
    backgroundColor: "WHITE",
    borderRadius: "global_5",
  },
  primaryDisabled: {
    backgroundColor: "GREY_SAND",
    borderRadius: "global_5",
  },
};

const buttonTextStyle: Record<Variant, { color: Colors }> = {
  primary: {
    color: "WHITE",
  },
  primaryDisabled: {
    color: "GREY_SAND",
  },
};

export type ButtonVariants = keyof typeof buttonVariants;

export { buttonVariants, buttonTextStyle };
