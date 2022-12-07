module.exports = {
    messages: {
      client: 'sqlite3',
      connection: { filename: './src/data/ myDB.sqlite' },
      useNullAsDefault: true,
    },
  
    products: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'ejemplo',
        port: 3306,
        password: '',
        database: 'backend',
      },
    },
  };