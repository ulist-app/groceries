import { Settings } from "../../../domain";
import { LocalStorageDataSource } from "../../data-sources";
import { SettingsRepository } from "../../../application";

export class SettingsRepositoryLocalStorage implements SettingsRepository {
  constructor(
    private readonly localStorage: LocalStorageDataSource<Settings>
  ) {}

  async findAll() {
    const settings = this.localStorage.get();
    return (
      settings || {
        syncUrl: undefined,
      }
    );
  }

  async save(settings: Settings) {
    this.localStorage.set(settings);
    return settings;
  }
}
