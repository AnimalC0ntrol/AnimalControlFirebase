
/**
 * { latlng: '69.68139, 18.97757',
  tcxn: 
   { cellular: { network_type: 'LoRa', rssi: 34 },
     connection_status: 2 },
  dev_eui: 'ffffffff00001366',
  app_key: 'b2d5d65e548a5e68cc6e1d733cc0431e',
  app_eui: '8000000000000006',
  lsnr: 8.75,
  payload: '1,69.68132,18.97779',
  motion_timestamp: '2018-05-12T17:50:19.520Z',
  motion: '1, 0, 0',
  uplink_transform_error: 'Unexpected token var',
  lat: '1227',
  lng: '18.97757',
  uv: '613',
  center: '1',
  left: '69.68139',
  right: '18.97757',
  motion_left: '1',
  motion_center: '0',
  motion_right: '0' }
 */
interface ITelenorEvent {
}

export class Event {
  timestamp: Date
  pirLeft: string
  pirCenter: string
  pirRight: string
  latlng: string
  uv: string

  constructor(event: ITelenorEvent){

  }
}