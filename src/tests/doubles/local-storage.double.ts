import { vi } from "vitest";
import { LocalStorageDataSource } from "../../infrastructure/data-sources";

interface LocalStorageDoubleParams {
  onGet?: any;
}

export class LocalStorageDouble<T> implements LocalStorageDataSource<T> {
  private readonly getSpy = vi.fn();
  private readonly setSpy = vi.fn();

  private readonly onGet = null;

  constructor(params: LocalStorageDoubleParams = {}) {
    this.onGet = params.onGet;
  }

  get(): T {
    this.getSpy();
    return this.onGet as unknown as T;
  }

  set(value: T): void {
    this.setSpy(value);
  }

  assertSetHasBeenCalledWith(value: T) {
    expect(this.setSpy).toHaveBeenCalledWith(value);
  }

  assertGetHasBeenCalled() {
    expect(this.getSpy).toBeCalled();
  }
}
