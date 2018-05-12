import { loadFirestore } from "../../util/firestore";

const firestore = loadFirestore()

export default class UnitService {

  static getDevices = async () => {
    const units: any = []
    const unitsSnap = await firestore.collection("units").get()
    
    unitsSnap.forEach(unitDoc => {
      const unit = unitDoc.data()
      units.push(unit)
    })

    return units
  }
}