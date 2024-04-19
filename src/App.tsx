import React, { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

import { generateClient } from "aws-amplify/data";

import styles from "./App.module.scss";

const { REACT_APP_PASS } = import.meta.env;

const RESPONSES = [
  "Nope",
  "Nice Try",
  "Please Play Again",
  "Not Even Close",
  "Just Ask Eric",
  "You're Never Going to get it",
  "Theo is Embarrased",
  "Give Up",
  "Kyle is that you?",
  "Naaahhhhh",
  "So Close",
  "Yep that's it, Sike!",
  "Try Password",
  "Yawn",
];

const CORRECT = "I didn't think you would actually get it";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client: any = generateClient();

  const [tempUrl, setTempUrl] = useState("");
  const [tempIsImage, setTempIsImage] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [url, setUrl] = useState("https://imgs.xkcd.com/");
  const [pass, setPass] = useState("");
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState("");

  const loadData = async () => {
    const { data } = await client.models.Links.list();

    setUrl(data[0].url);
    setIsImage(data[0].isImage);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    setOpen(false);
    if (pass !== REACT_APP_PASS) {
      setPass("");
      const giveHint = Math.floor(Math.random() * 100) === 34;

      if (giveHint) {
        setSnack("Hint: Try debugging");
      } else {
        const prompt = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
        setSnack(prompt);
      }
      return;
    }
    setSnack(CORRECT);
    setUrl(tempUrl);
    setIsImage(tempIsImage);

    setTempUrl("");
    setIsImage(false);
    setPass("");

    await client.models.Links.create({
      url: tempUrl,
      isImage: tempIsImage,
      date: Date.now().toString(),
    });
  };
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <span>NOT ERIC&apos;S BOARD</span>
      </div>
      {isImage ? (
        <img width="90%" src={url} alt="kyle what are you doing?" />
      ) : (
        <iframe title="meme" src={url} height="90%" width="90%" />
      )}
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{ marginTop: "10px" }}
      >
        Update
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.inputMeme}>
          <TextField
            label="URL"
            variant="outlined"
            autoComplete="url"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <FormControlLabel
            label="Is Image"
            labelPlacement="top"
            control={
              <Switch
                value={tempIsImage}
                onChange={() => setTempIsImage(!tempIsImage)}
              />
            }
          />
          <Button onClick={handleSubmit} variant="outlined">
            Submit
          </Button>
        </div>
      </Modal>
      <Snackbar
        open={!!snack}
        autoHideDuration={6000}
        onClose={() => setSnack("")}
      >
        <Alert
          onClose={() => setSnack("")}
          severity={snack === CORRECT ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
