export default function (values) {
  const error = {};
  const day = values["zones"].reduce(
    (acum, zone) => (acum + zone?.budget) | 0,
    0
  );
  if (day > 24) {
    error.general = "Your time budget is greater than 24hs";
  }
  return error;
}
