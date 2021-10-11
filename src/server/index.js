const express = require('express');

const app = express();

const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const authRoutes = require('./routes/authentication');
const tableRoutes = require('./routes/tables');
const itemRoutes = require('./routes/items');


app.use(express.static('dist'));

userRoutes(app);

roleRoutes(app);

authRoutes(app);

tableRoutes(app);

itemRoutes(app);

app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}!`));
