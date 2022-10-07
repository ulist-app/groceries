import { describe, expect, it, vi } from "vitest";
import { ItemBuilder } from "../../../tests/builders";
import { ItemRepository } from "../../repositories";
import { SetItemAsNotRequiredCase } from "./set-item-as-not-required.case";

describe("Set item as not required use case should", () => {
  it("set item properties isRequired and isMandatory to false", async () => {
    const item = ItemBuilder.init()
      .withIsRequired(true)
      .withIsMandatory(false)
      .build();
    const itemsRepository = {
      findById: vi.fn(async () => item),
      save: vi.fn(),
    } as unknown as ItemRepository;

    await new SetItemAsNotRequiredCase(itemsRepository).exec(item.id);

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isRequired: false,
      isMandatory: false,
    });
  });
});
