import { useEffect, useState } from "react";
import Utils from "../Utils";

function ScoreBoard() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [partName, setPartName] = useState("");

  const [remainingTime, setRemainingTime] = useState(0);
  const [remainingPenaltyTimeA, setRemainingPenaltyTimeA] = useState(0);
  const [remainingPenaltyTimeB, setRemainingPenaltyTimeB] = useState(0);

  const allowedKeys = [
    "scoreA",
    "scoreB",
    "teamA",
    "teamB",
    "partName",
    "remainingTime",
    "remainingPenaltyTimeA",
    "remainingPenaltyTimeB",
  ];

  const onStorageUpdate = (e: { key: any; newValue: any }) => {
    console.log("newUpdate " + e.key.toString());
    const { key, newValue } = e;
    if (key === "scoreA") setScoreA(parseInt(newValue));
    else if (key === "scoreB") setScoreB(parseInt(newValue));
    else if (key === "teamA") setTeamA(newValue);
    else if (key === "teamB") setTeamB(newValue);
    else if (key === "partName") setPartName(newValue);
    else if (key === "remainingTime") setRemainingTime(parseInt(newValue));
    else if (key === "remainingPenaltyTimeA")
      setRemainingPenaltyTimeA(parseInt(newValue));
    else if (key === "remainingPenaltyTimeB")
      setRemainingPenaltyTimeB(parseInt(newValue));
  };

  useEffect(() => {
    // Initializiation of states from localStorage
    Object.keys(localStorage).forEach(function (key) {
      if (allowedKeys.includes(key)) {
        onStorageUpdate({ key: key, newValue: localStorage.getItem(key) });
      }
    });

    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  return (
    <div>
      <div className="scoreboardRow">
        <div className="left">{teamA}</div>
        <div className="separator">vs</div>
        <div className="right">{teamB}</div>
      </div>

      <div className="scoreboardRow score">
        <div className="left">{scoreA}</div>
        <div className="separator">:</div>
        <div className="right">{scoreB}</div>
      </div>

      <div className="scoreboardRow part">
        <div className="">{partName}</div>
      </div>

      <div className="scoreboardRow timer">
        <div className="spacer"></div>
        {/* <div className="left">{Utils.formatSeconds(remainingPenaltyTimeA)}</div> */}
        <div className="center">{Utils.formatSeconds(remainingTime)}</div>
        {/* <div className="right">
          {Utils.formatSeconds(remainingPenaltyTimeB)}
        </div> */}
        <div className="spacer"></div>
      </div>
    </div>
  );
}

export default ScoreBoard;
