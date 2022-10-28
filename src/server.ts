import app from "./app";
import { errorLogger } from "./config/logger";
import { connectWithMongoDB } from "./db/mongo";

app.listen(3000, () => {
    connectWithMongoDB();
    console.log("Listening on port 3000");
});
