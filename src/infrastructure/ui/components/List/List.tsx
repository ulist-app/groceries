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
      {ItemList.groupItemsByCategory(items).map(([categoryName, items]) => (
        <details open key={categoryName}>
          <summary>{categoryName}</summary>
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
