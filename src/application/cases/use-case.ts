import {
  GetAllItemsCase,
  GetSettingsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  SetSettingsCase,
} from "./index";
import { ItemRepository, SettingsRepository } from "../repositories";

export interface UseCase<Input, Output> {
  exec(input: Input): Output;
}

export interface UseCases {
  getAllItems: GetAllItemsCase;
  getSettings: GetSettingsCase;
  setItemAsRequired: SetItemAsRequiredCase;
  setItemAsNotRequired: SetItemAsNotRequiredCase;
  setItemAsMandatory: SetItemAsMandatoryCase;
  setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  setSettings: SetSettingsCase;
}

interface Repositories {
  itemRepository: ItemRepository;
  settingsRepository: SettingsRepository;
}

export function generateUseCases({
  itemRepository,
  settingsRepository,
}: Repositories): UseCases {
  return {
    getAllItems: new GetAllItemsCase(itemRepository),
    getSettings: new GetSettingsCase(settingsRepository),
    setItemAsMandatory: new SetItemAsMandatoryCase(itemRepository),
    setItemAsNotMandatory: new SetItemAsNotMandatoryCase(itemRepository),
    setItemAsNotRequired: new SetItemAsNotRequiredCase(itemRepository),
    setItemAsRequired: new SetItemAsRequiredCase(itemRepository),
    setSettings: new SetSettingsCase(settingsRepository),
  };
}
