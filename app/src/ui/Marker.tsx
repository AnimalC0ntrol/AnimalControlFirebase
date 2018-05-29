import * as React from "react";
import { Popup, CircleMarker } from "react-leaflet";
import { UnitModel } from "../models/UnitModel";

interface IProps {
  unit: UnitModel;
}

export const UnitMarker = ({ unit }: IProps) => (
  <div className="marker">
    <CircleMarker center={unit.position} radius={8}>
      <Popup>{unit.unitId}</Popup>
    </CircleMarker>
  </div>
);
