import { describe, expect, it, vi } from "vitest";
import { ItemBuilder } from "../../../tests/builders";
import { ItemRepository } from "../../repositories";
import { SetItemAsNotMandatoryCase } from "./set-item-as-not-mandatory.case";

describe("Set item as not mandatory use case should", () => {
  it("set item properties isMandatory to false", async () => {
    const item = ItemBuilder.init()
      .withIsMandatory(true)
      .withIsRequired(true)
      .build();
    const itemsRepository = {
      findById: vi.fn(async () => item),
      save: vi.fn(),
    } as unknown as ItemRepository;

    await new SetItemAsNotMandatoryCase(itemsRepository).exec(item.id);

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isMandatory: false,
    });
  });
});
