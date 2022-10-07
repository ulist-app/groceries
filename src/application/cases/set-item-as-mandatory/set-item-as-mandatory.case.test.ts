import { describe, expect, it, vi } from "vitest";
import { ItemBuilder } from "../../../tests/builders";
import { ItemRepository } from "../../repositories";
import { SetItemAsMandatoryCase } from "./set-item-as-mandatory.case";

describe("Set item as mandatory use case should", () => {
  it("set item isMandatory and isRequired properties to true", async () => {
    const item = ItemBuilder.init()
      .withIsMandatory(false)
      .withIsRequired(false)
      .build();
    const itemsRepository = {
      findById: vi.fn(async () => item),
      save: vi.fn(),
    } as unknown as ItemRepository;

    await new SetItemAsMandatoryCase(itemsRepository).exec(item.id);

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isMandatory: true,
      isRequired: true,
    });
  });
});
