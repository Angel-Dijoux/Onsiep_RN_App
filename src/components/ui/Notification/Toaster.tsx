import RNToast, { ToastShowParams } from "react-native-toast-message";

type ToasterType = "success" | "error" | "info" | "basicToast";

class CustomToaster {
  show(
    showParams: Omit<ToastShowParams, "type"> & {
      type?: ToasterType;
    }
  ) {
    RNToast.show({
      type: "basicToast",
      visibilityTime: 4000,
      topOffset: 30,
      ...showParams,
    });
  }

  hide() {
    RNToast.hide();
  }
}

const Toaster = new CustomToaster();

export { Toaster };
