// to run use the following cmd
// deno run --allow-net --allow-read --allow-env app.ts

import { opine } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { TrailService } from "./TrailService.ts";
import trails from "./db.ts";
import removeUndefined from "./helpers/removeUndefined.ts";

const port = 3000;

const app = opine();

app.get("/alltrails", async function (req, res) {
    res.send(await trails.find({}, { noCursorTimeout: false }).toArray())
});

app.get("/trailid/:trailid", function (req, res) {
    res.send(`trailid lautet: ${req.params.trailid}`);
});

app.get("/search", async function (req, res) {
    const trailService = new TrailService();
    let searchQuery = trailService.findACoolTrail({ 
        trailId: req.query.trailid, 
        length: req.query.length, 
        title: req.query.title, 
        rating: req.query.rating,
        coordinates: req.query.coordinates });
    searchQuery = removeUndefined(searchQuery);
    console.log(searchQuery);
    res.send(await trails.find({}, {noCursorTimeout: false }).toArray());
    /* result 
    { trailId: undefined, length: "2500", title: undefined, coordinates: undefined }
    mongo doesn't accept the undefined values
    TODO: maybe write a function to reformat the string
    */
});

app.set("/addTrail", async function addTrail({
    req, res,
}: {
    req: any;
    res: any;
}): Promise<void> {
    try {
        if (!req.hasBody) {
            res.status = 400;
            res.body = {
                success: false,
                msg: "No Data",
            };
        } else {
            const body = await req.body();
            const trail = await body.value;
            await trails.insertOne(trail);
            res.status = 201;
            res.body = {
                success: true,
                data: trail,
            };
        }
    } catch (err) {
        res.body = {
            success: false,
            msg: err.toString(),
        };
    }
});

app.listen(
    port,
    () => console.log(`Server has started on http://localhost:${port} 🚀`),
);