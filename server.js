const http = require('http');
const port = process.env.PORT || 3000;
const app = require('./app');

console.log('création de serveur');

const serveur = http.createServer(app);

console.log('listen on port : ' + port);
serveur.listen(port);