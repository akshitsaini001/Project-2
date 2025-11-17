const express= require("express");
const router = express.Router();
const { wrapAsync } = require("../Middleware.js");
const searchController = require("../controller/search.js");


router.get("/search" , searchController.renderSearchPage);

router.get("/search/someone" , wrapAsync(searchController.searchUserByUsername));

module.exports = router;