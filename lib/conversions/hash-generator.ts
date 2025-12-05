/**
 * Hash Generator Logic
 * Feature: 001-dev-tools-suite / User Story 6
 */

import CryptoJS from 'crypto-js';

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

/**
 * Generate MD5 hash using crypto-js
 */
export function generateMD5(text: string): string {
  return CryptoJS.MD5(text).toString();
}

/**
 * Generate SHA-1 hash using Web Crypto API
 */
export async function generateSHA1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return bufferToHex(hashBuffer);
}

/**
 * Generate SHA-256 hash using Web Crypto API
 */
export async function generateSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

/**
 * Generate SHA-512 hash using Web Crypto API
 */
export async function generateSHA512(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  return bufferToHex(hashBuffer);
}

/**
 * Generate hash based on selected algorithm
 */
export async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  switch (algorithm) {
    case 'MD5':
      return generateMD5(text);
    case 'SHA-1':
      return await generateSHA1(text);
    case 'SHA-256':
      return await generateSHA256(text);
    case 'SHA-512':
      return await generateSHA512(text);
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
}

/**
 * Convert ArrayBuffer to hex string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Get expected hash length for algorithm
 */
export function getHashLength(algorithm: HashAlgorithm): number {
  const lengths: Record<HashAlgorithm, number> = {
    'MD5': 32,
    'SHA-1': 40,
    'SHA-256': 64,
    'SHA-512': 128
  };
  return lengths[algorithm];
}
