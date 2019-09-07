const router = require("express").Router();
const { createReadStream, stat } = require("fs");
const { promisify } = require("util");

const fileName = "src/assets/powder-day.mp4";
const fileInfo = promisify(stat);

const verify = require("../middleware/verifyToken");

router.get("/stream", verify, async (req, res) => {
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;
  //console.log(renge ? renge : "no range");
  try {
    if (range) {
      let [start, end] = range.replace(/bytes=/, "").split("-");
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : size - 1;
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "video/mp4"
      });
      createReadStream(fileName, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": size,
        "Content-Type": "Video/mp4"
      });
      createReadStream(fileName).pipe(res);
    }
  } catch (e) {
    res.status(404).send(e);
    console.log("stream erro", e);
  }
});

module.exports = router;
