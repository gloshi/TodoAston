import React, { createContext } from "react";
import styles from "./styles/App.module.scss";
import { ThemesContext } from "./components/ThemeContext";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import Todos from "./components/Todos";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }

  toggleThemeHandler = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    const buttonThemes = {
      light: {
        color: "rgb(251, 255, 0)",
        background: "#aac3e9",
      },
      dark: {
        color: "rgb(0, 194, 0)",
        background: "#6441A5",
      },
    };
    const { theme } = this.state;
    return (
      <ThemesContext.Provider value={buttonThemes[theme]}>
        <div
          className={styles.container}
          style={{
            backgroundColor: buttonThemes[theme].background,
            color: buttonThemes[theme].color,
          }}
        >
          <header
            style={{
              backgroundColor: buttonThemes[theme].background,
              color: buttonThemes[theme].color,
            }}
          >
            <h3>TODO LIST</h3>
            <div className={styles.btn}>
              <button onClick={() => this.toggleThemeHandler()}>
                {theme === "light" ? (
                  <div style={{ color: "rgb(0, 194, 0)" }}>
                    <CiDark size={55} />
                  </div>
                ) : (
                  <div style={{ color: "rgb(245, 173, 39)" }}>
                    <MdOutlineLightMode size={55} />
                  </div>
                )}
              </button>
            </div>
          </header>
          <main className={styles.box}>
            <div>
              <Todos />
            </div>
          </main>
        </div>
      </ThemesContext.Provider>
    );
  }
}
export default App;
