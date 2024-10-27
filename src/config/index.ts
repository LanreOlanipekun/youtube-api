import secret from '../modules/secret';

export default {
  dirs: {
    public: 'public',
  },
  got: {
    retry: {
      limit: 3,
      methods: ['GET', 'PUT', 'DELETE'],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
    timeout: 30000,
  },
  rateLimiter: {
    time: 60000,
    maxNumberOfRequest: 100,
  },

  swagger: {
    route: '/api/docs',
  },

  corsOptions: {
    origin: secret.Cors.origin,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Accept',
      'Content-Length',
      'Content-Type',
      'Authorization',
      'boundary',
      'VFDBankAuth',
      'API-Key',
    ],
    credentials: true,
    preflightContinue: false,
  },
};
