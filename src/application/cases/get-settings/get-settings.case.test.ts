import { describe, expect, it, vi } from "vitest";
import { GetSettingsCase } from "./get-settings.case";
import { SettingsBuilder } from "../../../tests/builders/settings-builder";
import { SettingsRepository } from "../../repositories";

describe("Get settings use case should", () => {
  it("return settings", async () => {
    const settings = SettingsBuilder.random();
    const settingsRepository = {
      findAll: vi.fn(async () => settings),
    } as unknown as SettingsRepository;

    const result = await new GetSettingsCase(settingsRepository).exec();

    expect(settingsRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(settings);
  });
});
