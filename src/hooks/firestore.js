import { useState, useEffect } from "react";
import {
  getTodoItems,
  addTodoItem,
  updateTodoItem,
  clearTodoItem,
} from "../lib/firebase";

function useFirestore() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const _items = await getTodoItems();
    setItems(_items);
  };

  const addItem = async (item) => {
    const newItem = { text: item.text, done: item.done };
    await addTodoItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async (checked) => {
    const changes = { done: !checked.done };
    await updateTodoItem(changes, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes };
      }
      return item;
    });
    setItems(newItems);
  };

  const clearItems = () => {
    items.map((item) => {
      clearTodoItem(item);
    });
    setItems([]);
  };


  return [items, addItem, updateItem, clearItems];
}

export default useFirestore;
