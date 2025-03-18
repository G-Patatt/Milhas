const { Avaliacao } = require("./"); // Adjust according to your model file

async function deleteAllAvaliacoes() {
  try {
    await Avaliacao.destroy({ where: {} });
    console.log("All records deleted successfully!");
  } catch (error) {
    console.error("Error deleting records:", error);
  }
}

deleteAllAvaliacoes();
