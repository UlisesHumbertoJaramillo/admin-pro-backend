const { Schema, model } = require("mongoose");

const MedicSchema = Schema(
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
    hospital: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { collection: "Medic" }
);

//con fines visuales realizamos este método para modificar el nombre de _id
MedicSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

//por defecto mongoose agrega una s a user (genera el plural en la BD)
module.exports = model("Medic", MedicSchema); //podemos hacer CRUD sobre ese modelo
