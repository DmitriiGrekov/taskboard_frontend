import React, { Component } from "react";

export default class Task extends Component {
  

  show_current_task = (e) => {
    e.preventDefault()
    let title = this.props.title
    let content = this.props.content
    let date_ending = this.props.date_ending
    this.props.show_task(title, content, date_ending)
  }

  render() {
    return (
      <div className="card task_card" task_id="1">
        <div className="card-body">
          <div className="task_header">
            <span href="" onClick={this.show_current_task}>{this.props.title}</span>
          </div>
          <div className="task_date">{this.props.date_ending}</div>
        </div>
      </div>
    );
  }
}
