import React from "react";
import ptypes from "prop-types";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

import { makeStyles } from "@material-ui/core/styles";

import useTime from "./hooks/useTime";
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

const cs = require("classnames");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: 0,
    background: theme.paper,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "none",
    padding: `0px ${theme.spacing(2)}px`,
  },
  accordionSummary: {
    margin: `${theme.spacing(0.5)}px 0px`,
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: theme.spacing(2),
  },
  accordionSummaryContent: {
    display: "flex",
    alignItems: "center",
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
    width: "100%",

    border: 0,

    color: theme.palette.primary.main,
    padding: "30px",
  },
  timeButton: {
    margin: `${theme.spacing(1)}px 0px`,
    display: "flex",

    width: "100%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 10,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "30px",
  },
  timeButtonOff: {
    background: `linear-gradient(45deg, ${theme.palette.liveBlue.main} 30%, #FF8E53 90%)`,
  },
  timeButtonSelected: {
    background: `linear-gradient(45deg, ${theme.palette.liveBlue.main} 30%, #FF8E53 90%) !important`,
    fontWeight: 800,
  },
  timeButtonFinished: {
    background: `linear-gradient(45deg, ${theme.palette.liveBlue.main} 30%, ${theme.palette.lightGreen.main} 90%) !important`,
    fontWeight: 800,
  },
  buttonContent: {
    minWidth: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  ButtonContent__time: {
    height: theme.spacing(4),
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
    background: `linear-gradient(45deg,transparent 10%, ${theme.palette.darkBlue.main} 30%, transparent 90%)`,
    color: `white`,
    fontWeight: 800,
    fontSize: "16px",
  },
  addButton: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
}));

function TimeButton({
  toggleTime,
  zoneName,
  type,
  stamps,
  reminders,
  routines,
  onCheckRoutine,
  addedTime,
  onAddFiveMinutes,
  onSubtractFiveMinutes,
  budget,
  remainingRef,
}) {
  function handleChangeRoutine(event) {
    event.stopPropagation();

    onCheckRoutine(zoneName, event.target.name);
  }
  function handleAddFiveMinutes(event) {
    event.stopPropagation();
    onAddFiveMinutes(zoneName);
  }
  function handleSubtractFiveMinutes(event) {
    event.stopPropagation();
    onSubtractFiveMinutes(zoneName);
  }
  const [
    total,
    activeZone,
    lastInterval,
    restBudget,
    worstHour,
    bestHour,
  ] = useTime(zoneName, stamps, addedTime, budget, remainingRef);
  // const disableMe = useMemo(() => zoneName === activeZone, [
  //   activeZone,
  //   zoneName,
  // ]);
  const youAreDone = restBudget < 0;

  const classes = useStyles();
  const handleToggle = (e) => {
    if (zoneName === activeZone) {
      e.stopPropagation();
    }
    toggleTime(zoneName);
  };
  return (
    <Accordion key={zoneName} classes={{ root: classes.root }}>
      <AccordionSummary
        onClick={handleToggle}
        classes={{
          content: classes.accordionSummaryContent,
          root: cs({
            [classes.accordionSummary]: true,
            [classes.timeButtonOff]: type === "off",
            [classes.timeButtonSelected]: zoneName === activeZone,
            [classes.timeButtonFinished]: youAreDone,
          }),
        }}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <IconButton
          onClick={handleSubtractFiveMinutes}
          classes={{ root: classes.addButton }}
        >
          <RemoveRoundedIcon />
        </IconButton>
        <Button
          classes={{
            root: cs({
              [classes.timeButton]: true,
              [classes.timeButtonOff]: type === "off",
              [classes.timeButtonSelected]: zoneName === activeZone,
              [classes.timeButtonFinished]: youAreDone,
            }),
          }}
          variant="contained"
        >
          <div className={classes.buttonContent}>
            <div> {zoneName}</div>
            {zoneName !== "Off" && (
              <div className={classes.ButtonContent__time}>
                {formatDate(total)}
              </div>
            )}
          </div>
        </Button>
        <IconButton classes={{ root: classes.addButton }}>
          <AddRoundedIcon onClick={handleAddFiveMinutes} />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: cs({
            [classes.accordionDetails]: true,
            [classes.timeButtonOff]: type === "off",
          }),
        }}
      >
        {lastInterval !== 0 && (
          <Typography>{`Last interval: ${formatDate(
            lastInterval
          )}`}</Typography>
        )}
        {addedTime !== 0 && (
          <Typography>{`Added Time: ${formatDate(addedTime)}`}</Typography>
        )}
        {restBudget !== 0 && !youAreDone && (
          <Typography>{`Remaining time: ${formatDate(restBudget)}`}</Typography>
        )}
        {bestHour !== 0 && !youAreDone && (
          <Typography>{`Best hour finishing: ${bestHour}`}</Typography>
        )}
        {worstHour !== 0 && !youAreDone && (
          <Typography>{`Worst hour finishing: ${worstHour}`}</Typography>
        )}

        {!!routines?.length && (
          <>
            <Typography>routine:</Typography>
            <div>
              {routines &&
                routines.map((routine) => (
                  <FormControlLabel
                    key={routine._id}
                    control={
                      <Checkbox
                        key={routine._id}
                        checked={routine.finished}
                        onChange={handleChangeRoutine}
                        name={routine._id}
                        color="primary"
                      />
                    }
                    label={routine.name}
                  />
                ))}
            </div>
          </>
        )}
        {!!reminders?.length && (
          <>
            <Typography>Reminders:</Typography>
            <div>
              {reminders &&
                reminders.map((routine) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={routine.finished}
                        // onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={routine.name}
                  />
                ))}
            </div>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
TimeButton.propTypes = {
  zoneName: ptypes.string,
  type: ptypes.string,
  toggleTime: ptypes.func.isRequired,
  stamps: ptypes.array.isRequired,
  reminders: ptypes.array,
  routines: ptypes.array,
  onCheckRoutine: ptypes.func.isRequired,
  addedTime: ptypes.number.isRequired,
  onAddFiveMinutes: ptypes.func.isRequired,
  onSubtractFiveMinutes: ptypes.func.isRequired,
  budget: ptypes.number.isRequired,
  remainingRef: ptypes.shape({ current: ptypes.object }),
};

export default TimeButton;
