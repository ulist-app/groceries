export interface LocalStorageDataSource<T> {
  get(): T | null;

  set(item: T): void;
}
