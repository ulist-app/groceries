import { UseCase } from "../../application";
import { expect, vi } from "vitest";

export class UseCaseDouble<R = any> implements UseCase<any, Promise<R>> {
  protected execCount = -1;
  protected execSpy = vi.fn();

  constructor(private readonly onExec = [] as Array<R>) {}

  async exec(input: void): Promise<R> {
    this.execSpy(input);
    this.execCount++;
    if (this.execCount > this.onExec.length - 1) {
      this.execCount = 0;
    }
    return this.onExec[this.execCount];
  }

  assertHasBeenCalled() {
    expect(this.execSpy).toHaveBeenCalled();
  }

  assertHasBeenCalledWith(...args: any[]) {
    expect(this.execSpy).toHaveBeenCalledWith(...args);
  }

  assertHasBeenCalledTimes(times: number) {
    expect(this.execSpy).toHaveBeenCalledTimes(times);
  }
}
