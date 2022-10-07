import { useRoute } from "wouter";
import { Transition } from "react-transition-group";
import { useStore } from "../store";
import { Id } from "../../../domain";
import React, { useEffect } from "react";

export function ItemCRUD() {
  const [match, params] = useRoute("/items/:id");
  const { items, actions } = useStore();
  const item = items.findById(new Id(params?.id));

  useEffect(() => {
    actions.getAllItems();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <div className="ItemCrud" style={{ width: "100%" }}>
        <span>Hi, this is: {params!.id}</span>
        <pre>
          <code>{JSON.stringify(item, null, 2)}</code>
        </pre>
      </div>
    </Transition>
  );
}
