import app from "./app";
import { connectWithMongoDB } from "./config/mongo.db.config";

app.listen(3000, () => {
    connectWithMongoDB();
    console.log("Listening on port 3000");
});
