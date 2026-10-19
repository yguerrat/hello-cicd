const { createServer } = require('./app');

const PORT = Number(process.env.PORT) || 3000;
createServer().listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
