import { test as base } from "@playwright/test";
import { encryptSecretKey } from "./crypto-helper";
import { config } from "./setupEnv";

const encryptedKey = encryptSecretKey(config.secretKey); // Encriptar la clave secreta

export const test = base.extend<{ encryptedKey: string }>({
  encryptedKey: async ({}, use) => {
    console.log("Clave secreta encriptada:", encryptedKey);
    await use(encryptedKey);
  },
});