const app = require('../server/server');

const PORT = process.env.PORT || 3000;

// START Server
const server = app.listen(PORT, () => {
  const hostname = server.address().address;
  const { port } = server.address();

  console.log(`Server running at http://${hostname}:${port}/`);
});
