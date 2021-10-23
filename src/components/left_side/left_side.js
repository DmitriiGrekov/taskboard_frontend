import React, { Component } from "react";
import AuthMenu from "./auth_menu";
import TaskList from "./task_list";

export default class LeftSide extends Component {
  render() {
    return (
      <div className="col-xl-6 col-lg-6 col-md-6">
        <div className="card">
          <div className="card-body">
            <AuthMenu auth={this.props.auth} 
                      username={this.props.username}
                      logout_user_func={this.props.logout_user_func}
                      refresh_task_vision={this.props.refresh_task_vision}/>
            <TaskList tasks={this.props.tasks} auth={this.props.auth} 
                      show_task={this.props.show_task}/>
          </div>
        </div>
      </div>
    );
  }
}
