import {
  showNotification,
  updateNotification,
  cleanNotifications,
} from "@mantine/notifications";
import { Check, ExclamationMark } from "tabler-icons-react";

const notificationSuccess = (message: string) => {
  showNotification({
    message: message,
    color: "gray",
    icon: <Check />,
  });
};

const notificationError = (message: string) => {
  showNotification({
    message: message,
    color: "red",
    icon: <ExclamationMark />,
  });
};

export class notification {
  public static success(message: string) {
    return showNotification({
      message: message,
      color: "gray",
      icon: <Check />,
    });
  }

  public static error(message?: string) {
    cleanNotifications();
    return showNotification({
      message: message || "An error occured",
      color: "red",
      icon: <ExclamationMark />,
    });
  }

  public static loading(message: string) {
    return showNotification({
      id: "loading-notification",
      message: message,
      color: "gray",
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
  }

  public static done(message: string) {
    return updateNotification({
      id: "loading-notification",
      message: message,
      color: "gray",
      icon: <Check />,
      autoClose: 2000,
    });
  }
}

export { notificationError, notificationSuccess };
