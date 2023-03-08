import { notificationSuccess } from "@common/utils/notification";
import { FormErrors, useForm, UseFormReturnType } from "@mantine/form";
import { LooseKeys, UseFormInput } from "@mantine/form/lib/types";
import { useState } from "react";
import { AnySchema, ValidationError } from "yup";
import { FetchResponse } from "./fetch-methods";
import { mapErrors } from "./map-errors";

export interface UseAsyncFormInput<T> extends UseFormInput<T> {
  initialValues: { [key in keyof T]: any };
  initialErrors?: FormErrors;
  schema?: AnySchema<any, Partial<T>>;
}

export type SendFormFunction<R extends FetchResponse<any>, T> = (
  data: T
) => Promise<R>;

export interface UseAsyncFormReturnType<T> extends UseFormReturnType<T> {
  /**
   * Loading state for when form is validating or sending data to a
   * request service
   */
  loading: boolean;
  /**
   * Returns true if error, false if no error
   */
  validateAsync: () => Promise<boolean> | undefined;
  validateFieldAsync: <K extends LooseKeys<T>>(
    field: Extract<K, string>
  ) => Promise<boolean> | undefined;
  validateFieldsAsync: <K extends LooseKeys<T>>(
    fields: Extract<K, string>[]
  ) => Promise<boolean>;
  initialValues: T;

  setFieldValue: <L extends T, F extends LooseKeys<L>>(
    path: F,
    value: F extends keyof L ? L[F] : unknown
  ) => void;
  resetInitial: () => void;
  resetDirty: <L extends T>(values?: L) => void;
  /**
   * Takes an async function and returns the response with loading state
   * @param func
   */
  sendForm: <R extends FetchResponse<any>>(
    func: SendFormFunction<R, T>,
    opts?: { message?: string; resetInitial?: boolean }
  ) => Promise<R>;
}

export default function useAsyncForm<T extends { [key: string]: any }>({
  initialValues,
  initialErrors,
  schema,
}: UseAsyncFormInput<T>): UseAsyncFormReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [_initialValues, setInitialValues] = useState(
    initialValues || ({} as T)
  );

  const form = useForm({
    initialValues: _initialValues,
    initialErrors,
  });

  const validationSchema: AnySchema | undefined = schema;

  const validateAsync = (): Promise<boolean> | undefined => {
    setLoading(true);
    return validationSchema
      ?.validate(form.values, { abortEarly: false })
      .then(() => {
        form.setErrors({});
        return false;
      })
      .catch((err: ValidationError) => {
        const errors: Record<string, string> = {};
        err.inner.forEach((e) =>
          e.path !== undefined ? (errors[e.path] = e.message) : {}
        );
        form.setErrors(errors);
        setLoading(false);
        return true;
      });
  };

  const validateFieldAsync = <K extends LooseKeys<T>>(
    field: Extract<K, string>
  ): Promise<boolean> | undefined => {
    return validationSchema
      ?.validateAt(field, form.values, { abortEarly: false })
      .then(() => {
        form.setFieldError(field, null);
        return false;
      })
      .catch((err: ValidationError) => {
        form.setFieldError(field, err.errors);
        return true;
      });
  };

  const validateFieldsAsync = async <K extends LooseKeys<T>>(
    fields: Extract<K, string>[]
  ): Promise<boolean> => {
    let error = false;
    for (const field of fields) {
      const currError = await validateFieldAsync(field);
      error = currError || error;
    }
    return error;
  };

  async function sendForm<R extends FetchResponse<any>>(
    func: SendFormFunction<R, T>,
    opts?: { message?: string; resetInitial?: boolean }
  ): Promise<R> {
    // Schema validation
    const hasErrors = await validateAsync();
    if (hasErrors)
      return { error: { status: 500, message: "Validation error" } } as R;

    // Form sent to server
    setLoading(true);
    const res = await func(form.values);
    if (res.error) form.setErrors(mapErrors(res.error));
    else {
      form.setErrors({});
      if (opts?.message) notificationSuccess(opts.message);
    }
    setLoading(false);
    if (opts?.resetInitial) setInitialValues(form.values);
    return res;
  }

  function setFieldValue<L extends T, F extends LooseKeys<L>>(
    path: F,
    value: F extends keyof L ? L[F] : unknown
  ) {
    // @ts-ignore
    form.setFieldValue(path, value);
  }

  function reset() {
    form.setValues(_initialValues);
  }

  function resetInitial() {
    form.setValues(initialValues);
  }

  return {
    ...form,
    loading,
    initialValues: _initialValues,
    validateAsync,
    validateFieldAsync,
    validateFieldsAsync,
    sendForm,
    setFieldValue,
    reset,
    resetInitial,
    resetDirty: form.resetDirty,
  };
}
