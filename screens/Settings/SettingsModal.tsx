import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject } from "react";
import { Pressable } from "react-native";

import { Box, Text } from "$shared/ui/primitives";
import { Modal } from "$shared/ui/primitives/Modal";

import { useDeleteAccount } from "./useDeleteAccount";
import { useLogout } from "./useLogout";

type SettingsModalProps = {
  settingsModalRef: RefObject<BottomSheetModalMethods>;
};

const ICON_SIZE = 24;

export function SettingsModal({
  settingsModalRef,
}: Readonly<SettingsModalProps>) {
  const { handleDeleteUser } = useDeleteAccount();
  const { handleLogout } = useLogout();

  return (
    <Modal ref={settingsModalRef} snapPoints={["20%"]} disableHorizontalPadding>
      <Box alignItems="flex-start" gap="global_8">
        <Pressable style={{ width: "100%" }} onPress={handleDeleteUser}>
          <Box
            flexDirection="row"
            alignItems="center"
            borderRadius="global_8"
            py="global_15"
            backgroundColor="GREY_SEND_DARK"
            mx="global_15"
          >
            <Text
              variant="regular"
              fontWeight="800"
              color="ERROR"
              px="global_20"
            >
              Supprimer mon compte
            </Text>
          </Box>
        </Pressable>
        <Pressable style={{ width: "100%" }} onPress={handleLogout}>
          <Box
            flexDirection="row"
            alignItems="center"
            borderRadius="global_8"
            py="global_15"
            backgroundColor="GREY_SEND_DARK"
            mx="global_15"
          >
            <Text
              variant="regular"
              fontWeight="800"
              color="ERROR"
              px="global_20"
            >
              Se deconnecter
            </Text>
          </Box>
        </Pressable>
      </Box>
    </Modal>
  );
}
