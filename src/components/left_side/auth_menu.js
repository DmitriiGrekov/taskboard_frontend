import React, { Component } from "react";

export default class AuthMenu extends Component {


  refresh_vision = (e) => {
    e.preventDefault()
    console.log('hello')
    this.props.refresh_task_vision()
  }

  render() {

    if (this.props.auth) {
      return (
        <div className="auth">
          <ul>
            <li>
              <span  id="">
                {this.props.username}
              </span>
            </li>
            <li>
              <span  id="logout_user" onClick={this.props.logout_user_func}>
                Выйти
              </span>
            </li>
          </ul>

          <button className="btn btn-primary " id="add_task_button" onClick={this.refresh_vision}>
            +
          </button>
        </div>
      );
    } else {
      return (
        <div className="auth">
          <ul>
            <li>
              <span  id="login_button">
                Войти
              </span>
            </li>
            <li>
              <span  id="register_button">
                Зарегестрироваться
              </span>
            </li>
          </ul>

          {this.props.auth ? 
          (<button className="btn btn-primary " id="add_task_button" onClick={this.refresh_vision}>
            +
          </button>) : <></>}
          
        </div>
      );
    }
  }
}
