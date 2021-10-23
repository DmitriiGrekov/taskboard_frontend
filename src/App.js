import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Title from "./components/title";
import Main from "./components/main";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      login: "",
      login_errors: false,
      tasks: {}
    };
  }

  UNSAFE_componentWillMount() {
    let token = "Token " + localStorage.getItem("user_token");
    if (token !== "Token null") {
      this.setState({ auth: true });
      this.get_send_request("https://taskboard.pythonanywhere.com/auth/users/me");
      this.get_user_tasks('https://taskboard.pythonanywhere.com/api/v1/list/tasks/')
    }
  }

  add_new_task_in_state = (data) => {
    const tasks = {...this.state.tasks}
    tasks[`task${Date.now()}`] = data
    this.setState({tasks})
  }

  get_user_tasks = (url) => {
    let token = "Token " + localStorage.getItem("user_token");
    axios({
      method: "get",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => {
      this.setState({tasks: response.data})
    })

  }

  get_send_request = (url) => {
    let token = "Token " + localStorage.getItem("user_token");
    axios({
      method: "get",
      url: url,

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => {
      this.setState({ login: response.data.username });
    });
  };

  login_user_func = (login, password) => {
    let url = "https://taskboard.pythonanywhere.com/auth/token/login/";
    let data = { username: login, password: password };

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
        this.setState({ auth: true, login_errors: false });
        localStorage.setItem("user_token", response.data.auth_token);
        this.get_send_request("https://taskboard.pythonanywhere.com/auth/users/me");
        this.get_user_tasks('https://taskboard.pythonanywhere.com/api/v1/list/tasks/')
      })
      .catch((error) => {
        this.setState({login_errors: true})
      });
  };

  logout_user = (e) => {
    e.preventDefault();
    const url = 'https://taskboard.pythonanywhere.com/auth/token/logout/'
    let token = "Token " + localStorage.getItem("user_token");
    axios({
      method: "post",
      url: url,
      
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,

        },
      },
    ).then((response) => {
      console.log('good')
      localStorage.removeItem('user_token')
      this.setState({auth: false, login: ''})

    })
  };

  componentDidMount() {

    $( document ).delegate( "#add_task_button", "click", () => {
      $("#content").children().css("display", "none");
      $(".task_add_form").slideToggle("slow");
    });
    // $("#add_task_button").click(() => {
    //   $("#content").children().css("display", "none");
    //   $(".task_add_form").slideToggle("slow");
    // });
    $( document ).delegate( "#register_button", "click", () => {
      $("#content").children().css("display", "none");
      $(".register_form").slideToggle();
      return false;
    });
    

    // $("#register_button").click(function () {
    //   $("#content").children().css("display", "none");
    //   $(".register_form").slideToggle();
    //   return false;
    // });
    $( document ).delegate( "#login_button", "click", () => {
      $("#content").children().css("display", "none");
      $(".login_form").slideToggle();
      return false;
    });

    // $("#login_button").click(function () {
    //   $("#content").children().css("display", "none");
    //   $(".login_form").slideToggle();
    //   return false;
    // });

    $( document ).delegate( "#logout_user", "click", () => {
      $("#content").children().css("display", "none");
      return false;
    });

    // $(document).delegate('.task_card', 'click', () => {
    //   $('#content').children().css('display', 'none')
    // })
  }

  render() {
    return (
      <>
        <Title />
        <Main
          login_user_func={this.login_user_func}
          logout_user_func={this.logout_user}
          auth={this.state.auth}
          username={this.state.login}
          login_errors={this.state.login_errors}
          add_new_task_in_state={this.add_new_task_in_state}
          get_user_tasks={this.get_user_tasks}
          tasks={this.state.tasks}
        />
      </>
    );
  }
}
