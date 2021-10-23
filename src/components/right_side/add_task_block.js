import React, { Component } from "react";
import axios from "axios";

export default class AddTaskBlock extends Component {
  constructor(props){
    super(props)
    this.state = {
      display: true,

    }
  }

  titleRef = React.createRef();
  contentRef = React.createRef();
  dateRef = React.createRef();


  add_task = (e) => {
    e.preventDefault();
    if(this.props.auth){
    let title = this.titleRef.current.value;
    let content = this.contentRef.current.value;
    let date = this.dateRef.current.value;
    let token = "Token " + localStorage.getItem('user_token')

    let url = 'https://taskboard.pythonanywhere.com/api/v1/list/tasks/'
    let data = {
      title: title,
      content: content,
      date_ending: date
    }

    axios({
      method: "post",
      url: url,
      data: data,
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    )
      .then((response) => {
        console.log(response.data)
        this.props.add_new_task_in_state(response.data)
      })
      .catch((error) => {
      });



    }
  }
 
  render() {
    
    return (
      <div style={{display: this.props.auth && !this.props.current_task_vision ? "block" : "none"}} className="task_add_form">
        <form>
          <div className="form-group mb-1">
            <label htmlFor="title">Название записи</label>
            <input
              ref={this.titleRef}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="Title"
              placeholder="Введите назване записи"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="content">Содержание записи</label>
            <textarea
              ref={this.contentRef}
              name="content"
              id="content"
              cols="30"
              rows="10"
              className="form-control"
              placeholder="Введите что необходимо запомнить"
            ></textarea>
          </div>
          <div className="form-group">
            <input ref={this.dateRef} type="date" className="form-control" name="date"/>

          </div>
          <br />
          <button type="submit" className="btn btn-primary" onClick={this.add_task}>
            Добавить запись
          </button>
        </form>
      </div>
    );
  }
}
