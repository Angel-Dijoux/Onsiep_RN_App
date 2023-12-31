import { createText } from "@shopify/restyle";
import React from "react";

import { Theme } from "../theme/theme";

type TextProps = React.ComponentProps<typeof PrimitiveText>;

const PrimitiveText = createText<Theme>();

const Text = ({ variant = "regular", ...rest }: TextProps) => (
  <PrimitiveText variant={variant} {...rest} />
);

export { Text };
