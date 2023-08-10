import { Component } from "react";
import styles from "../../styles/Modal.module.scss";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.item.title,
      description: props.item.description,
    };
  }
  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  addInfoHandler = (e) => {
    const { item, addDesc, modalOpen, changeText } = this.props;
    const { title, description } = this.state;
    addDesc(item.id, description);
    changeText(item.id, title);
    modalOpen();
  };

  render() {
    const { item, open, modalOpen } = this.props;
    const { title, description } = this.state;
    return (
      <div className={styles.container}>
        <button onClick={modalOpen}>Закрыть окно</button>
        <form className={styles.form} action="">
          <input
            type="text"
            onChange={(e) => this.onChangeTitle(e)}
            name="title"
            value={title}
          />
          <input
            type="text"
            onChange={(e) => this.onChangeDesc(e)}
            name="description"
            value={description}
          />
          <button onClick={(e) => this.addInfoHandler(e)}>
            Сохранить изменения
          </button>
        </form>
      </div>
    );
  }
}
export default Modal;
