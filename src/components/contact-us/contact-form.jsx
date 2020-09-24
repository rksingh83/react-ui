import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SendFeedBack } from "../../service/common";
import { fas } from "@fortawesome/free-solid-svg-icons";
const ContactForm = () => {
  const [feedback, setFeedBack] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');
  const [isError, setError] = useState({ name: false, feedback: false });

  const sendFeedBackHandler = async () => {
    if (name == "" || feedback == "") {
      setError({
        name: name == "" ? true : false,
        feedback: feedback == "" ? true : false,
      });
      return;
    }
    const response = await SendFeedBack(feedback, name, email, phone);
    if (response) alert("Feedback sent successfully");
    setFeedBack("");
    setName("");
    setPhone('');
    setEmail('')
    setError({ name: false, feedback: false });
  };
  return (
    <div className="card card-body help-form border-success">
      <textarea
        style={{ resize: "none" }}
        value={feedback}
        onChange={(e) => setFeedBack(e.target.value)}
        class={`form-control ${isError.feedback ? "is-invalid" : ""}`}
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
      <TextField
   
        id="outlined-basic"
        label="Your Name"
        variant="outlined"
        size="small"
        className="mt-3"
        fullWidth
        required
        value ={name}
        error={isError.name}
        onChange={(e) => setName(e.target.value)}
        // error={isError.error}
        // helperText={isError.message}
      />
      <TextField
        className="mt-3"
        id="outlined-basic"
        label="Email"
        fullWidth
        variant="outlined"
        size="small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // helperText={isError.message}
      />
      <TextField
        className="mt-3"
        id="outlined-basic"
        label="Phone"
        fullWidth
        variant="outlined"
        size="small"
        type ="number"
        value={phone}
        onChange={(e) =>setPhone(e.target.value)}
        // helperText={isError.message}
      />

      <Button
        onClick={sendFeedBackHandler}
        variant="contained"
        color="secondary"
        mt={3}
        className="mt-3"
        size="small"
        fullWidth
      >
        Send
      </Button>
    </div>
  );
};
export default ContactForm;
