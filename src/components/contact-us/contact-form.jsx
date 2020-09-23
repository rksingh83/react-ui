import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SendFeedBack } from "../../service/common";
import { fas } from "@fortawesome/free-solid-svg-icons";
const ContactForm = () => {
  const [feedback, setFeedBack] = useState("");
  const [name, setName] = useState("");
  const [isError, setError] = useState({ name: false, feedback: false });
  const sendFeedBackHandler = async () => {
    if (name == "" || feedback == "") {
      setError({
        name: name == "" ? true : false,
        feedback: feedback == "" ? true : false,
      });
      return;
    }
    const response = await SendFeedBack(feedback, name);
    if (response) alert("Feedback sent successfully");
    setFeedBack("");
    setName("");
    setError({ name: false, feedback: false });
  };
  return (
    <div className="card card-body help-form border-success">
      <TextField
        id="outlined-basic"
        label="Feedback"
        fullWidth
        name="currentPassword"
        variant="outlined"
        name="currentPassword"
        size="small"
        required
        value={feedback}
        onChange={(e) => setFeedBack(e.target.value)}
        error={isError.feedback}
        // helperText={isError.message}
      />
      <TextField
        value={name}
        id="outlined-basic"
        label="Your Name"
        name="currentPassword"
        variant="outlined"
        name="currentPassword"
        size="small"
        className="mt-3"
        fullWidth
        required
        error={isError.name}
        onChange={(e) => setName(e.target.value)}
        // error={isError.error}
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
