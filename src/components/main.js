import React, { Component } from "react";
import LeftSide from "./left_side/left_side";
import RightSide from "./right_side/right_side";

// Подключается левая и правая часть

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      task_title: '',
      task_content: '',
      task_date_ending: '',
      current_task_vision: false,
    }
  }

  show_task = (title, content, date) => {
    this.setState({task_title: title, 
                   task_content: content, 
                   task_date_ending: date,
                  current_task_vision: true})

  }

  refresh_task_vision = () => {
    this.setState({current_task_vision: false})
  }


  render() {
    return (
      <div className="row">
        <LeftSide auth={this.props.auth} 
                  username={this.props.username}
                  logout_user_func={this.props.logout_user_func}
                  tasks={this.props.tasks}
                  show_task={this.show_task}
                  refresh_task_vision={this.refresh_task_vision}
                  />
        <RightSide login_user_func={this.props.login_user_func}
                   auth={this.props.auth}
                   login_errors={this.props.login_errors}
                   add_new_task_in_state={this.props.add_new_task_in_state} 
                   get_user_tasks={this.props.get_user_tasks}
                   current_task_vision={this.state.current_task_vision}
                   task_title={this.state.task_title}
                   task_content={this.state.task_content}
                   task_date_ending={this.state.task_date_ending}
                   />
      </div>
    );
  }
}
