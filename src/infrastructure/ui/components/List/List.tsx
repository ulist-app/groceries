import React, { FC } from "react";
import { Item, ItemList } from "../../../../domain";
import { ListItem } from "../ListItem";
import "./List.scss";
import { messages } from "../../../../messages";

export interface ListProps {
  items: Item[];
}

const EmptyList = () => (
  <div className="List">
    <p>{messages.emptyList}</p>
  </div>
);

export const List: FC<ListProps> = ({ items }) => {
  if (items.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className="List">
      <span className="items-total">
        {items.length === 1 ? "1 item" : `${items.length} items`}
      </span>
      {ItemList.groupItemsByCategory(items).map(([categoryTitle, items]) => (
        <details open key={categoryTitle}>
          <summary>{categoryTitle}</summary>
          <ul className="ItemList">
            {items.map((item) => (
              <li key={item.id.value}>
                <ListItem item={item} />
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
};
