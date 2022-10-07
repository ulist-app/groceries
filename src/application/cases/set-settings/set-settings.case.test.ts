import { describe, expect, it, vi } from "vitest";
import { SetSettingsCase } from "./set-settings.case";
import { SettingsBuilder } from "../../../tests/builders/settings-builder";
import { SettingsRepository } from "../../repositories";

describe("Set settings use case should", () => {
  it("return settings", async () => {
    const settings = SettingsBuilder.random();
    const settingsRepository = {
      save: vi.fn(async () => settings),
    } as unknown as SettingsRepository;

    const result = await new SetSettingsCase(settingsRepository).exec(settings);

    expect(settingsRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(settings);
  });
});
