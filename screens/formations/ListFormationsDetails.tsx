import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React, { Suspense, useRef } from "react";

import { CardFormationDetailsSkeleton } from "$screens/home/CardFormationDetailsSkeleton";

import { FormationListItem } from "../../shared/formation/fomationv2.type";
import { Box, Text } from "../../shared/ui/primitives";
import { deviceWidth } from "../../utils/deviceInfo";
import { CardFormationDetails } from "../home/CardFormationDetails";
import { FormationsRepartionGraph } from "../search/FormationsRepartionGraph";
import { EmptyFormationModal, ModalRef } from "./EmptyFormationModal";

// TODO: use api for this, idea: get 'details' from flask directly.
export const renderItemDetailCardFormations: ListRenderItem<
  FormationListItem
> = ({ item }) => (
  <Suspense fallback={<CardFormationDetailsSkeleton />}>
    <CardFormationDetails item={item} />
  </Suspense>
);

const ListEmptyComponent = () => {
  const modalRef = useRef<ModalRef>(null);
  return (
    <Box flex={1} justifyContent="center" alignItems="center" height="100%">
      <Text>Il n'y a pas de données...</Text>
      <EmptyFormationModal ref={modalRef} />
    </Box>
  );
};

export const ListFormationsDetails = ({
  data,
  handleEndReached,
  query,
}: {
  data?: FormationListItem[];
  handleEndReached: () => void;
  query?: string;
}) => (
  <FlashList
    data={data}
    keyExtractor={(_, index: number) => index.toString() + _.formation.url}
    ListHeaderComponent={
      query && data?.length !== 0 ? FormationsRepartionGraph({ query }) : null
    }
    renderItem={renderItemDetailCardFormations}
    estimatedItemSize={ESTIMATED_ITEM_HEIGHT}
    ListEmptyComponent={ListEmptyComponent}
    estimatedFirstItemOffset={10}
    estimatedListSize={{ height: ESTIMATED_ITEM_HEIGHT, width: deviceWidth }}
    decelerationRate="fast"
    showsVerticalScrollIndicator={false}
    onEndReached={handleEndReached}
    onEndReachedThreshold={0.5}
    drawDistance={ESTIMATED_ITEM_HEIGHT * 1.5}
  />
);

const ESTIMATED_ITEM_HEIGHT = 314;
