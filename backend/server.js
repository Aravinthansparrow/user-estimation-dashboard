const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');


//Routes line
const clientRoutes = require('./routes/clientRoutes');
const workItemRoutes = require('./routes/workItemRoutes');
const componentRoutes = require('./routes/componentRoutes');
const complexityRoutes = require('./routes/complexityRoutes');
const generalRoutes = require('./routes/generalRoutes');
const userRoutes = require('./routes/userRoutes');
// Create an instance of Express app
const app = express();

app.use(express.json());
app.use(cors());

// Mount the routes under the path
app.use('/clients', clientRoutes)
app.use('/workitems', workItemRoutes)
app.use('/components', componentRoutes); 
app.use('/complexity', complexityRoutes);
app.use('/generalsettings', generalRoutes);
app.use('/user', userRoutes);

// Sync the database and start the server
sequelize.sync()
  .then(() => {
    app.listen(3002, () => {
      console.log('Server is running on http://localhost:3002');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });






