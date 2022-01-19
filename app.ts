// to run use the following cmd
// deno run --allow-net --allow-read --allow-env app.ts

import { opine } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { TrailService } from "./TrailService.ts";
import trails from "./db.ts";
import removeUndefined from "./helpers/removeUndefined.ts";
import { Bson } from "https://deno.land/x/bson/mod.ts";

const port = 3000;

const app = opine();

app.get("/trailid/:trailid", async function ({
    req,
    res,
}: {
    req: { id: string };
    res: any;
}) : Promise<void> {

    console.log("Das ist req", req);
    console.log("Das ist req.id", req.id);
    const trail = await trails.find({ "_id": new Bson.ObjectID(req.id) }, { noCursorTimeout: false }).toArray();

    if(trail) {
        res.status = 200;
        res.body = {
            success: true,
            data: trail,
        };
    } else {
        res.status = 404;
        res.body = {
            success: false,
            msg: "No trail found",
        };
    }
});

app.get("/alltrails", async function (req, res) {
    res.send(await trails.find({}, { noCursorTimeout: false }).toArray())
});

app.get("/search", async function (req, res) {
    const trailService = new TrailService();
    let searchParameters = trailService.findACoolTrail({ 
        trailId: req.query.trailid, 
        length: req.query.length, 
        title: req.query.title, 
        rating: req.query.rating,
        coordinates: req.query.coordinates });
    let searchQuery = JSON.stringify(searchParameters);
    console.log(searchQuery);
    res.send(await trails.find({searchQuery}, {noCursorTimeout: false }));
    /* result 
    correct string is passed, but is not correctly formatted for search in Mongo
    */
});

app.set("/addTrail", async ({
    req, res,
  }: {
    req: any; res: any;
  }): Promise<void> => {
    try {
      if(!req.hasBody) {
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
    } catch(err) {
      res.body = {
        success: false,
        msg: err.toString(),
      };
    }
  });

app.delete("/deleteTrail", async function({
    req, res
  }: {
    req: { id: string; }; res: any;
  }): Promise<void> {
    try {
      await trails.deleteOne({ $oid: req.id });
      res.status = 201;
      res.body = {
        success: true,
        msg: "Trail deleted",
      };
    } catch(err) {
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