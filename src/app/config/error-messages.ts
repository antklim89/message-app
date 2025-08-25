import { z } from 'zod/v4-mini';

export default z.config({
  customError: ({ code, minimum, maximum, input }) => {
    if (code === 'too_small') {
      if (typeof input === 'string') {
        return `Field should contain ${minimum} or more characters. Now it is ${input.length}.`;
      }
      if (typeof input === 'number') {
        return `Field should be equal ${minimum} or more. Now it is ${input}.`;
      }
    }
    if (code === 'too_big') {
      if (typeof input === 'string') {
        return `Field should contain ${maximum} or less characters. Now it is ${input.length}.`;
      }
      if (typeof input === 'number') {
        return `Field should be equal ${maximum} or less. Now it is ${input}.`;
      }
    }
    if (code === 'invalid_type') {
      if (typeof input === 'undefined' || input === null) return 'Field is required.';
    }
    return;
  },
});
