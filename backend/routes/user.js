var express = require("express"),
    router = express.Router(),
    {
        signup,
        signin
    } = require("../controllers/auth.js");

// router.post("/register", signup, function (req, res) {

// });
router.post("/register", signup);
router.post("/login", signin);

module.exports = router;