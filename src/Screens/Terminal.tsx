import React, { useEffect, useState } from "react";

import pipboy from "./fall-out.gif";

import styles from "./Terminal.module.scss";

const wordBank = [
  "Abide", "Adobe", "Adept", "Agent", "Aside", "Asset", "Avail", "Basic", "Blade", "Blaze",
  "Blend", "Bloat", "Block", "Blurb", "Bunch", "Candy", "Check", "Child", "Chime", "Claim",
  "Click", "Cliff", "Clove", "Craft", "Crawl", "Crazy", "Creek", "Crisp", "Curly", "Cycle",
  "Daisy", "Death", "Delta", "Disco", "Donor", "Draft", "Dream", "Drive", "Eager", "Easel",
  "Elect", "Elbow", "Email", "Equal", "Error", "Event", "Excel", "Exile", "Fable", "Faith",
  "Fancy", "Fault", "Fiber", "Final", "First", "Flair", "Flame", "Flash", "Fleet", "Fluff",
  "Flush", "Focus", "Folio", "Forge", "Fresh", "Frost", "Funny", "Ghost", "Glaze", "Gloom",
  "Gnome", "Grace", "Grain", "Great", "Grief", "Grove", "Guest", "Happy", "Heart", "Honor",
  "Ideal", "Image", "Index", "Inlay", "Joint", "Jolly", "Jumbo", "Karma", "Knock", "Label",
  "Laser", "Laugh", "Layer", "Legal", "Lemon", "Light", "Limit", "Logic", "Magic", "Major",
  "March", "Media", "Metal", "Misty", "Moral", "Music", "Noble", "Oasis", "Olive", "Panel"
];

const fillers = ["<", ">", "{", "}", "[", "]", "_", ":", ",", "$", "?", "#"];

type MapType = {
  [key: number]: number;
};

const Terminal = () => {
  const [startingAddress, setStartingAddress] = useState(0);
  const [password, setPassword] = useState("");
  const [codeLines, setCodeLines] = useState([] as string[][]);
  const [cursor, setCursor] = useState([0, 0, 1]);
  const [feedback, setFeedback] = useState([] as string[]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const rand = (Math.random() * 21000) + 43690;
    const ind = Math.floor(Math.random() * 100);

    const pass = wordBank[ind];

    let usedValMap: MapType = {};

    let words = Array.from({length: 16}, () => {
      let val = Math.floor(Math.random() * 100);
      while (usedValMap[val]) {
        val =  Math.floor(Math.random() * 100);
      }
      usedValMap[val] = 1;
      return val;
    });
    words.push(ind);

    words = words.sort(() => Math.random() > 0.5 ? 1 : -1).filter(w => !(words.filter(v => v === w).length > 1));

    usedValMap = {};

    let dispersion = Array.from({length: words.length}, () => {
      let val = Math.floor(Math.random() * 32);
      while (usedValMap[val]) {
        val = Math.floor(Math.random() * 32);
      }
      usedValMap[val] = 1;
      return val;
    });

    const lines: string[][] = [];

    Array(32).fill(0).map((v, i) => {
      const containsWord = dispersion.findIndex(d => d === i);
      let line: string[] = Array(12).fill("0");
      if (containsWord !== -1) {
        const pos = Math.floor(Math.random() * 7);
        wordBank[words[containsWord]].split("").map((l, i) =>{
          line[pos + i] = l;
        });
      }

      line = line.map((l) => {
        if (l === "0") {
          return fillers[Math.floor(Math.random() * fillers.length)]
        }
        return l;
      })
      lines.push(line);
    });
   
    setCodeLines(lines);
    setPassword(pass);
    setStartingAddress(rand);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let currPos = [...cursor];
    switch(e.code) {
      case "Enter":
        let line = [...codeLines[currPos[0]]];
        const selectedWord = line.slice(currPos[1], currPos[1] + currPos[2]).join("").toLowerCase();
        let currFeedback = [...feedback];
        currFeedback.push(`>${selectedWord.toUpperCase()}`);
        if (selectedWord === password.toLowerCase()) {
          currFeedback.push(">Entry granted");
          currFeedback.push(">Loading...");

          setTimeout(() => {
            setSuccess(true);
          }, 3000);
        } else {
          let correctCount = 0;
          selectedWord.split("").forEach((l, i) => {
            if (password[i] === l) {
              correctCount ++;
            }
          })
          currFeedback.push(">Entry denied");
          currFeedback.push(`>${correctCount}/5 correct.`)
        }

        line = line.map((c) => {
          if (fillers.findIndex(v => v === c) === -1) {
            return "*";
          };
          return c;
        })

        const newCodeLines = [...codeLines];
        newCodeLines[currPos[0]] = line;

        setCodeLines(newCodeLines);

        setFeedback(currFeedback);

        break;
      case "ArrowRight":
        if (currPos[1] < 11) {
          currPos[1] = currPos[1] + currPos[2];
        } else {
          currPos[1] = 0;
          if (currPos[0] < 16) {
            currPos[0] = currPos[0] + 16;
          } else {
            currPos[0] = currPos[0] - 16;
          }
        }
        break;
      case "ArrowLeft":
        if (currPos[1] > 0) {
          currPos[1] = currPos[1] - 1;
        } else {
          currPos[1] = 11;
          if (currPos[0] > 15) {
            currPos[0] = currPos[0] - 16;
          } else {
            currPos[0] = currPos[0] + 16;
          }
        }
        break;
      case "ArrowUp":
        if (currPos[0] === 0) {
          currPos[0] = 15;
        } else if (currPos[0] === 16) {
          currPos[0] = 31;
        } else {
          currPos[0] = currPos[0] - 1;
        }
        break;
      case "ArrowDown":
        if (currPos[0] === 15) {
          currPos[0] = 0;
        } else if (currPos[0] === 31) {
          currPos[0] = 16;
        } else {
          currPos[0] = currPos[0] + 1;
        }
        break;
      default:
        break;
    }

    currPos[2] = 1;

    if (fillers.findIndex(v => v === codeLines[currPos[0]][currPos[1]]) === -1) {
      // This is a letter
      currPos[2] = 5;
      let start = currPos[1] - 1;
      while (start >= 0 && fillers.findIndex(v => v === codeLines[currPos[0]][start]) === -1) {
        currPos[1] = start;
        start--;
      }
    }

    setCursor(currPos);
  }

  if (success) {
    return (
      <img src={pipboy} />
    );
  }

  return (
    <div className={styles.terminal} onKeyDown={handleKeyPress} tabIndex={0}>
      <div className={styles.encryption}>
        {Array(32).fill(0).map((v, i) => {
          const address = Number((startingAddress + (12 * i)).toFixed(0)).toString(16).toUpperCase();
          return (
            <div className={styles.codeRow} key={address}>
              <span className={styles.address}>{`0x${address}`}</span>
              <span className={styles.data}>{codeLines[i]?.map((l, j) => {
                const selected = cursor[0] === i && (cursor[1] === j || ((cursor[1] + cursor[2]) > j && j > cursor[1]));
                return (
                  <span key={`${i}=${j}`} className={selected ? styles.selectedItem : styles.item}>{l}</span>
                )
              })}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.feedback}>{feedback.map((f, i) => {
        return <div key={i}>{f}</div>;
      })}</div>
    </div>
  )
}

export default Terminal;