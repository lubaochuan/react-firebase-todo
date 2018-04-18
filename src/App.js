import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ItemsComponent from './components/ItemsComponent';
import Menu from './components/Menu';
import { fire, facebookProvider } from './fire';
import './App.css';

class App extends Component {
  state = {
    items: {},
    authenticated: false,
    loading: true
  }

  itemsRef = '';

  authWithFacebook=()=>{
    fire.auth().signInWithPopup(facebookProvider)
      .then((result,error) => {
        if(error){
          console.log('unable to signup with firebase')
        } else {
          this.setState({authenticated: true })
        }
      })
  }
  
  logOut=() => {
    fire.auth().signOut().then((user) => {
      this.setState({items:null})
    })
  }

  componentWillMount(){
    this.removeAuthListener = fire.auth().onAuthStateChanged(user=>{
      if(user){
        this.itemsRef = fire.database().ref(`items/${user.uid}`)
        this.itemsRef.on('value', data => {
          this.setState({
            authenticated: true,
            items: data.val(),
            loading: false
          })
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount(){
    fire.removeBinding(this.itemsRef)
  }

  completeItem=(id) => {
    this.itemsRef.update({
      [id]:{
        ...this.state.items[id],
        completed: true
      }
    })
  }

  deleteItem=(id) => {
    this.itemsRef.update({
      [id]: null
    })
  }

  addItem=(e) => {
    e.preventDefault()
    this.itemsRef.push({
      item: this.todoItem.value,
      completed: false
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="wrap">
          <h2>A simple todo app</h2>
          <Menu
            logOut={this.logOut}
            authenticated={this.state.authenticated}
            authWithFacebook={this.authWithFacebook}
          />
          <Route exact path="/" render={props =>
             <ItemsComponent
               items={this.state.items}
               done={false}
               action={this.completeItem}
               addItem={this.addItem}
               inputRef={el => this.todoItem = el}/>
          }/>
          <Route exact path="/completed" render={props =>
             <ItemsComponent
               items={this.state.items}
               done={true}
               action={this.deleteItem}/>
          }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
