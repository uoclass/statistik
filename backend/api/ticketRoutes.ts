import { Router } from "express";
import controller from "./ticketController.ts";

const router = Router();

router.post("/fetch-filtered-tickets", controller.fetchFilteredTickets);
router.get("/buildings", controller.fetchBuildings);
router.get("/requestors", controller.fetchRequestors);
router.get("/fetch-new-ticket-report", controller.fetchNewTicketReport);
router.post("/refresh-report", controller.refreshReport);
router.get(
  "/report-cache-generation-time",
  controller.reportCacheGenerationTime,
);

export default router;
