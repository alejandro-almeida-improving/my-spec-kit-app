/**
 * Base64 Converter Logic
 * Feature: 001-dev-tools-suite / User Story 3
 */

/**
 * Encode text to Base64 with UTF-8 support
 */
export function encodeBase64(text: string): string {
  // Handle UTF-8 characters properly
  const utf8Bytes = new TextEncoder().encode(text);
  let binary = '';
  utf8Bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

/**
 * Decode Base64 to text with UTF-8 support
 */
export function decodeBase64(base64: string): string {
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (error) {
    throw new Error('Invalid Base64 string');
  }
}

/**
 * Validate Base64 format
 */
export function isValidBase64(str: string): boolean {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(str)) {
    return false;
  }
  
  try {
    atob(str);
    return true;
  } catch {
    return false;
  }
}
