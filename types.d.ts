import { Connection } from "mongoose";

declare global{
    var mongoose:{
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}
export {} // This is to prevent TS error TS1208