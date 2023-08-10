import { Component } from "react";
import { filteringTodos } from "./filter";
import Card from "../Card";

import styles from "../../styles/Filter.module.scss";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: [],
      filter: "All",
      search: "",
    };
    this.debounceLog = this.debounce(this.searchTodos, 500);
  }
  componentDidUpdate(prevProps, prevState) {
    const { list } = this.props;
    const { filter, search } = this.state;

    if (filter !== prevState.filter) {
      this.setState({
        newList: filteringTodos(list, filter),
        search: "",
      });
    }
    if (list !== prevProps.list) {
      this.setState({ newList: filteringTodos(list, filter) });
    }

    if (search !== prevState.search) {
      this.debounceLog();
    }
  }
  searchTodos() {
    const { list } = this.props;
    const { filter, search } = this.state;
    const filtered = filteringTodos(list, filter);
    const found = filtered.filter((el) => el.title.includes(search));
    this.setState({ newList: found });
  }
  debounce(func, timeout = 400) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  searchItem(e) {
    this.setState({ search: e.target.value });
  }

  tabsHandler(e) {
    this.setState({ filter: e.target.textContent });
  }
  render() {
    const { addDesc, changeText, deleteItem, statusChange, addArchived } =
      this.props;
    const { search, newList } = this.state;
    return (
      <section className={styles.container}>
        <div className={styles.searchBox}>
          <input
            type="text"
            value={search}
            placeholder="поиск..."
            onChange={(e) => this.searchItem(e)}
          />
        </div>
        <div className={styles.btns}>
          <button value="All" onClick={(e) => this.tabsHandler(e)}>
            All
          </button>
          <button value="Active" onClick={(e) => this.tabsHandler(e)}>
            Active
          </button>
          <button value="Completed" onClick={(e) => this.tabsHandler(e)}>
            Completed
          </button>
          <button value="Archive" onClick={(e) => this.tabsHandler(e)}>
            Archive
          </button>
        </div>
        <div className={styles.wrap}>
          {newList.length > 0 ? (
            newList.map((item) => (
              <Card
                item={item}
                key={item.id}
                props={this.props}
                addDesc={addDesc}
                changeText={changeText}
                deleteItem={deleteItem}
                statusChange={statusChange}
                addArchived={addArchived}
              />
            ))
          ) : (
            <div className={styles.zero}>Нет задач</div>
          )}
        </div>
      </section>
    );
  }
}
export default Filter;
