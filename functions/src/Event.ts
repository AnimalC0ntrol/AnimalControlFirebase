
interface ITelenorEvent {
  motion_timestamp: Date
  motion: string
  lat: string
  lng: string
  latlng: string
  uv: string
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