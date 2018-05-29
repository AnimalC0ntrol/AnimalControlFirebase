import * as React from "react";
import { RootStore } from "../stores/RootStore";
import { inject, observer } from "mobx-react";
import { Map, TileLayer } from "react-leaflet";
import { RingLoader } from "react-spinners";
import { Unit } from "../ui/Unit";
import { UnitMarker } from "../ui/Marker";

interface IProps {
  store: RootStore;
}

@inject("store")
@observer
class Devices extends React.Component<IProps> {
  map: Map;

  constructor(props: IProps) {
    super(props);
    props.store.unitStore.getUnits();
  }

  render() {
    const { isLoading, units, averageLocation } = this.props.store.unitStore;
    const zoom = 15;

    if (isLoading) {
      return <RingLoader />;
    }

    return (
      <div id="map-page">
        <div className="leaflet-container">
          <Map
            center={averageLocation}
            zoom={zoom}
            ref={ref => (this.map = ref!)}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {units.map(unit => <UnitMarker key={unit.unitId} unit={unit} />)}
          </Map>
        </div>
        <div id="device-list">
          {units.map(unit => <Unit key={unit.unitId} data={unit} />)}
        </div>
      </div>
    );
  }
}

export { Devices };
