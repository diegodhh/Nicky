import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState, deleteState } from "./localStorage";

import createZonesStore from "../features/TimeManager/zonesSlice";
import { combineReducers } from "redux";
import { zones } from "./zones";
import * as actionTypes from "./actions";

const lastZones = loadState()?.zones;

const lastZonesArray =
  lastZones && Object.keys(lastZones).map((zone) => lastZones[zone]);

const { allReducers, allActions } = createZonesStore(lastZonesArray || zones);
let exportAllActions = allActions;
const allZonesReducer = combineReducers({ ...allReducers });

const zoneReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actionTypes.RESET_ZONES) {
    console.log(state);
    const newState = resetZones(state);
    return allZonesReducer(newState, action);
  }
  if (action.type === actionTypes.UPDATE_ZONES) {
    console.log("happening");
  }

  return allZonesReducer(state, action);
};

const persistedState = loadState();

const store = configureStore({
  reducer: { zones: zoneReducer },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
store.asyncReducers = {};
export function injectNewZones(newZones) {
  console.log(newZones);

  const { allActions, allReducers } = createZonesStore(newZones);
  exportAllActions = allActions;
  store.replaceReducer(
    combineReducers({
      zones: combineReducers({
        ...allReducers,
      }),
    })
  );
}

function getZonesActions() {
  return exportAllActions;
}

export default store;
export { getZonesActions };

function resetZones(state) {
  return Object.keys(state).reduce((prev, zone) => {
    prev[zone] = { ...state[zone] };
    prev[zone].stamps = [];
    return prev;
  }, {});
}
