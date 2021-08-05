import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/Header/Header";
import Socials from "../../components/Socials/Socials";
import styles from "./ContactScreen.module.css";

export default function ContactScreen() {
  return (
    <div>
      <Header contact></Header>
      <section
        className={styles.hero_section}
        style={{ backgroundImage: "url(/images/masked_player_gaming_green.jpeg)" }}
      >
        <h1 className={styles.heading}>Contact us</h1>
      </section>
      <section
        className={styles.main_section}
        style={{ backgroundImage: "url(/images/mouse_dark_green.jpeg)" }}
      >
        <div className={`row container ${styles.wrapper}`}>
          <div className="col-md">
            <p className={styles.contact_info}>
              Contact us about <span className="green">press matters, </span>
              potential <span className="green">sponsorships, </span>
              and
              <span className="green"> membership </span>inquiries.
            </p>
            <Link className="link border_bottom" to="/about">
              Learn more about us
            </Link>
            <div className={styles.socials}>
              <Socials></Socials>
            </div>
          </div>
          <div className="col-md">
            <form action="" className={styles.form}>
              <div>
                <textarea
                  className={styles.textarea}
                  placeholder="Write Message"
                  name=""
                  id=""
                  rows="5"
                ></textarea>
              </div>
              <div className={`row_f space-between ${styles.inputs_wrapper}`}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Your Name"
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <button className={styles.submit_button} type="submit">
                  Submit message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <MediaQuery maxWidth={800}>
        <BottomNav contact></BottomNav>
      </MediaQuery>
    </div>
  );
}
