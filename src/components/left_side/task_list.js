import React, { Component } from "react";
import Task from "./task";
import NothingBlock from "./nothing_block";
import UnAuthorized from "./unauthorized";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render_list_block = () => {
    if (!this.props.auth) {
      return <UnAuthorized />;
    } 
    if (this.props.tasks < 1) {
      return <NothingBlock/>;
    } else {
      return (
        <div className="task_list mt-3">
          {Object.keys(this.props.tasks).map((key) => {
            return (
              <Task
                title={this.props.tasks[key].title}
                key={key}
                date_ending={this.props.tasks[key].date_ending}
                content={this.props.tasks[key].content}
                show_task={this.props.show_task}
              />
            );
          })}
        </div>
      );
    }
  };

  render() {
    return <>{this.render_list_block()}</>;
  }
}
