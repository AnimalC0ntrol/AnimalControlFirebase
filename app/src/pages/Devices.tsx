import * as React from "react";
import { RootStore } from "../stores/RootStore";
import { inject, observer } from "mobx-react";
import { Map, TileLayer } from "react-leaflet";
import { SyncLoader } from "react-spinners";
import { UnitMarker } from "../ui/Marker";
import { UnitList } from "../ui/UnitList";
import { EventList } from "../ui/EventList";

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
    const { events, isLoadingEvents } = this.props.store.eventStore;
    const hasEvents = events.length > 0;
    const zoom = 15;

    if (isLoading) {
      return (
        <div id="loader">
          <SyncLoader color={"rgba(252, 84, 0, 0.6)"} size={20} />
        </div>
      );
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
          {isLoadingEvents && (
            <SyncLoader color={"rgba(252, 84, 0, 0.6)"} size={15} />
          )}
          {!isLoadingEvents && !hasEvents && <UnitList />}
          {!isLoadingEvents && hasEvents && <EventList />}
        </div>
      </div>
    );
  }
}

export { Devices };
