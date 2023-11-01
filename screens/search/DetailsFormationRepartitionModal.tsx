import { Box, Text } from "$ui/primitives";
import { Modal } from "$ui/primitives/Modal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject } from "react";

type DetailsRepartitionModalProsp = {
  detailsRepartitionModalRef: RefObject<BottomSheetModalMethods>;
};

export function DetailsFormationRepartitionModal({
  detailsRepartitionModalRef,
}: DetailsRepartitionModalProsp) {
  return (
    <Modal ref={detailsRepartitionModalRef}>
      <Box>
        <Text>Hello From modal</Text>
      </Box>
    </Modal>
  );
}
