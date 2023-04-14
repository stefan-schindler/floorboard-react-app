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
  const [remainingPenaltyTimeA, setRemainingPenaltyTimeA] = useState(
    new Date(0, 0, 0, 0, 0, 0, 0)
  );
  const [remainingPenaltyTimeB, setRemainingPenaltyTimeB] = useState(
    new Date(0, 0, 0, 0, 0, 0, 0)
  );

  

  const [remainingSecondsWhenUnpaused, setRemainingSecondsWhenUnpaused] =
    useState(new Date());
  const [unpausedAtTime, setUnpausedAtTime] = useState(new Date());

  const [remainingPenaltyASecondsWhenUnpaused, setRemainingPenaltyASecondsWhenUnpaused] =
    useState(new Date());
  const [unpausedPenaltyAAtTime, setUnpausedPenaltyAAtTime] = useState(new Date());

  const [remainingPenaltyBSecondsWhenUnpaused, setRemainingPenaltyBSecondsWhenUnpaused] =
    useState(new Date());
  const [unpausedPenaltyBAtTime, setUnpausedPenaltyBAtTime] = useState(new Date());

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [partName, setPartName] = useState("");

  // countdown
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

  //penalty A countdown
  useEffect(() => {
    let penaltyACountdownInterval = accurateInterval(() => {
      if (!paused) {
        let penaltyADiff = new Date().valueOf() - unpausedPenaltyAAtTime.valueOf();
        let newPenaltyADate = new Date(remainingPenaltyASecondsWhenUnpaused.getTime());
        newPenaltyADate.setSeconds(newPenaltyADate.getSeconds() - penaltyADiff / 1000);

        if (newPenaltyADate.getHours() != remainingPenaltyASecondsWhenUnpaused.getHours())
          setRemainingPenaltyTimeA(new Date(0));
        else setRemainingPenaltyTimeA(newPenaltyADate);
      } else {
        setRemainingPenaltyASecondsWhenUnpaused(remainingPenaltyTimeA);
        setUnpausedPenaltyAAtTime(new Date());
      }
    }, 500);
    return () => penaltyACountdownInterval.clear();
  }, [paused, remainingPenaltyTimeA, setRemainingPenaltyTimeA]);

  //penalty B countdown
  useEffect(() => {
    let penaltyBCountdownInterval = accurateInterval(() => {
      if (!paused) {
        let penaltyBDiff = new Date().valueOf() - unpausedPenaltyBAtTime.valueOf();
        let newPenaltyBDate = new Date(remainingPenaltyBSecondsWhenUnpaused.getTime());
        newPenaltyBDate.setSeconds(newPenaltyBDate.getSeconds() - penaltyBDiff / 1000);

        if (newPenaltyBDate.getHours() != remainingPenaltyBSecondsWhenUnpaused.getHours())
          setRemainingPenaltyTimeB(new Date(0));
        else setRemainingPenaltyTimeB(newPenaltyBDate);
      } else {
        setRemainingPenaltyBSecondsWhenUnpaused(remainingPenaltyTimeB);
        setUnpausedPenaltyBAtTime(new Date());
      }
    }, 500);
    return () => penaltyBCountdownInterval.clear();
  }, [paused, remainingPenaltyTimeB, setRemainingPenaltyTimeB]);

  useEffect(() => {
    localStorage.setItem(
      "remainingTime",
      Utils.dateToSeconds(remainingSeconds || new Date()).toString()
    );
  }, [remainingSeconds]);

  useEffect(() => {
    localStorage.setItem(
      "remainingPenaltyTimeA",
      Utils.dateToSeconds(remainingPenaltyTimeA || new Date()).toString()
    );
  }, [remainingSeconds]);

  useEffect(() => {
    localStorage.setItem(
      "remainingPenaltyTimeB",
      Utils.dateToSeconds(remainingPenaltyTimeB || new Date()).toString()
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

        <div className="scoreboardRow">
          {/* <TextField
            id="outlined-basic"
            label="Trestný čas A"
            variant="outlined"
            type="number"
            onChange={(e) => localStorage.setItem("remainingPenaltyTimeA", e.target.value)}
          /> */}
          <TimePicker
            disabled={!paused}
            ampmInClock
            views={["minutes", "seconds"]}
            inputFormat="mm:ss"
            mask="__:__"
            label="Zostávajúci trestný čas A"
            value={remainingPenaltyTimeA}
            onChange={(newValue) => {
              setRemainingPenaltyTimeA(newValue || new Date());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <div className="separator"></div>
          {/* <TextField
            id="outlined-basic"
            label="Trestný čas B"
            type="number"
            variant="outlined"
            onChange={(newValue) => {
              setRemainingPenaltyTimeA(newValue || new Date());
              localStorage.setItem("remainingPenaltyTimeB", newValue.target.value)}}
          /> */}
          <TimePicker
            disabled={!paused}
            ampmInClock
            views={["minutes", "seconds"]}
            inputFormat="mm:ss"
            mask="__:__"
            label="Zostávajúci trestný čas B"
            value={remainingPenaltyTimeB}
            onChange={(newValue) => {
              setRemainingPenaltyTimeB(newValue || new Date());
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>

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
