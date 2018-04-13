import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    items: {
      1123: {
        item: 'item one',
        completed: false
      },
      2564321: {
        item: 'item two',
        completed: true
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrap">
          <h2>A simple todo app</h2>
          <ul className="menu">
            <li><Link to={'/'}>To do</Link></li>
            <li><Link to={'/completed'}>Completed</Link></li>
          </ul>
          <Route exact path="/" render={props => {
            let list = [];
            for(let i in this.state.items){
              if(this.state.items[i].completed === false){
                list.push(<li key={i}>{this.state.items[i].item} <span>x</span></li>);
              }
            }
            return(<ul className="items">{list}</ul>)
          }} />
          <Route exact path="/completed" render={props => {
            let list = [];
            for(let i in this.state.items){
              if(this.state.items[i].completed === true){
                list.push(<li key={i}>{this.state.items[i].item} <span>x</span></li>);
              }
            }
            return(<ul className="items">{list}</ul>)
          }} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
