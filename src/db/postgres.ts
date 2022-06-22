import db from './models';

// Connect to postgres database
db.sequelize.sync()
.then(console.log('Postgres database connected.'))
.catch((err: any) => console.error('Unable to connect to the database.', err));
