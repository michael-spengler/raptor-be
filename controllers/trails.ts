import trails from "../db.ts"
import { TrailHelper } from "../helpers/TrailHelper.ts";
import parseValue from "../helpers/parse.ts"
import { Bson } from "https://deno.land/x/bson/mod.ts"

// @description: GET all Trails
// @route GET /api/trails
const getTrails = async ({ response }: { response: any }) => {
  try {
    const allTrails = await trails.find({}, { noCursorTimeout: false }).toArray();
    console.log(allTrails)
    if (allTrails) {
      response.status = 200;
      response.body = allTrails
      // response.body = {
      //   success: true,
      //   data: allTrails,
      // };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

async function searchTrail(params : any , response :any) {
  try {
    console.log("I'm in the try statement.")
    const trailService = new TrailHelper()
    console.log('Created trailService')
    // const searchQuery = trailService.parseSearchKeys({ length: params.query.length, title: params.query.title, rating: params.query.rating })
    // console.log('Succesfully parsed searchKeys:')
    // console.log(searchQuery)
    const allTrails = await trails.find({"title" : "testtrail"}, { noCursorTimeout: false }).toArray();
    console.log('I searched for Trails and found this:')
    console.log(allTrails)
    if (allTrails) {
      response.status = 200;
      response.body = {
        success: true,
        data: allTrails,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// @description: GET single trail
// @route GET /api/trails/:id
const getTrail = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {

  console.log("Das ist params", params);
  console.log("Das ist params.id", params.id);
  const trail = await trails.find({ "_id": new Bson.ObjectID(params.id) }, { noCursorTimeout: false }).toArray();

  if (trail) {
    response.status = 200;
    response.body = {
      success: true,
      data: trail,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No trail found",
    };
  }
};

// @description: GET search result for keys
// @route GET /api/trails/searchKeys

//old version of search trail, working with static parameters
/*
const searchTrail = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {

  //Version with manual parsing following this tutorial https://medium.com/deno-the-complete-reference/process-query-params-in-deno-6f71caa7933b
  // const u = new URL(params.url);
  // const po: Record<string, string | number | boolean> = {};

  // for (const p of u.searchParams) {
  //   po[p[0]] = parseValue(p[1]);
  // }
  // const searchQuery = JSON.stringify(po);

  //Version nach ihrem Vorschlag
  // const helper = new TrailHelper();
  // response.send(params.query.title, params.query.length)
  // console.log(params.query.title, params.query.length)
  // const searchQuery = helper.parseSearchKeys({ title: params.query.title, length: params.query.length });

  // response.send(searchQuery)

  // const searchedTrails = await trails.find(searchQuery, { noCursorTimeout: false }).toArray();

  //hard coded for test
  const searchedTrails = await trails.find({title: "testtrail"}, { noCursorTimeout: false }).toArray();

  if (searchedTrails) {
    response.status = 200;
    response.body = {
      success: true,
      data: searchedTrails,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No trails found",
    };
  }
};
*/

// @description: ADD single trail
// @route POST /api/trails
async function addTrail({
  request, response,
}: {
  request: any;
  response: any;
}): Promise<void> {
  try {
    if(!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const body = await request.body();
      const trail = await body.value;
      await trails.insertOne(trail);
      response.status = 201;
      response.body = {
        success: true,
        data: trail,
      };
    }
  } catch(err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
}

// @description: UPDATE single trail
// @route PUT /api/trails/:id
const updateTrail = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body();
    const inputTrail = await body.value;
    await trails.updateOne(
      { trailID: params.id },
      { $set: { title: inputTrail.title, length: inputTrail.length } }
    );
    const updatedTrail = await trails.findOne({ trailID: params.id });
    response.status = 200;
    response.body = {
      success: true,
      data: updatedTrail,
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

// @description: DELETE single trail
// @route DELETE /api/trails/:id
const deleteTrail = async ({
  params,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    await trails.deleteOne({ trailID: params.id });
    response.status = 201;
    response.body = {
      success: true,
      msg: "Product deleted",
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export { getTrails, getTrail, searchTrail, addTrail, updateTrail, deleteTrail };