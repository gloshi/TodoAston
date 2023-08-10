import { Component } from "react";
import styles from "../../styles/Card.module.scss";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import Modal from "../Modal";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  modalOpen = () => {
    this.setState((prev) => ({
      open: !prev.open,
    }));
  };

  render() {
    const { item, addDesc, changeText, deleteItem, statusChange, addArchived } =
      this.props;
    return (
      <div
        className={item.archived ? styles.containerArchived : styles.container}
      >
        <BsArchive
          className={styles.btn}
          onClick={() => addArchived(item.id)}
          size={35}
        />
        <MdOutlineDone
          className={styles.btn}
          onClick={() => statusChange(item.id)}
          size={35}
        />
        <div className={styles.text}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <AiOutlineEdit
          onClick={this.modalOpen}
          className={styles.btn}
          size={35}
        />
        <AiOutlineDelete
          className={styles.btn}
          onClick={() => deleteItem(item.id)}
          size={35}
        />
        {this.state.open && (
          <Modal
            open={this.state.open}
            item={item}
            addDesc={addDesc}
            changeText={changeText}
            modalOpen={this.modalOpen}
          />
        )}
      </div>
    );
  }
}
export default Card;
