const { Sequelize } = require("sequelize");

// Configuração do Sequelize
const sequelize = new Sequelize("milhas", "root", "Sheldon@12", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // Habilitar log para ver a SQL gerada
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar-se ao banco de dados:", error);
  }
};

testConnection();

module.exports = sequelize;
