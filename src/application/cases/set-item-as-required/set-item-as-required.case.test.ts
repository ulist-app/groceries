import { describe, expect, it, vi } from "vitest";
import { Item } from "../../../domain";
import { ItemRepository } from "../../repositories";
import { SetItemAsRequiredCase } from "./set-item-as-required.case";

describe("Set item as required use case should", () => {
  it("set item isRequired property to true", async () => {
    const item = new Item({ isRequired: false });
    const itemsRepository = {
      findById: vi.fn(async () => item),
      save: vi.fn(),
    } as unknown as ItemRepository;

    await new SetItemAsRequiredCase(itemsRepository).exec(item.id);

    expect(itemsRepository.save).toHaveBeenCalledWith({
      ...item,
      isRequired: true,
    });
  });
});
