const express = require("express");
const apicontroller = require("../controllers/apikeycontroller");
const router = express.Router();
const middleware = require("../middleware/auth.middleware");

router.post('/create', middleware.requireAuth, apicontroller.createapikey);
router.get('/keys', middleware.requireAuth, apicontroller.listapikeys);
router.post('/keys/:id/revoke', middleware.requireAuth, apicontroller.revokeapikey);
router.get('/audit-logs', middleware.requireAuth, apicontroller.getauditlogs);

module.exports = router;