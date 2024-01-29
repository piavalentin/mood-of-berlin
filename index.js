const Index = require("jimp");
const { findNearest, hex } = require("./tools");
const { uploadColor } = require("./utils/upload");
require("dotenv").config();

const SOURCE_IMAGE =
  process.env.SOURCE_IMAGE || "https://www.berlin.de/webcams/fsz/webcam.jpg";

const logBot = () => {
    console.log(">>> colors uploaded");
}

Index.read(SOURCE_IMAGE)
  .then((image) => {
    const width = image.getWidth();
    const height = width / 5;
    // const croppedImage = image.crop(0, 0, width, height); // TODO decide

    const { r, g, b } = Index.intToRGBA(image.getPixelColour(55, 55));
    console.log("rgb", r, g, b);

    const rgb = [r, g, b];
    const hexCode = hex(rgb);
    const name = findNearest(rgb);

    console.log("hex", hexCode, "name", name);
    uploadColor({ color: hexCode, name, rgb }).then((r) => logBot());
  })
  .catch((err) => {
    console.log(err);
  });
