import { describe, expect, it } from "vitest";
import { Settings } from "../../../domain";
import { LocalStorageDouble } from "../../../tests/doubles";
import { SettingsRepositoryLocalStorage } from "./settings.repository.local-storage";

describe("Local Storage implementation for settings repository should", () => {
  let localStorage: LocalStorageDouble<Settings>;
  const settings: Settings = {
    syncUrl: "irrelevant",
  };

  beforeEach(() => {
    localStorage = new LocalStorageDouble<Settings>({ onGet: settings });
  });

  it("retrieve settings", async () => {
    const result = await new SettingsRepositoryLocalStorage(
      localStorage
    ).findAll();

    expect(result).toStrictEqual(settings);
    localStorage.assertGetHasBeenCalled();
  });

  it("save settings returning the saved one", async () => {
    const savedSettings = await new SettingsRepositoryLocalStorage(
      localStorage
    ).save(settings);

    expect(savedSettings).toStrictEqual(settings);
    localStorage.assertSetHasBeenCalledWith(savedSettings);
  });
});
