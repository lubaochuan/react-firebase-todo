import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  if(props.authenticated){
    return (
      <ul className="menu">
        <li><Link to={'/'}>To do</Link></li>
        <li><Link to={'/completed'}>Completed</Link></li>
        <li className="logOut"  onClick={ props.logOut }>sign out</li>
      </ul>
    );
  } else {
    return (
        <div className="auth">
          <p className="facebook" onClick={props.authWithFacebook}>
            Facebook
          </p>
          <form>
            <label> Email <input type="email" /> </label>
            <label> Password <input type="password" /> </label>
          </form>
        </div>
    );
  }
}

export default Menu;
