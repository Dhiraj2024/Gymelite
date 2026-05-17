const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// DEBUG (important)
console.log(programController);

// Routes
router.get("/", programController.getAllPrograms);
router.get("/:id", programController.getProgramById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  programController.createProgram
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  programController.updateProgram
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  programController.deleteProgram
);

router.post(
  "/:id/like",
  authMiddleware,
  programController.likeProgram
);

module.exports = router;