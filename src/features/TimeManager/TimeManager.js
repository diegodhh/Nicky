import React, { useMemo, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { getZonesActions } from "./../../app/store";

import { useSelector, useDispatch } from "react-redux";
import TimeButton from "./TimeButton";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMoreRounded";

import { Button, Switch } from "@material-ui/core";
import useTotal from "./hooks/useTotal";
import useBell from "./hooks/useBell";
import { resetZones } from "./../../app/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    border: 0,
    background: theme.paper,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "none",
    padding: `0px ${theme.spacing(2)}px`,
  },
  total: { color: "black" },
}));

function TimeManager() {
  const [bellOn, toggleBell] = useBell();
  const remainingRef = useRef({});
  const dispatch = useDispatch();
  const allActions = getZonesActions();
  const classes = useStyles();

  function toggleTime(zoneName) {
    dispatch(allActions[zoneName].start());
  }
  function onCheckRoutine(zoneName, id) {
    dispatch(allActions[zoneName].toggleRoutine(id));
  }
  function onAddFiveMinutes(zoneName) {
    dispatch(allActions[zoneName].addFiveMinutes());
    dispatch(allActions["Off"].subtractFiveMinutes());
  }
  function onSubtractFiveMinutes(zoneName) {
    dispatch(allActions["Off"].addFiveMinutes());
    dispatch(allActions[zoneName].subtractFiveMinutes());
  }

  function reset() {
    dispatch(resetZones());
  }
  const zones = useSelector((state) => state.zones);
  const arrayOfZones = useMemo(
    function () {
      return zones && Object.keys(zones).map((zone) => zones[zone]);
    },
    [zones]
  );

  const stamps = useMemo(
    () =>
      Object.keys(zones)
        .flatMap((zoneName) =>
          zones[zoneName].stamps.map((stamp) => ({
            ...stamp,
            name: zoneName,
          }))
        )
        .sort(function (stamp1, stamp2) {
          return stamp1.time - stamp2.time;
        }),
    [zones]
  );
  if (!stamps.length) {
    toggleTime("Off");
  }
  const [total] = useTotal(stamps);

  return (
    <>
      <div className={classes.root}>
        {arrayOfZones?.map(({ name: zoneName, type }) => (
          <TimeButton
            toggleTime={toggleTime}
            key={zoneName}
            zoneName={zoneName}
            stamps={stamps}
            reminders={zones[zoneName]?.reminders}
            routines={zones[zoneName]?.routines}
            addedTime={zones[zoneName]?.addedTime}
            budget={zones[zoneName]?.budget}
            onCheckRoutine={onCheckRoutine}
            onAddFiveMinutes={onAddFiveMinutes}
            onSubtractFiveMinutes={onSubtractFiveMinutes}
            remainingRef={remainingRef}
          />
        ))}

        <div className={classes.total}>{formatDate(total)}</div>
        <div>
          <Button onClick={reset}>CLEAN UP</Button>
        </div>
        <div>
          <span className={classes.total}>Turn on bell</span>
          <Switch checked={bellOn} onChange={toggleBell} />
        </div>
      </div>
    </>
  );
}
TimeManager.propTypes = {};

export default TimeManager;

const formatDate = function (e) {
  var sec_num = parseInt(e, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};
