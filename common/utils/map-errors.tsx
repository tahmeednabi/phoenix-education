import { FormErrors } from "@mantine/form";
import { HttpExceptionClient } from "./fetch-methods";
import { notification } from "@common/utils/notification";

export function mapErrors(exception: HttpExceptionClient): FormErrors {
  if (!Array.isArray(exception.errors)) {
    notification.error(exception.message);
    return {};
  }
  const error: FormErrors = {};
  exception.errors.map((err) => {
    error[err.property] = err.message;
  });
  return error;
}
