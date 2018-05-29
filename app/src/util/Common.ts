import * as moment from "moment";

const convertTimestamp = (firebaseSeconds: number) => {
  return moment.unix(firebaseSeconds).format("MMMM Do YYYY, h:mm:ss a");
};

export { convertTimestamp };
