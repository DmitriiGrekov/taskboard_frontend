import React, { Component } from "react";

export default class CurrentTask extends Component {
   
    
  render() {
      
    return (
      <div style={{display: this.props.current_task_vision ? "block": "none"}} className="card">
        <div className="card-header">{this.props.task_title}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
                {this.props.task_content}
            </p>
            <footer className="blockquote-footer">
                {this.props.task_date_ending}
            </footer>

            <span href="#" className="btn btn-primary">
                Изменить
            </span>
          </blockquote>
        </div>
      </div>
    );
  }
}
