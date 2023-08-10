import React, { Component } from "react";
import { checkLocalStorage } from "../LocalStorage";
import { AiOutlineFileAdd } from "react-icons/ai";
import styles from "../../styles/Todos.module.scss";
import Filter from "../Filter";
class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      name: "",
      descriptionOfTodo: "",
    };
  }
  componentDidMount() {
    const { list } = this.state;
    const todosFromLS = checkLocalStorage();
    return list !== todosFromLS ? this.setState({ list: todosFromLS }) : "";
  }

  componentDidUpdate(_, prev) {
    const { list } = this.state;

    if (prev.list !== list) {
      localStorage.setItem("todos", JSON.stringify(list));
    }
  }
  onChangeNameOfTodo(e) {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  }
  onChangeDescOfTodo(e) {
    console.log(e.target.value);
    this.setState({ descriptionOfTodo: e.target.value });
  }
  addTodo = (titleOfTodo, descriptionOfTodo) => {
    console.log(titleOfTodo);
    console.log(descriptionOfTodo);
    return this.setState((prev) => ({
      list: [
        {
          id: Date.now(),
          title: titleOfTodo,
          description: descriptionOfTodo,
          done: false,
          active: true,
          archived: false,
        },
        ...prev.list,
      ],
      name: "",
      descriptionOfTodo: "",
    }));
  };

  //методы для фильтра
  addDesc = (id, description) => {
    this.setState((prev) => ({
      list: prev.list.map((el) => {
        if (el.id === id) {
          return { ...el, description };
        }
        return el;
      }),
    }));
  };
  addArchived = (id) =>
    this.setState((prev) => ({
      list: prev.list.map((el) => {
        if (el.id === id) return { ...el, archived: !el.archived };
        return el;
      }),
    }));

  deleteItem = (id) => {
    this.setState((prev) => ({
      list: prev.list.filter((el) => el.id !== id),
    }));
  };
  changeText = (id, title) =>
    this.setState((prev) => ({
      list: prev.list.map((el) => {
        if (el.id === id) {
          return { ...el, title };
        }
        return el;
      }),
    }));
  statusChange = (id) =>
    this.setState((prev) => ({
      list: prev.list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            done: !el.done,
            active: !el.active,
          };
        }
        return el;
      }),
    }));
  render() {
    const { state } = this;
    const { name, descriptionOfTodo, list } = state;
    return (
      <section className={styles.container}>
        <div className={styles.add}>
          <form action="">
            <input
              value={name}
              onChange={(e) => this.onChangeNameOfTodo(e)}
              type="text"
              placeholder="Введите название...."
            />
            <input
              onChange={(e) => this.onChangeDescOfTodo(e)}
              value={descriptionOfTodo}
              type="text"
              placeholder="Введите описание...."
            />
            <div className={styles.addbtn}>
              <AiOutlineFileAdd
                style={{ cursor: "pointer" }}
                type="submit"
                size={35}
                onClick={() => this.addTodo(name, descriptionOfTodo)}
              />
            </div>
          </form>
        </div>
        <div>
          <Filter
            list={list}
            addDesc={this.addDesc}
            changeText={this.changeText}
            deleteItem={this.deleteItem}
            statusChange={this.statusChange}
            addArchived={this.addArchived}
          />
        </div>
      </section>
    );
  }
}

export default Todos;
