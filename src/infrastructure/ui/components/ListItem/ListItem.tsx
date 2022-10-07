import React, { FC } from "react";
import { Item, palette } from "../../../../domain";
import "./ListItem.scss";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { messages } from "../../../../messages";
import { useStore } from "../../store";
import { Link } from "wouter";

export interface ListItemProps {
  item: Item;
}

export const ListItem: FC<ListItemProps> = ({ item }) => {
  const { actions } = useStore();
  return (
    <div className="ListItem" data-testid={item.id.value}>
      <span className="quantity">{item.quantity}</span>
      <Link to={`/items/${item.id.value}`}>
        <span className="item">{item.name}</span>
      </Link>
      <span className="is-required">
        {item.isRequired ? (
          <button
            aria-label={messages.actions.setItemAsNotRequired}
            onClick={() => actions.setItemAsNotRequired(item.id)}
          >
            <AiFillMinusCircle size={32} color={palette.red} />
          </button>
        ) : (
          <button
            aria-label={messages.actions.setItemAsRequired}
            onClick={() => actions.setItemAsRequired(item.id)}
          >
            <AiFillPlusCircle size={32} color={palette.green} />
          </button>
        )}
      </span>
      <span className="is-mandatory">
        {item.isMandatory ? (
          <button
            aria-label={messages.actions.setItemAsNotMandatory}
            onClick={() => actions.setItemAsNotMandatory(item.id)}
          >
            <BsFillStarFill size={32} color={palette.yellow} />
          </button>
        ) : (
          <button
            aria-label={messages.actions.setItemAsMandatory}
            onClick={() => actions.setItemAsMandatory(item.id)}
          >
            <BsFillStarFill size={32} color={palette.gray} />
          </button>
        )}
      </span>
    </div>
  );
};
