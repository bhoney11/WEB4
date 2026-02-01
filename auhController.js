const router = require("express").Router();
const { getAll, create, remove, update } = require("../controllers/toyController"); 
const { protect, isAdmin } = require("../middleware/auth");


router.get("/", getAll);
router.post("/", protect, isAdmin, create);
router.put("/:id", protect, isAdmin, update);
router.delete("/:id", protect, isAdmin, remove);
module.exports = router;
