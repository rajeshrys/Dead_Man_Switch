const express = require("express");
const router = express.Router();
const cliController = require("../controllers/clicontroller");
const { requireApiKey } = require("../middleware/apikey.middleware");
const { auditLogger } = require("../middleware/audit.middleware");

// Order is IMPORTANT: auditLogger runs first to capture response event,
// then requireApiKey authenticates.
router.use(auditLogger);
router.use(requireApiKey);

router.post("/sync", cliController.sync);
router.post("/logs", cliController.logs);
router.post("/start", cliController.start);

module.exports = router;
