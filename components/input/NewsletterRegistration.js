import { useRef, useContext } from "react";
import classes from "./NewsletterRegistration.module.css";
import NotificationContext from "../../store/NotificationContext";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registring for newsletter..",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfuly Registered for newsletter.",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong.",
          status: "error",
        });
      });
    document.getElementById("newsletter-form").reset();
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} id="newsletter-form">
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
