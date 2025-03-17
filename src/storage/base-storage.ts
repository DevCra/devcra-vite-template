export class BaseStorage<T> {
  private storage: Storage;

  private key: string;

  constructor(storage: Storage, key: string) {
    this.storage = storage;
    this.key = key;
  }

  getItem() {
    return JSON.parse(this.storage.getItem(this.key) ?? "") as T;
  }

  setItem(value: T) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  // remove

  // clear
}
