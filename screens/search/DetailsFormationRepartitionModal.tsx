import { type BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { type RefObject } from "react";

import { Box, Text } from "$ui/primitives";
import { Modal } from "$ui/primitives/Modal";
import { capitalizeFirstLetter } from "$utils/typoFormat";

import { type FormationsRepartition } from "./useGetFormationRepartition";

type DetailsRepartitionModalProsp = {
  detailsRepartitionModalRef: RefObject<BottomSheetModalMethods>;
  selectedFormation?: FormationsRepartition;
  formationRepartion?: FormationsRepartition[];
};

const RenderItem: ListRenderItem<FormationsRepartition> = ({ item }) => (
  <Box my="global_10">
    <Text variant="large">
      Il y a{" "}
      <Text variant="large" fontWeight="800" color="PRIMARY_9">
        {item.doc_count}
      </Text>{" "}
      formations dispo en {item.key} !
    </Text>
  </Box>
);

export function DetailsFormationRepartitionModal({
  detailsRepartitionModalRef,
  selectedFormation,
  formationRepartion,
}: Readonly<DetailsRepartitionModalProsp>) {
  return (
    <Modal ref={detailsRepartitionModalRef} isScrollable>
      <Text variant="h3">{capitalizeFirstLetter(selectedFormation?.key)}</Text>
      <Text variant="regular" mt="global_5">
        Wow, il y a carrément{" "}
        <Text variant="large" fontWeight="800" color="PRIMARY_9">
          {selectedFormation?.doc_count}
        </Text>{" "}
        formations disponibles 🚀
      </Text>
      <Box mt="global_10">
        <Text variant="h3" py="global_5">
          Attends, il y a plus à explorer 👇
        </Text>
        <FlashList
          data={formationRepartion}
          renderItem={RenderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={ESTIMED_ITEM_SIZE}
          keyExtractor={(_, index: number) => index.toString() + _.key}
        />
      </Box>
    </Modal>
  );
}

const ESTIMED_ITEM_SIZE = 371;
