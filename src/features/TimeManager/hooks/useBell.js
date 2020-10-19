import { useEffect, useState } from "react";

import UIfx from "uifx";
import bellAudio from "./../../sounds/bell.mp3";

const bell = new UIfx(bellAudio, {
  volume: 0.6, // number between 0.0 ~ 1.0
  throttleMs: 100,
});

function useBell() {
  const [bellOn, setBell] = useState(true);
  function toggleBell() {
    if (!bellOn) {
      bell.play();
    }

    setBell((me) => !me);
  }
  // const { name: activeZone } = stamps[stamps.length - 1] || {};
  // const isActive = activeZone === trackedZone ? true : false;

  useEffect(() => {
    let interval;
    if (bellOn === true) {
      interval = setInterval(() => {
        bell.play();
      }, 1000 * 60 * 15);
    }

    return () => {
      clearInterval(interval);
    };
  }, [bellOn]);

  return [bellOn, toggleBell];
}

useBell.PropTypes = {};

export default useBell;
