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

export interface ErrVariant<T extends string = string> {
  $$isErr: true;
  type: T;
  message: string;
  original?: unknown;
  issues?: Record<string, string | string[]>;
}

export type Result<T, E extends string = string> = Ok<T> | Err<E>;

export type PromiseResult<T, E extends string = string> = Promise<Result<T, E>>;

export function ok<const T>(result: T): Ok<T> {
  return {
    error: null,
    fail: false,
    result,
    success: true,
  };
}

export function err<const T extends string>(error: Omit<ErrVariant<T>, '$$isErr'>): Err<T> {
  return {
    error: { ...error, $$isErr: true },
    fail: true,
    result: null,
    success: false,
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

export function isErr<T extends string = string>(result: unknown): result is ErrVariant<T> {
  return typeof result === 'object' && result != null && '$$isErr' in result && result.$$isErr === true;
}

export const ErrType = {
  AUTHENTICATION: 'authentication',
  CONFLICT: 'conflict',
  NOT_FOUND: 'not_found',
  UNEXPECTED: 'unexpected',
  VALIDATION: 'validation',
} as const;
export type ErrType = (typeof ErrType)[keyof typeof ErrType];

export function errUnexpected(message?: string): Err<'unexpected'> {
  return err({
    message: message ?? 'Unexpected error. Try again later.',
    type: ErrType.UNEXPECTED,
  });
}
export function errNotFound(message?: string): Err<'not_found'> {
  return err({
    message: message ?? 'Not found. Try again later.',
    type: ErrType.NOT_FOUND,
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
    issues,
    message: message ?? 'Validation error. Please check your input.',
    type: ErrType.VALIDATION,
  });
}

export function errConflict(message?: string): Err<'conflict'> {
  return err({
    message: message ?? 'There was a conflict during the operation. Please check your input.',
    type: ErrType.CONFLICT,
  });
}
