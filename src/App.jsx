import React, { useState } from "react";
import { Button, Switch, TextField, Typography } from "@mui/material";

import styles from "./App.module.scss";

const App = () => {
  const [tempUrl, setTempUrl] = useState("");
  const [tempIsImage, setTempIsImage] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [url, setUrl] = useState(
    "https://imgs.xkcd.com/comics/eclipse_path_maps.png"
  );

  const handleSubmit = () => {
    setUrl(tempUrl);
    setIsImage(tempIsImage);
  };
  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Typography>NOT ERICS BOARD</Typography>
      </div>
      {isImage ? (
        <img width="90%" src={url} alt="kyle what are you doing?" />
      ) : (
        <iframe title="meme" src={url} height="90%" width="90%" />
      )}
      <div className={styles.inputMeme}>
        <TextField
          label="URL"
          variant="outlined"
          value={tempUrl}
          onChange={(e) => setTempUrl(e.target.value)}
        />
        <Switch
          label="Image"
          value={tempIsImage}
          onChange={() => setTempIsImage(!tempIsImage)}
        />
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default App;
