import { BorderRadii } from "../theme/borderRadii";
import { Colors } from "../theme/colors";

type Variant = keyof typeof buttonVariants;

const buttonVariants: Record<
  string,
  { backgroundColor: Colors; borderRadius: BorderRadii }
> = {
  primary: {
    backgroundColor: "PRIMARY_11",
    borderRadius: "global_8",
  },
  primaryDisabled: {
    backgroundColor: "PRIMARY_5",
    borderRadius: "global_8",
  },
};

const buttonTextStyle: Record<Variant, { color: Colors }> = {
  primary: {
    color: "BLACK",
  },
  primaryDisabled: {
    color: "WHITE",
  },
};

export type ButtonVariants = keyof typeof buttonVariants;

export { buttonVariants, buttonTextStyle };
