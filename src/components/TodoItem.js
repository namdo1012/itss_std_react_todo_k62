/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/

import React from "react";

function TodoItem({ item, onCheck }) {
  const handleChange = () => {
    onCheck(item);
  };

  return (
    <label className="panel-block">
      <input type="checkbox" onChange={handleChange} checked={item.done} />
      <div className={item.done ? "has-text-grey-light" : ""}>{item.text}</div>
    </label>
  );
}

export default TodoItem;
