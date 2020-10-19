import ptypes from "prop-types";

import { useEffect, useState, useMemo } from "react";
import moment from "moment";

function useTime(trackedZone, stamps, addedTime, budget, remainingRef) {
  const [seconds, setSeconds] = useState(null);

  const { name: activeZone } = stamps[stamps.length - 1] || {};
  const isActive = activeZone === trackedZone ? true : false;
  const budgetInHours = useMemo(() => {
    return budget * 60 * 60;
  }, [budget]);

  useEffect(() => {
    setSeconds(0);
    const interval = setInterval(() => {
      setSeconds((seconds) => (isActive ? seconds + 1 : seconds));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const { total: lastTotal, currentInterval = 0 } = useMemo(
    () => getTimeTotalFromStamps(stamps, trackedZone),
    [stamps, trackedZone]
  );

  const total = lastTotal + seconds + addedTime;
  const restBudget = budgetInHours - total;
  const minutes = minute(total);

  remainingRef.current = { ...remainingRef.current, [trackedZone]: restBudget };

  const otherZonesRemaining = useMemo(
    () =>
      Object.keys(remainingRef.current).reduce((prev, next) => {
        if (
          next !== trackedZone &&
          next !== "Off" &&
          remainingRef.current[next] > 0
        ) {
          return prev + remainingRef.current[next];
        }
        return prev;
      }, 0),
    [remainingRef, trackedZone]
  );

  const AllRemainingTime = useMemo(
    () => otherZonesRemaining + restBudget + milli(Date.now()),
    [otherZonesRemaining, restBudget]
  );

  const remainingBudgetTime = useMemo(() => restBudget + milli(Date.now()), [
    restBudget,
  ]);
  const worstHour = useMemo(
    () => moment(AllRemainingTime * 1000).format("LT"),
    [AllRemainingTime]
  );
  const bestHour = useMemo(
    () => moment(remainingBudgetTime * 1000).format("LT"),
    [remainingBudgetTime]
  );

  return [
    total,
    activeZone,
    currentInterval + seconds,
    restBudget,
    worstHour,
    bestHour,
  ];
}

useTime.PropTypes = {
  trackedZone: ptypes.string,
  stamps: ptypes.array.isRequired,
  addedTime: ptypes.number.isRequired,
  budget: ptypes.number.isRequired,
  remainingRef: ptypes.shape({ current: ptypes.number.isRequired }),
};

export default useTime;

function getTimeTotalFromStamps(stamps, trackedZone) {
  let aux;
  const intervals = [];
  if (stamps.length === 0) {
    return 0;
  }
  stamps.forEach((item, index) => {
    if (item.name === trackedZone) {
      if (!aux) {
        aux = item.time;
      }
    } else {
      if (aux) {
        intervals.push(item.time - aux);
        aux = null;
      }
    }
  });
  let currentInterval = undefined;
  if (aux) {
    currentInterval = Date.now() - aux;
    intervals.push(currentInterval);
  }
  return {
    total: milli(intervals.reduce((a, b) => a + b, 0)),
    currentInterval: currentInterval && milli(currentInterval),
  };
}

function milli(mili) {
  return Math.round(mili / 1000);
}
function minute(mili) {
  return Math.round(mili / 60);
}
