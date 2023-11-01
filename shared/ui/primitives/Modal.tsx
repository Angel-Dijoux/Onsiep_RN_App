import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { PropsWithChildren, forwardRef, type ReactNode } from "react";

import { ViewStyle } from "react-native";
import { type SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "./Box";

type ModalProps = {
  modalKey?: string;
  snapPoints?: (string | number)[] | SharedValue<(string | number)[]>;
  disableHorizontalPadding?: boolean;
  disableTopPadding?: boolean;
  isScrollable?: boolean;
  onDismiss?: () => void;
  onChange?: (index: number) => void;
  renderBackdrop?: (props: BottomSheetBackdropProps) => JSX.Element;
};

const ModalContainer = ({
  children,
  style,
  disableHorizontalPadding,
  disableTopPadding,
}: {
  children: ReactNode;
  style?: ViewStyle;
  disableHorizontalPadding: boolean;
  disableTopPadding: boolean;
}) => (
  <Box
    pt={disableTopPadding ? "zero" : "global_24"}
    px={disableHorizontalPadding ? "zero" : "global_20"}
    style={style}
  >
    {children}
  </Box>
);

const renderBackdropDefault = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop opacity={0} {...props} />
);

const DEFAULT_SNAP_POINTS = ["65%"];

const Modal = forwardRef<BottomSheetModal, PropsWithChildren<ModalProps>>(
  (
    {
      children,
      modalKey,
      snapPoints = DEFAULT_SNAP_POINTS,
      disableHorizontalPadding = false,
      disableTopPadding = false,
      isScrollable = true,
      onDismiss,
      onChange,
      renderBackdrop = renderBackdropDefault,
    },
    ref
  ) => {
    const { bottom: bottomInset } = useSafeAreaInsets();

    const modalContainer = (
      <ModalContainer
        disableHorizontalPadding={disableHorizontalPadding}
        disableTopPadding={disableTopPadding}
        style={{ marginBottom: isScrollable ? 0 : bottomInset }}
      >
        {children}
      </ModalContainer>
    );

    const modalContent = isScrollable ? (
      <BottomSheetScrollView>{modalContainer}</BottomSheetScrollView>
    ) : (
      modalContainer
    );

    return (
      <BottomSheetModal
        ref={ref}
        name={modalKey}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={onDismiss}
        onChange={onChange}
      >
        {modalContent}
      </BottomSheetModal>
    );
  }
);

Modal.displayName = "Modal";

export { Modal };
