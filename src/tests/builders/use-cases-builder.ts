import {
  GetAllItemsCase,
  GetSettingsCase,
  SetItemAsMandatoryCase,
  SetItemAsNotMandatoryCase,
  SetItemAsNotRequiredCase,
  SetItemAsRequiredCase,
  SetSettingsCase,
  UseCases,
} from "../../application";
import { GetAllItemsCaseDouble } from "../doubles";
import { UseCaseDouble } from "../doubles/use-case.double";
import { SettingsBuilder } from "./settings-builder";

type ValueOf<T> = T[keyof T];

export class UseCasesBuilder {
  private getAllItems: GetAllItemsCase;
  private getSettings: GetSettingsCase;
  private setItemAsRequired: SetItemAsRequiredCase;
  private setItemAsNotRequired: SetItemAsNotRequiredCase;
  private setItemAsMandatory: SetItemAsMandatoryCase;
  private setItemAsNotMandatory: SetItemAsNotMandatoryCase;
  private setSettings: SetSettingsCase;

  private constructor({
    getAllItems,
    getSettings,
    setItemAsRequired,
    setItemAsNotRequired,
    setItemAsNotMandatory,
    setItemAsMandatory,
    setSettings,
  }: Partial<Record<keyof UseCases, ValueOf<UseCases>>> = {}) {
    this.getAllItems = (getAllItems ||
      new GetAllItemsCaseDouble()) as GetAllItemsCase;
    this.getSettings = (getSettings ||
      new UseCaseDouble([
        SettingsBuilder.init().withSyncUrl(undefined).build(),
      ])) as GetSettingsCase;
    this.setItemAsRequired = (setItemAsRequired ||
      new UseCaseDouble()) as SetItemAsRequiredCase;
    this.setItemAsNotRequired = (setItemAsNotRequired ||
      new UseCaseDouble()) as SetItemAsNotRequiredCase;
    this.setItemAsMandatory = (setItemAsMandatory ||
      new UseCaseDouble()) as SetItemAsMandatoryCase;
    this.setItemAsNotMandatory = (setItemAsNotMandatory ||
      new UseCaseDouble()) as SetItemAsNotMandatoryCase;
    this.setSettings = (setSettings || new UseCaseDouble()) as SetSettingsCase;
  }

  static init(): UseCasesBuilder {
    return new UseCasesBuilder();
  }

  static random(): UseCases {
    return new UseCasesBuilder().build();
  }

  withGetAllItemsCase(
    getAllItems: GetAllItemsCase | UseCaseDouble
  ): UseCasesBuilder {
    this.getAllItems = getAllItems as GetAllItemsCase;
    return this;
  }

  withGetSettingsCase(
    getSettings: GetSettingsCase | UseCaseDouble
  ): UseCasesBuilder {
    this.getSettings = getSettings as GetSettingsCase;
    return this;
  }

  withSetItemAsRequiredCase(
    setItemAsRequired: SetItemAsRequiredCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsRequired = setItemAsRequired as SetItemAsRequiredCase;
    return this;
  }

  withSetItemAsNotRequiredCase(
    setItemAsNotRequired: SetItemAsNotRequiredCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsNotRequired =
      setItemAsNotRequired as SetItemAsNotRequiredCase;
    return this;
  }

  withSetItemAsMandatoryCase(
    setItemAsMandatory: SetItemAsMandatoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsMandatory = setItemAsMandatory as SetItemAsMandatoryCase;
    return this;
  }

  withSetItemAsNotMandatoryCase(
    setItemAsNotMandatory: SetItemAsNotMandatoryCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setItemAsNotMandatory =
      setItemAsNotMandatory as SetItemAsNotMandatoryCase;
    return this;
  }

  withSetSettingsCase(
    setSettings: SetSettingsCase | UseCaseDouble
  ): UseCasesBuilder {
    this.setSettings = setSettings as SetSettingsCase;
    return this;
  }

  build(): UseCases {
    return {
      getAllItems: this.getAllItems,
      getSettings: this.getSettings,
      setItemAsRequired: this.setItemAsRequired,
      setItemAsNotRequired: this.setItemAsNotRequired,
      setItemAsMandatory: this.setItemAsMandatory,
      setItemAsNotMandatory: this.setItemAsNotMandatory,
      setSettings: this.setSettings,
    };
  }
}
