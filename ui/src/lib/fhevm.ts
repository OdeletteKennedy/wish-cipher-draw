import { createInstance, initSDK, SepoliaConfig } from "@zama-fhe/relayer-sdk/bundle";
import type { FhevmInstance } from "@zama-fhe/relayer-sdk/bundle";

let fhevmInstance: FhevmInstance | null = null;
let isSDKInitialized = false;

export async function initializeFHEVM(chainId?: number): Promise<FhevmInstance> {
  if (!fhevmInstance) {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      throw new Error("window.ethereum is not available");
    }
    
    if (!isSDKInitialized) {
      await initSDK();
      isSDKInitialized = true;
    }
    
    const config = {
      ...SepoliaConfig,
      network: (window as any).ethereum,
    };
    
    fhevmInstance = await createInstance(config);
  }
  
  return fhevmInstance;
}

export async function encryptNumber(
  fhevm: FhevmInstance,
  contractAddress: string,
  userAddress: string,
  number: number
) {
  const encryptedInput = fhevm
    .createEncryptedInput(contractAddress, userAddress)
    .add32(number);
  
  return await encryptedInput.encrypt();
}
