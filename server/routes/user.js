const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.use(authMiddleware);

router.get("/me", (req, res) => {
  console.log("User details:", req.user);
  res.status(200).json(req.user);
});

module.exports = router;
