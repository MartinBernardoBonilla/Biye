const { MongoClient, ServerApiVersion } = require('mongodb');

// 👉 Reemplazá los valores entre <> por los tuyos reales
const uri = "mongodb+srv://biye_user:Biye2025!App@cluster0.5lhfplx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    console.log("🟡 Intentando conectar a MongoDB Atlas...");
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexión exitosa a MongoDB Atlas!");
    await client.close();
  } catch (err) {
    console.error("❌ Error al conectar:", err.message);
  }
}

run();
