//import crypto from "crypto"
import crypto from "node:crypto";

function encrypt(text:string, key:string) {
  if (!text || !key) {
    return "";
  }

  const textBytes = new TextEncoder().encode(text);
  const keyBytes = new TextEncoder().encode(key);
  const iv = crypto.getRandomValues(new Uint8Array(textBytes.length)); 

  const encryptedBytes = new Uint8Array(textBytes.length);

  for (let i = 0; i < textBytes.length; i++) {
    encryptedBytes[i] = (textBytes[i] ^ keyBytes[i % keyBytes.length]) ^ iv[i];
  }

  const combinedBytes = new Uint8Array(iv.length + encryptedBytes.length);
  combinedBytes.set(iv, 0);
  combinedBytes.set(encryptedBytes, iv.length);

  return Buffer.from(combinedBytes).toString('base64'); // Node.js base64
}

function decrypt(encryptedText:string, key:string) {
  if (!encryptedText || !key) {
    return "";
  }
  try {
    const combinedBytes = new Uint8Array(Buffer.from(encryptedText, 'base64')); 

    const keyBytes = new TextEncoder().encode(key);
    const ivLength = combinedBytes.length / 2;
    const iv = combinedBytes.slice(0, ivLength);
    const encryptedBytes = combinedBytes.slice(ivLength);
    const decryptedBytes = new Uint8Array(encryptedBytes.length);

    for (let i = 0; i < encryptedBytes.length; i++) {
      decryptedBytes[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length] ^ iv[i];
    }
    return new TextDecoder().decode(decryptedBytes);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
}

export {encrypt,decrypt}