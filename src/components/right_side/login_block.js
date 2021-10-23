import React, { Component } from "react";

export default class LoginBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }
  loginRef = React.createRef();
  passwordRef = React.createRef();

  login_user = (e) => {
    e.preventDefault();
    let login = this.loginRef.current.value;
    let password = this.passwordRef.current.value;

    this.props.login_user_func(login, password);

    console.log(this.props.login_errors)
  };

  render() {
    return (
      <div
        style={{
          display:  !this.props.auth || this.props.login_errors ? "block" : "none",
        }}
        className="login_form"
      >
        
        {this.props.login_errors ? (
        <div class="alert alert-danger" role="alert">
          Вы ввели не правильный логин или пароль
        </div>): <></> }
        
        <form>
          <div className="form-group">
            <label htmlFor="login2">Логин</label>
            <input
              ref={this.loginRef}
              type="text"
              className="form-control"
              id="login2"
              aria-describedby="emailHelp"
              placeholder="Введите логин"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password3">Пароль</label>
            <input
              ref={this.passwordRef}
              type="password"
              className="form-control"
              id="password3"
              placeholder="Введите пароль"
            />
          </div>

          <br />

          <button
            type="submit"
            onClick={this.login_user}
            className="btn btn-primary"
          >
            Войти
          </button>
        </form>
      </div>
    );
  }
}
