import React, { Component } from "react";
import axios from "axios";

export default class RegisterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password_d_match: false,
      password_small: false,
      user_exist: false,
      register_success: false,
    };
  }
  usernameRef = React.createRef();
  passwordRef = React.createRef();
  password2Ref = React.createRef();
  emailRef = React.createRef();

  register_user = (e) => {
    e.preventDefault();
    let password = this.passwordRef.current.value;
    let password2 = this.password2Ref.current.value;

    if (password !== password2) {
      this.setState({ password_d_match: true });
    } else {
      this.setState({ password_d_match: false });
    }

    if (password.length < 8) {
      this.setState({ password_small: true });
    } else {
      this.setState({ password_small: false });
    }

    let data = {
      username: this.usernameRef.current.value,
      password: password,
      email: this.emailRef.current.value,
    };
    const url = "https://taskboard.pythonanywhere.com//auth/users/";

    axios({
      method: "post",
      url: url,
      data: data,
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    })
      .then((response) => {
        this.setState({ user_exist: false, register_success: true });
      })
      .catch((error) => {
        this.setState({ user_exist: true });
      });
  };

  render() {
    return (
      <div className="register_form">
        <form>
          {this.state.password_d_match ? (
            <div class="alert alert-danger" role="alert">
              Ваши пароли не совпадают
            </div>
          ) : (
            <></>
          )}

          {this.state.password_small ? (
            <div class="alert alert-danger" role="alert">
              Пароль слишком короткий
            </div>
          ) : (
            <></>
          )}

          {this.state.user_exist ? (
            <div class="alert alert-danger" role="alert">
              Пользователь с данным логином или почтой уже существует
            </div>
          ) : (
            <></>
          )}

          {this.state.register_success ? (
            <div class="alert alert-success" role="alert">
              Вы успешно зарегестрированны, можете авторизоваться
            </div>
          ) : (
            <></>
          )}

          <div className="form-group">
            <label htmlFor="login">Логин</label>
            <input
              ref={this.usernameRef}
              type="text"
              className="form-control"
              id="login"
              aria-describedby="emailHelp"
              name="login"
              placeholder="Введите логин"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              ref={this.emailRef}
              type="email"
              className="form-control"
              id="email"
              placeholder="Введите почту"
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              ref={this.passwordRef}
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Введите пароль"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Повторите пароль</label>
            <input
              ref={this.password2Ref}
              type="password"
              name="password1"
              className="form-control"
              id="password2"
              placeholder="Повторите пароль"
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.register_user}
          >
            Зарегестрироваться
          </button>
        </form>
      </div>
    );
  }
}
