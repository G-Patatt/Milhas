const { Sequelize } = require("sequelize");

// Configuração do banco de dados (use as credenciais corretas)
const sequelize = new Sequelize('milhas', 'root', 'Sheldon@12', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,  // Habilitar log para ver a SQL gerada
  });

async function cleanIndexes() {
  try {
    console.log("🔍 Verificando índices duplicados...");

    // Obtém a lista de índices da tabela `usuarios`
    const [results] = await sequelize.query("SHOW INDEX FROM usuarios");

    // Lista de índices que queremos manter
    const indicesImportantes = ["PRIMARY", "email"];

    for (const row of results) {
      const indexName = row.Key_name;

      // Se o índice não estiver na lista dos importantes, removemos
      if (!indicesImportantes.includes(indexName)) {
        console.log(`❌ Removendo índice: ${indexName}`);
        await sequelize.query(`ALTER TABLE usuarios DROP INDEX ${indexName}`);
      }
    }

    console.log("✅ Índices desnecessários removidos!");
  } catch (error) {
    console.error("⚠️ Erro ao limpar índices:", error);
  } finally {
    await sequelize.close();
  }
}

// Aqui está o jeito certo de exportar a função
module.exports = cleanIndexes;
