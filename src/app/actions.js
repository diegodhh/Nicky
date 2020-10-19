import { injectNewZones } from "./store";
export const RESET_ZONES = "RESET_ZONES";
export const UPDATE_ZONES = "UPDATE_ZONES";

export function resetZones() {
  return { type: RESET_ZONES };
}

export function updateZones(newZones) {
  console.log(injectNewZones);
  injectNewZones(newZones);
  return { type: "@@INIT", payload: newZones };
}
