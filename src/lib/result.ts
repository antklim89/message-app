export type ErrVariants = { message: string } & (
  | {
      type?: null;
    }
  | {
      type: 'authentication';
    }
  | {
      type: 'unexpected';
    }
  | {
      type: 'not-found';
    }
  | {
      type: 'validation';
      errors: Record<string, string>;
    }
);

export interface Ok<T> {
  type: 'success';
  result: T;
  message: null;
  error: null;
}

export interface Err {
  type: 'error';
  error: ErrVariants;
  result: null;
}

export type Result<T> = Ok<T> | Err;

export type PromiseResult<T> = Promise<Result<T>>;

export function ok<T>(result: T): Ok<T> {
  return {
    error: null,
    message: null,
    result,
    type: 'success',
  };
}

export function err(error: ErrVariants): Err {
  return {
    error,
    result: null,
    type: 'error',
  };
}

export function errUnexpected(message?: string): Err {
  return err({
    message: message ?? 'Unexpected error. Try again later.',
    type: 'unexpected',
  });
}

export function errAuthentication(message?: string): Err {
  return err({
    message: message ?? 'You are not authenticated to perform this operation.',
    type: 'authentication',
  });
}

export function isOk<const T>(data: unknown): data is Ok<T> {
  return data != null && typeof data === 'object' && 'type' in data && data.type === 'success';
}

export function isErr(error: unknown): error is Err {
  return error != null && typeof error === 'object' && 'type' in error && error.type === 'error';
}

export async function resultResolve<T>(
  promise: Promise<T>,
  ...errorsCbs: ((data: unknown) => Err | unknown)[]
): PromiseResult<T> {
  try {
    const result = await promise;
    return ok(result);
  } catch (error) {
    for (const errorCb of errorsCbs) {
      const errResult = errorCb(error);
      if (isErr(errResult)) return errResult;
    }

    if (error instanceof Error) return errUnexpected(error.message);
    return errUnexpected();
  }
}
