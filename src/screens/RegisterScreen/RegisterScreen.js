import MediaQuery, { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";
import styles from "./RegisterScreen.module.css";

export default function RegisterScreen() {
  const isSmallerScreen = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <div>
      <Header register></Header>
      <section className={`row ${styles.main_wrapper}`}>
        <div
          className={`col-md-6 ${styles.info_box}`}
          style={{
            backgroundImage: "url(/images/man_with_gun.jpeg)",
          }}
        ></div>
        <div
          className={`col-md-6 ${styles.login_box}`}
          style={
            isSmallerScreen
              ? {
                  backgroundImage: "url(/images/man_with_gun.jpeg)",
                }
              : {}
          }
        >
          <h1 className={styles.title}>Register</h1>
          <form action="" className={styles.form}>
            <div>
              <input
                className={styles.input}
                placeholder="Enter name"
                type="text"
                name=""
                id=""
                rows="5"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                placeholder="Enter email"
                type="text"
                name=""
                id=""
                rows="5"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                placeholder="Enter password"
                type="password"
                name=""
                id=""
                rows="5"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                placeholder="Confirm password"
                type="password"
                name=""
                id=""
                rows="5"
              ></input>
            </div>
            <div>
              <button className={styles.submit_button} type="submit">
                Register
              </button>
            </div>
            <p className="mt-1">
              Already have an account?{" "}
              <Link className={`border_bottom ${styles.link}`} to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
      <MediaQuery maxWidth={800}>
        <BottomNav></BottomNav>
      </MediaQuery>
    </div>
  );
}
