import { UseCase } from "../use-case";
import { Id } from "../../../domain";
import { ItemRepository } from "../../repositories";

type Input = Id;
type Output = Promise<void>;

export class SetItemAsMandatoryCase implements UseCase<Input, Output> {
  constructor(private readonly itemsRepository: ItemRepository) {}
  async exec(id: Id): Promise<void> {
    const item = await this.itemsRepository.findById(id);
    await this.itemsRepository.save({
      ...item,
      isMandatory: true,
      isRequired: true,
    });
  }
}
