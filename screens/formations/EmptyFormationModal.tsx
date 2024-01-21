import { Box, Text } from "$shared/ui/primitives";
import { colors } from "$shared/ui/theme/colors";
import { AntDesign } from "@expo/vector-icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Pressable } from "react-native";

type EmptyFormationModalProps = {
  isOpen?: boolean;
};

export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

export const EmptyFormationModal = forwardRef<
  ModalRef,
  EmptyFormationModalProps
>(({ isOpen = true }, ref) => {
  const [modalVisible, setModalVisible] = useState<boolean>(isOpen);
  useImperativeHandle(ref, () => ({
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
  }));
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: BACKDROP_COLOR }}
      >
        <Box
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="70%"
        >
          <Box
            bg="GREY_SEND_DARK"
            p="global_15"
            gap="global_16"
            width="70%"
            borderRadius="global_8"
          >
            <Text variant="h3">Pas de resultats ?</Text>
            <Text>
              Il semble que l'Onisep ne soit actuellement pas disponible. Nous
              vous prions de bien vouloir nous excuser pour la gêne occasionnée.
            </Text>
          </Box>
        </Box>
        <Pressable onPress={() => setModalVisible(false)}>
          <Box
            alignItems="center"
            p="global_8"
            mt="global_30"
            bg="GREY_SEND_DARK"
            borderRadius="round"
          >
            <AntDesign name="closecircleo" size={34} color={colors.WHITE} />
          </Box>
        </Pressable>
      </Box>
    </Modal>
  );
});

EmptyFormationModal.displayName = "EmptyFormationModal";

const BACKDROP_COLOR = "rgba(0,0,0,0.40)";
