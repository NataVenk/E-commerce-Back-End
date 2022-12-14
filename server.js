const express = require('express');
const routes = require('./routes');
// import sequelize connection - done

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server - done
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
