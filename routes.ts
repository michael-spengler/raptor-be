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
  .get("/api/trail", getTrails) // Get all trails
  .get("/api/trail/:id", getTrail) // Get one trail of trailID: id
  .get("/api/trails/searchKeys", searchTrail) // Get some trails by giving search Keys as queries
  .post("/api/trail", addTrail) // Add a trail
  .put("/api/trail/:id", updateTrail) // Update a trail
  .delete("/api/trail/:id", deleteTrail); // Delete a trail

export default router;
