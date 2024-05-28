import app from "./app";
import { dataSource } from "./database/data-source";

const PORT = process.env.PORT || 3000;

dataSource

console.log(`🛢️  Data source initialized`);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

