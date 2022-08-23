import 'dotenv/config';

import connectionToServer from './server/server.js';
import { connectDB } from './db/dbMDB.js';

const { server, app } = connectionToServer;
connectDB();

server.listen(app.get('port'), () => {
  console.log('Server on Port: ', app.get('port'));
});
