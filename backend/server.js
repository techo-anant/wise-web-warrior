if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + '/development.env' });
}
require('./config/app');