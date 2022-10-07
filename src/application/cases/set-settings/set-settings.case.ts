import { UseCase } from "../use-case";
import { Settings } from "../../../domain";
import { SettingsRepository } from "../../repositories";

export class SetSettingsCase implements UseCase<Settings, Promise<Settings>> {
  constructor(private readonly settingsRepository: SettingsRepository) {}
  exec(settings: Settings): Promise<Settings> {
    return this.settingsRepository.save(settings);
  }
}
