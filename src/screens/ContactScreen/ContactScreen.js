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
        style={{
          backgroundImage: "url(/images/masked_player_gaming_green.jpeg)",
        }}
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
        <div className={`row align-center container ${styles.wrapper}`}>
          <div className="col-md">
            <iframe
              title="location"
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.856189861609!2d36.8161384503457!3d-1.2583074990777114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171b74f9ba57%3A0x11a8c077b37bd655!2sDiamond%20Plaza%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1628170305691!5m2!1sen!2ske"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="col-md">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
            ratione illo officiis omnis excepturi facere perspiciatis numquam
            vero maiores harum accusantium, doloremque quidem adipisci vel
            magnam inventore eos sunt? Eligendi.
          </div>
        </div>
      </section>
      <section></section>

      <MediaQuery maxWidth={800}>
        <BottomNav contact></BottomNav>
      </MediaQuery>
    </div>
  );
}
