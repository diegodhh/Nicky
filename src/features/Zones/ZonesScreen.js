import React, { useMemo } from "react";

import ZonesForm from "./Components/Form/Form";
import { updateZones } from "./../../app/actions";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "./../../Layout/AppBar";
export default function ZonesScreen() {
  const zones = useSelector((state) => state.zones);
  const arrayOfZones = useMemo(
    function () {
      return zones && Object.keys(zones).map((zone) => zones[zone]);
    },
    [zones]
  );

  const dispatch = useDispatch();
  function handleSubmit(values) {
    dispatch(updateZones(values));
  }

  return (
    <div>
      <ZonesForm onSubmit={handleSubmit} zones={arrayOfZones} />
    </div>
  );
}
