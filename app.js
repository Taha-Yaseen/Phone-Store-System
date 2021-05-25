var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");

var { MongoClient } = require("mongodb");

var cors = require("cors")

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/home", indexRouter);
app.use(cors());
async function main() {
    const uri =
        "mongodb+srv://halaphone:halaphone@halaphone.nspnl.mongodb.net/halaphone?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
    });

    try {
        // Connect to the MongoDB cluster
        client.connect((err) => {
            if (err) throw err;
            var dbo = client.db("halaPhone");
            var hpCollection = dbo.collection("hpCollection");
            //Get All Tables
            app.get("/listAll", (req, res) => {
                try {
                    hpCollection
                        .find({})
                        .toArray()
                        .then(function(feedbacks) {
                            console.log(feedbacks)
                            res.status(200).json(feedbacks);
                        });
                } catch (error) {
                    throw `can't retrieve data`;
                }
            });

            //Post Hanan's Enterance
            app.post("/hananEnter", (req, res) => {
                try {
                    let today = new Date();
                    let time = today.getHours() + " : " + today.getMinutes()
                    let date =
                        today.getFullYear() +
                        "-" +
                        (today.getMonth() + 1) +
                        "-" +
                        today.getDate()
                    let enter = {
                        name: "Hanan",
                        enterTime: time,
                        exitTime: "",
                        date: date
                    }
                    hpCollection.insertOne(enter, (err, result) => {
                        if (err) console.log(err);
                        console.log();
                        res.status(200).json(req.body)
                    })

                } catch (error) {
                    throw "error entering Hanan"
                }
            })

            //Post Hanan's Exit
            app.post("/hananExit", async(req, res) => {
                try {
                    let today = new Date();
                    let time = today.getHours() + " : " + today.getMinutes()

                    let exit = {
                        name: "Hanan",
                        exitTime: time,
                    }
                    await hpCollection.findOneAndUpdate({ name: "Hanan" }, { $set: exit }, { upsert: 1, sort: { _id: -1 } }, (err, result) => {
                        if (err) console.log(err);
                        console.log(result);
                        res.status(200).json(req.body)
                    })

                } catch (error) {
                    throw "error entering Hanan"
                }
            })

            //Post Ayat's Enterance
            app.post("/AyatEnter", (req, res) => {
                try {
                    let today = new Date();
                    let time = today.getHours() + " : " + today.getMinutes()
                    let date =
                        today.getFullYear() +
                        "-" +
                        (today.getMonth() + 1) +
                        "-" +
                        today.getDate()
                    let enter = {
                        name: "Ayat",
                        enterTime: time,
                        exitTime: "",
                        date: date
                    }
                    hpCollection.insertOne(enter, (err, result) => {
                        if (err) console.log(err);
                        console.log();
                        res.status(200).json(req.body)
                    })

                } catch (error) {
                    throw "error entering Ayat"
                }
            })

            //Post Ayat's Exit
            app.post("/ayatExit", async(req, res) => {
                try {
                    let today = new Date();
                    let time = today.getHours() + " : " + today.getMinutes()

                    let exit = {
                        name: "Ayat",
                        exitTime: time,
                    }
                    await hpCollection.findOneAndUpdate({ name: "Ayat" }, { $set: exit }, { upsert: 1, sort: { _id: -1 } }, (err, result) => {
                        if (err) console.log(err);
                        console.log(result);
                        res.status(200).json(req.body)
                    })

                } catch (error) {
                    throw "error entering Ayat"
                }
            })

        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
app.listen(2777, () => {
    console.log("app listening on port 2777");
});
module.exports = app;