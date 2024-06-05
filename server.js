const express = require('express');
const cors = require('cors');
const app = express();
const port = 4001;

const corsOptions = {
	origin: 'https://esp-app-latest.vercel.app',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	allowedHeaders: 'Content-Type,Authorization',
	exposedHeaders: 'Content-Length,Content-Range',
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Private-Network', 'true');
	next();
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
