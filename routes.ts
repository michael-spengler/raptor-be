import { Router } from "https://deno.land/x/oak/mod.ts";

// importing the const from the controllers file, otherwise they don't appear below
import {
  addTrail,
  getTrails,
  getTrail,
  searchTrail,
  updateTrail,
  deleteTrail,
} from "./controllers/trails.ts"

const router = new Router();

router
  .get("/alltrails", getTrails) // Get all trails
  .get("/trail/:id", getTrail) // Get one trail of trailID: id
  .get("/trails/searchKeys", searchTrail) // Get some trails by giving search Keys as queries
  .post("/trail", addTrail) // Add a trail
  .put("/trail/:id", updateTrail) // Update a trail
  .delete("/trail/:id", deleteTrail); // Delete a trail

export default router;
