import { Id, ItemList, Settings } from "../../../domain";
import { proxy, useSnapshot } from "valtio";
import {
  generateActions,
  generateUseCasesWithLocalDb,
  generateUseCasesWithRemoteDb,
} from "./generators";

export interface StoreActions {
  getAllItems(): void;
  getSettings(): void;
  setItemAsRequired(id: Id): void;
  setItemAsNotRequired(id: Id): void;
  setItemAsMandatory(id: Id): void;
  setItemAsNotMandatory(id: Id): void;
  setSettings(settings: Settings): void;
}

export interface Store {
  items: ItemList;
  settings: Settings;
  actions: StoreActions;
}

const store = proxy<Store>({
  items: new ItemList([]),
  settings: { syncUrl: undefined },
  actions: {
    getAllItems() {},
    getSettings() {},
    setItemAsRequired() {},
    setItemAsNotRequired() {},
    setItemAsMandatory() {},
    setItemAsNotMandatory() {},
    setSettings() {},
  },
});

export function initStore(useCases = generateUseCasesWithLocalDb()) {
  store.items = new ItemList([]);
  useCases.getSettings.exec().then((settings) => {
    if (settings.syncUrl) {
      console.log("[INIT STORE]: REMOTE DB");
      store.settings = settings;
      store.actions = generateActions(
        store,
        generateUseCasesWithRemoteDb(settings, store.actions.getAllItems)
      );
    } else {
      console.log("[INIT STORE]: LOCAL DB");
      store.actions = generateActions(store, useCases);
    }
  });
}

export function useStore() {
  return useSnapshot(store);
}
