import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Utils from "../Utils";
var accurateInterval = require("accurate-interval");

function AdminMatch() {
  const [paused, setPaused] = useState(true);
  const [remainingSeconds, setRemainingSeconds] = useState(
    new Date(0, 0, 0, 0, 10, 0, 0)
  );

  const [remainingSecondsWhenUnpaused, setRemainingSecondsWhenUnpaused] =
    useState(new Date());
  const [unpausedAtTime, setUnpausedAtTime] = useState(new Date());

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [partName, setPartName] = useState("");

  useEffect(() => {
    let countdownInterval = accurateInterval(() => {
      if (!paused) {
        let diff = new Date().valueOf() - unpausedAtTime.valueOf();
        let newDate = new Date(remainingSecondsWhenUnpaused.getTime());
        newDate.setSeconds(newDate.getSeconds() - diff / 1000);

        if (newDate.getHours() != remainingSecondsWhenUnpaused.getHours())
          setRemainingSeconds(new Date(0));
        else setRemainingSeconds(newDate);
      } else {
        setRemainingSecondsWhenUnpaused(remainingSeconds);
        setUnpausedAtTime(new Date());
      }
    }, 500);
    return () => countdownInterval.clear();
  }, [paused, remainingSeconds, setRemainingSeconds]);

  useEffect(() => {
    localStorage.setItem(
      "remainingTime",
      Utils.dateToSeconds(remainingSeconds || new Date()).toString()
    );
  }, [remainingSeconds]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ transform: "scale(1.5)", transformOrigin: "top center" }}>
        <div className="scoreboardRow">
          <TextField
            id="outlined-basic"
            label="Tím A"
            variant="outlined"
            onChange={(e) => localStorage.setItem("teamA", e.target.value)}
          />
          <div className="separator">vs</div>
          <TextField
            id="outlined-basic"
            label="Tím B"
            variant="outlined"
            onChange={(e) => localStorage.setItem("teamB", e.target.value)}
          />
        </div>

        <div className="scoreboardRow">
          <TextField
            id="outlined-basic"
            label="Skóre A"
            value={scoreA}
            variant="outlined"
            type="number"
            onChange={(e) => {
              setScoreA(parseInt(e.target.value));
              localStorage.setItem("scoreA", e.target.value);
            }}
          />
          <div className="separator"></div>
          <TextField
            value={scoreB}
            id="outlined-basic"
            label="Skóre B"
            type="number"
            variant="outlined"
            onChange={(e) => {
              setScoreB(parseInt(e.target.value));
              localStorage.setItem("scoreB", e.target.value);
            }}
          />
        </div>

        {/* <div className="scoreboardRow">
          <TextField
            id="outlined-basic"
            label="Trestný čas A"
            variant="outlined"
            type="number"
            onChange={(e) => localStorage.setItem("scoreA", e.target.value)}
          />
          <div className="separator"></div>
          <TextField
            id="outlined-basic"
            label="Trestný čas B"
            type="number"
            variant="outlined"
            onChange={(e) => localStorage.setItem("scoreB", e.target.value)}
          />
        </div> */}

        <Stack direction="row" justifyContent="center" spacing={2}>
          <TextField
            id="outlined-basic"
            label="Časť hry (1. polčas, ...)"
            value={partName}
            variant="outlined"
            onChange={(e) => {
              setPartName(e.target.value);
              localStorage.setItem("partName", e.target.value);
            }}
          />

          <TimePicker
            disabled={!paused}
            ampmInClock
            views={["minutes", "seconds"]}
            inputFormat="mm:ss"
            mask="__:__"
            label="Zostávajúci čas"
            value={remainingSeconds}
            onChange={(newValue) => {
              setRemainingSeconds(newValue || new Date());
            }}
            renderInput={(params) => <TextField {...params} />}
          />

          <ToggleButton
            value="check"
            color="success"
            selected={!paused}
            onChange={() => {
              setPaused(!paused);
            }}
          >
            {paused && <PlayArrowIcon />}
            {!paused && <PauseIcon />}
          </ToggleButton>
        </Stack>
      </div>
    </LocalizationProvider>
  );
}

export default AdminMatch;
