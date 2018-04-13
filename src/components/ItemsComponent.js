import React from 'react';

const ItemsComponent = ({items, done}) => {
  let list = [];
  let mark = done === false ? '\u2713' : 'x';
  for(let i in items){
    if(items[i].completed === done){
      list.push(<li key={i}>{items[i].item} <span>{mark}</span></li>)
    }
  }
  return(<ul className="items">{list}</ul>)
}
export default ItemsComponent;
