const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const controller = require("../controllers/solutionController");
console.log(controller);
router.post(
    "/",
    upload.single("image"),
    controller.addSolution
);

router.get(
    "/",
    controller.getSolutions
);
router.delete(
    "/:id",
    controller.deleteSolution
);
// Get Single Solution
router.get(
    "/:id",
    controller.getSolutionById
);

// Update Solution
router.put(
    "/:id",
    upload.single("image"),
    controller.updateSolution
);
module.exports = router;