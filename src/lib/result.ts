export interface Ok<T> {
  success: true;
  fail: false;
  result: T;
  error?: null;
}

export interface Err<T extends string = string> {
  success: false;
  fail: true;
  error: ErrVariant<T>;
  result?: null;
}

export type ErrVariant<T extends string = string> = {
  type: T;
  message: string;
  original?: unknown;
  issues?: Record<string, string | string[]>;
};

export type Result<T, E extends string = string> = Ok<T> | Err<E>;

export type PromiseResult<T, E extends string = string> = Promise<Result<T, E>>;

export function ok<const T>(result: T): Ok<T> {
  return {
    success: true,
    fail: false,
    result,
    error: null,
  };
}

export function err<const T extends string>(error: ErrVariant<T>): Err<T> {
  return {
    success: false,
    fail: true,
    error,
    result: null,
  };
}

export function errMap<const OldErr extends string, const NewErr extends string, const R>(
  result: Result<R, OldErr>,
  errCb: (arg: ErrVariant<OldErr>) => ErrVariant<NewErr>,
): Result<R, NewErr> {
  if (result.success) return result;
  return err(errCb(result.error));
}

export function okMap<const OldResult, const NewResult, const E extends string>(
  result: Result<OldResult, E>,
  okCb: (arg: OldResult) => NewResult,
): Result<NewResult, E> {
  if (result.fail) return result;
  return ok(okCb(result.result));
}

export const ErrType = {
  UNEXPECTET: 'unexpected',
  AUTHENTICATION: 'authentication',
  VALIDATION: 'validation',
} as const;
type ErrType = (typeof ErrType)[keyof typeof ErrType];

export function errUnexpected(message?: string): Err<'unexpected'> {
  return err({
    message: message ?? 'Unexpected error. Try again later.',
    type: ErrType.UNEXPECTET,
  });
}

export function errAuthentication(message?: string): Err<'authentication'> {
  return err({
    message: message ?? 'You are not authenticated to perform this operation.',
    type: ErrType.AUTHENTICATION,
  });
}

export function errValidation(message?: string, issues?: ErrVariant['issues']): Err<'validation'> {
  return err({
    message: message ?? 'Validation error. Please check your input.',
    type: ErrType.VALIDATION,
    issues,
  });
}
