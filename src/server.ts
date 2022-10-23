import app from "./app";
import { errorLogger } from "./config/logger";
import { connectWithMongoDB } from "./db/mongo";
import { url } from "./db/mongo";

app.listen(3000, () => {
    connectWithMongoDB();

    if (process.env.ENVIRONMENT != "TEST") {
        app.use(errorLogger(url));
    }

    console.log("Listening on port 3000");
});
