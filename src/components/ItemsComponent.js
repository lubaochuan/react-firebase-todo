import React from 'react';

const ItemsComponent = ({items, done, action, addItem, inputRef, authenticated}) => {
  let list = [];
  let mark = done === false ? '\u2713' : 'x';
  for(let i in items){
    if(items[i].completed === done){
      list.push(<li key={i}>{items[i].item}
        <span onClick={() => action(i)}> {mark}</span></li>)
    }
  }
  if(!authenticated) return null;
  return(
    <div>
      {done
      ? (<ul className="items">{list}</ul>)
      : (
      <div>
        <form onSubmit={addItem}>
          <input ref={inputRef} type="text" />
        </form>
        <ul className="items">{list}</ul>
      </div>)}
    </div>);
}
export default ItemsComponent;
