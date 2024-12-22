import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();
  const [showModel, setShowModel] = useState(false);
  const handleModel = () => {
    setShowModel(true);
    setTimeout(() => {
      setShowModel(false);
    }, 5000);
  };
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz1aFPme2aFBO6YmbBe44beqcsu3RHcez3kC2-ThnTMuux3sOLEkzghX0lsceAWPr6nrg/exec";
  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    // Send email using emailjs
    emailjs
      .sendForm(
        "service_umc0i7m",
        "template_chw7nay",
        form.current,
        "rXd5LIc5FG1rHftf8"
      )
      .then((result) => {
        console.log(result.text);
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.log(error.text);
      });

    form.current.reset();
    // Send form data to Google Apps Script endpoint
    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => {
        console.log("Form data sent successfully");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error sending form data:", error.message);
      });

    // Model thing
    handleModel();
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="section-1">
          <h3>Get in touch</h3>
        </div>
        <div className="section-2">
          <form ref={form} onSubmit={sendEmail}>
            <div class="inputbox">
              <label for="">Full name:</label>
              <br />
              <input
                name="name"
                placeholder="Full name"
                id="name"
                type="name"
                required
              />
            </div>
            <div class="inputbox">
              <label for="">Email:</label>
              <br />
              <input
                name="email"
                id="email"
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div class="inputbox">
              <label for="">Subject:</label>
              <br />
              <input
                name="subject"
                placeholder="Subject"
                id="subject"
                type="subject"
                required
              />
            </div>
            <div class="inputbox">
              <label for="">Message:</label>
              <br />
              <textarea
                name="message"
                placeholder="Message"
                id="message"
                type="message"
                required
              />
            </div>
            <div class="inputbox check">
              <label for="">Add me to the email list:</label>
              <input type="checkbox" name="checkbox" id="checkbox" />
            </div>
            <input type="submit" value="Send" />
          </form>
          <div
            style={showModel ? { display: "block" } : { display: "none" }}
            className="model"
          >
            <h1>Email Sent</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
