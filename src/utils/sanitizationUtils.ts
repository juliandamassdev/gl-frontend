/**
 * Sanitize Numeric
 * @param input Input value
 * @returns Sanitized numeric
 */
export const sanitizeNumeric = (input: string) => {
  const sanitizedInput = input.replace(/[^0-9.,]/g, "");
  return sanitizedInput;
};

/**
 * Sanitize Uppercase
 * @param input Input value
 * @returns Sanitized Uppercase
 */
export const sanitizeUppercase = (input: string) => {
  const sanitizedInput = input.toUpperCase();
  return sanitizedInput;
};

/**
 * Sanitize Lowercase
 * @param input Input value
 * @returns Sanitized Lowercase
 */
export const sanitizeLowercase = (input: string) => {
  const sanitizedInput = input.toLocaleLowerCase();
  return sanitizedInput;
};
