import { UseCase } from "../use-case";
import { Settings } from "../../../domain";
import { SettingsRepository } from "../../repositories";

export class GetSettingsCase implements UseCase<void, Promise<Settings>> {
  constructor(private readonly settingsRepository: SettingsRepository) {}
  exec(): Promise<Settings> {
    return this.settingsRepository.findAll();
  }
}
