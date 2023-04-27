import { cleanNotifications, notifications } from "@mantine/notifications";
import { Check, ExclamationMark } from "tabler-icons-react";

export class notification {
  public static success(message: string) {
    return notifications.show({
      message: message,
      color: "green",
      icon: <Check className="w-4 h-4" />,
    });
  }

  public static error(message?: string) {
    cleanNotifications();
    return notifications.show({
      message: message || "An error occured",
      color: "red",
      icon: <ExclamationMark className="w-4 h-4" />,
    });
  }

  public static loading(message: string) {
    return notifications.show({
      id: "loading-notification",
      message: message,
      color: "gray",
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
  }

  public static done(message: string) {
    return notifications.update({
      id: "loading-notification",
      message: message,
      color: "gray",
      icon: <Check className="w-4 h-4" />,
      autoClose: 2000,
    });
  }
}
