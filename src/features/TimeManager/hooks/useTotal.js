import ptypes from "prop-types";

import { useEffect, useState } from "react";

function useTotal(stamps) {
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    let interval;
    if (stamps && stamps.length) {
      setSeconds(getAll(stamps[0].time, Date.now()));
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      setSeconds(0);
    };
  }, [stamps]);

  return [seconds];
}

useTotal.PropTypes = {
  stamps: ptypes.array.isRequired,
};

export default useTotal;

function getAll(first, second) {
  return Math.round(second - first) / 1000;
}
