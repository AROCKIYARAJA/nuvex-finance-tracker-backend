const router = require("express").Router();
const geoip = require("geoip-lite");

// Middleware to get IP
router.get("/detect-location", async (req, res) => {
  console.log("leohjsldj")
  try {
    const ip = req.clientIp;

    // Get geo location from IP
    const geo = geoip.lookup(ip);

    res.json({
      success: true,
      ip,
      location: geo || "Location not found",
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: "Error detecting location",
    // });
  }
});

module.exports = router;
