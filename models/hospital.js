const { Schema, model } = require("mongoose");

const HospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "Hospitals" }
);

//con fines visuales realizamos este método para modificar el nombre de _id
HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

//por defecto mongoose agrega una s a user (genera el plural en la BD)
module.exports = model("Hospital", HospitalSchema); //podemos hacer CRUD sobre ese modelo
