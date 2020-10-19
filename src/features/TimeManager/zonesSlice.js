import { createSlice } from "@reduxjs/toolkit";

export const createZonesStore = (zones) => {
  const AllZonesSlice = zones.map((zone) =>
    createSlice({
      name: zone.name,
      initialState: zone,
      reducers: {
        start: (state) => {
          state.stamps.push({ time: Date.now() });
        },
        addFiveMinutes: (state) => {
          state.addedTime = state.addedTime + 5 * 60;
        },
        subtractFiveMinutes: (state) => {
          state.addedTime = state.addedTime - 5 * 60;
        },
        toggleRoutine: {
          reducer: (state, { payload: { _id } }) => {
            console.log("_id", _id);
            const index = state.routines.findIndex((x) => x._id === _id);

            console.log("index", index);
            state.routines[index].finished = !state.routines[index].finished;
          },
          prepare: (_id) => {
            console.log("_id", _id);
            return { payload: { _id } };
          },
        },
      },
    })
  );

  const allReducers = AllZonesSlice.reduce((prev, next) => {
    prev[next.name] = next.reducer;
    return prev;
  }, {});

  const allActions = AllZonesSlice.reduce((prev, next) => {
    prev[next.name] = next.actions;
    return prev;
  }, {});

  return { allReducers, allActions };
};

export const selectStamp = (state) => state.counter.stamps;

export default createZonesStore;
