import React from "react";

import { Box } from "../../shared/ui/primitives";
import { NoResult } from "../../src/components/ui/no_result";

const NoCurrentUser = () => {
  return (
    <Box alignItems="center" pt="global_32">
      <NoResult text="Tu n'a pas encore de compte, crée en un !" />
    </Box>
  );
};

export { NoCurrentUser };
