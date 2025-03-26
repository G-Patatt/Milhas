const Usuario = require("./Usuario");
const Oferta = require("./Oferta");

// Define the relationship between Oferta and Usuario
Usuario.hasMany(Oferta, {
  foreignKey: "usuarioId",
  as: "ofertas",
});

Oferta.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario", // Altere para corresponder ao include
});

module.exports = {
  Usuario,
  Oferta,
};
