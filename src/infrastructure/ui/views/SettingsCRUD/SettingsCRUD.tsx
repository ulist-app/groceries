import React, { FormEventHandler, useEffect } from "react";
import { useRoute } from "wouter";
import { Transition } from "react-transition-group";
import { messages } from "../../../../messages";
import { StoreActions, useStore } from "../../store";
import "./SettingsCRUD.scss";

export function SettingsCRUD() {
  const [match] = useRoute("/settings");
  const { actions, settings } = useStore();
  const onSubmitHandler = generateOnSubmitHandler(actions);

  useEffect(() => {
    actions.getSettings();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <form className="SettingsCRUD" onSubmit={onSubmitHandler}>
        <label htmlFor="syncUrl">{messages.settings.syncUrlInputLabel}</label>
        <input
          name="syncUrl"
          type="url"
          aria-label={messages.settings.syncUrlInput}
          defaultValue={settings?.syncUrl}
        />
        <button type="submit" aria-label={messages.settings.submitButton}>
          {messages.settings.submitButton} 💾
        </button>
      </form>
    </Transition>
  );
}

function generateOnSubmitHandler(
  actions: StoreActions
): FormEventHandler<HTMLFormElement> {
  return (event) => {
    try {
      event.preventDefault();
      const formElements = event.currentTarget.elements as unknown as {
        length: number;
        syncUrl: HTMLInputElement;
      };
      if (formElements.length) {
        const syncUrl = formElements.syncUrl.value;
        if (syncUrl) {
          actions.setSettings({
            syncUrl,
          });
        }
      }
    } catch (error) {
      console.debug(error);
    }
  };
}
