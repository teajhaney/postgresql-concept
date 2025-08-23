import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import promClient from 'prom-client';
import authorRoutes from './routes/author.route.js';
import bookRoutes from './routes/book.route.js';

const app = express();
app.use(express.json());

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestCounter = new promClient.Counter({
  name: 'http_request_count',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

register.registerMetric(httpRequestCounter);

const PORT = process.env.PORT || 3000;

//Expose the /metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
	try {
		res.set('Content-Type', register.contentType);
		res.end(await register.metrics());
	}catch (error) {
		res.status(500).send('Error retrieving metrics');
	}
});

// Middleware to count HTTP requests
app.use((req, res, next) => {
  res.on('finish', () => {
	httpRequestCounter.inc({
	  method: req.method,
	  route: req.path,
	  status_code: res.statusCode,
	});
  });
  next();
});

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
