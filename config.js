require('dotenv').config();

const config = {
  dbName: 'postgres',
  dbConfig: {
    server: 'localhost',
    options: {
      port: 5432,
      trustServerCertificate: true
    },
    authentication: {
      type: 'default',
      options: {
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      }
    },
    oidConfig: {
      byteaOutput: 'escape',
      loCompatPrivileges: true
    }
  },
  secret: 'secret'
};

module.exports = config;
