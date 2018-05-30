export interface IUnitDoc {
  batterylevel: number | null;
  lastUpdate: Date;
  latlng: { latidute: number; longitude: number };
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
  uvLevel: string | null;
}

export interface ITelenorEvent {
  dev_eui: string; // Unit id
  motion_timestamp: string;
  lat: string;
  lng: string;
  uv: string | null;
  center: string | null;
  left: string | null;
  right: string | null;
  tcxn: {
    cellular: {
      rssi: number;
    };
  };
}
