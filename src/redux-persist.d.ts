// src/types/redux-persist.d.ts
declare module 'redux-persist/lib/storage' {
    export interface Storage {
      getItem(key: string): Promise<string | null>;
      setItem(key: string, value: string): Promise<void>;
      removeItem(key: string): Promise<void>;
    }
  
    const storage: Storage;
    export default storage;
  }
  