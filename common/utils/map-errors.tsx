import { FormErrors } from "@mantine/form";
import { HttpExceptionClient } from "./fetch-methods";
import { notificationError } from "./notification";

export function mapErrors(exception: HttpExceptionClient): FormErrors {
  if (!Array.isArray(exception.errors)) {
    notificationError(exception.message);
    return {};
  }
  const error: FormErrors = {};
  exception.errors.map((err) => {
    error[err.property] = err.message;
  });
  return error;
}
