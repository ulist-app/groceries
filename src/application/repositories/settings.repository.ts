import { Settings } from "../../domain";

export interface SettingsRepository {
  findAll(): Promise<Settings>;
  save(settings: Settings): Promise<Settings>;
}
