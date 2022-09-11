const fs = require("fs");
const User = require("../models/user");
const Medic = require("../models/medic");
const Hospital = require("../models/hospital");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    //deletes old image
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, path, fileName) => {
  switch (type) {
    case "medics":
      const medic = await Medic.findById(id);
      if (!medic) {
        return false;
      }
      oldPath = `./uploads/${type}/${medic.img}`;
      deleteImage(oldPath);

      medic.img = fileName;
      await medic.save();
      return true;
      break;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        return false;
      }
      const oldPath2 = `./uploads/${type}/${user.img}`;
      deleteImage(oldPath2);

      user.img = fileName;
      await user.save();
      return true;
      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      const oldPath3 = `./uploads/${type}/${hospital.img}`;
      deleteImage(oldPath3);

      hospital.img = fileName;
      await hospital.save();
      return true;
      break;

    default:
      break;
  }
};

module.exports = { updateImage };
