export interface IUnitDoc {
  batterylevel: number | null;
  lastUpdate: Date;
  latlng: { latitude: number; longitude: number };
  signalStrength: number;
  unitId: string;
}

export interface IEventDoc {
  centerPir: boolean;
  leftPir: boolean;
  rightPir: boolean;
  timestamp: Date;
  unitId: string;
  uuid: string;
}

export interface ITelenorEvent {
  dev_eui: string; // Unit id
  motion_timestamp: string;
  lat: string;
  lng: string;
  motion_center: string | null;
  motion_left: string | null;
  motion_right: string | null;
  tcxn: {
    cellular: {
      rssi: number;
    };
  };
}
