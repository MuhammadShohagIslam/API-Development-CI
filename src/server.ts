import app from "./app";
import { successLogger } from "./config/logger";
import { connectWithMongoDB } from "./db/mongo";

app.listen(3000, () => {
    connectWithMongoDB();

    if (process.env.ENVIRONMENT != "TEST") {
        app.use(successLogger);
    }

    console.log("Listening on port 3000");
});
