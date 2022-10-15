import app from './app';
import connectWithMongoDB from './db/mongo';

connectWithMongoDB();

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
