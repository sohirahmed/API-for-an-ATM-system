import { connect } from "mongoose";

const connectionDB = async () => {
  return await connect(process.env.DB_URL)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log("fail to connect", err));
};

export default connectionDB;
