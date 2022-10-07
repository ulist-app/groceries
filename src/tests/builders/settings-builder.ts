import { Settings } from "../../domain";

export class SettingsBuilder {
  private syncUrl?: string;

  private constructor({ syncUrl }: Partial<Settings> = {}) {
    this.syncUrl = syncUrl;
  }

  static init(): SettingsBuilder {
    return new SettingsBuilder();
  }

  static random(): Settings {
    return new SettingsBuilder().build();
  }

  withSyncUrl(syncUrl?: string): SettingsBuilder {
    this.syncUrl = syncUrl;
    return this;
  }

  build(): Settings {
    return {
      syncUrl: this.syncUrl,
    };
  }
}
