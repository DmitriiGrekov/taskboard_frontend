import React, { Component } from "react";
import AddTaskBlock from "./add_task_block";
import RegisterBlock from "./register_block";
import LoginBlock from "./login_block";
import CurrentTask from "./current_task";

export default class RightSide extends Component {
  render() {
    return (
      <div className="col-xl-6 col-lg-6 col-md-6">
        <div className="card">
          <div className="card-body" id="content">
            
            <AddTaskBlock auth={this.props.auth}
                          add_new_task_in_state={this.props.add_new_task_in_state}
                          current_task_vision={this.props.current_task_vision} />
            <RegisterBlock auth={this.props.auth}
                            />
            <LoginBlock
              login_user_func={this.props.login_user_func}
              auth={this.props.auth}
              login_errors={this.props.login_errors}
              get_user_tasks={this.props.get_user_tasks}
            />
            <CurrentTask current_task_vision={this.props.current_task_vision}
                       task_title={this.props.task_title}
                   task_content={this.props.task_content}
                   task_date_ending={this.props.task_date_ending}
                       
                       />
          </div>
        </div>
      </div>
    );
  }
}
