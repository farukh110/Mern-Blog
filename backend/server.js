const express = require('express');
const dbConnect = require('./database/index');
const { PORT } = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    credentials: true,
    origin: ['http://127.0.0.1:5173']
}

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());

app.use(router);

dbConnect();

app.get('/', (req, res) => res.json({ msg: 'app testing' }));

app.use('/storage', express.static('storage'));

app.use(errorHandler);

app.listen(PORT, console.log(`Server is up and running on port:${PORT}`));
