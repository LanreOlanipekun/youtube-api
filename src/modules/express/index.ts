import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Errors } from '../../middleware';
import config from '../../config';
import Secret from '../secret';
import { LoggerDecorator, LoggerInterface } from '../logger';
import { RegisterRoutes, SwaggerJson } from '../routes';
import dotenv from 'dotenv';

dotenv.config();

class Express {
  @LoggerDecorator('Server')
  private log: LoggerInterface;
  private express: express.Application;

  constructor() {
    this.express = express();
  }

  private disablePoweredByNodejs(): void {
    this.express.disable('x-powered-by');
  }

  private mountStatics(): void {
    this.express.use('/core/public', express.static(config.dirs.public));
  }

  private mountBodyParser(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private mountCookieParserAndCors(): void {
    const options: cors.CorsOptions = config.corsOptions;
    this.express.use(cors(options));
    this.express.use(express.json());
    this.express.use(cookieParser());
  }

  private mountErrorHandlers(): void {
    this.express.use(Errors.errorMiddleware.bind(Errors));
  }

  private mountRoutes(): void {
    this.express.use(
      config.swagger.route,
      swaggerUi.serve,
      async (req: express.Request, res: express.Response) => {
        return res.send(swaggerUi.generateHTML(SwaggerJson));
      }
    );

    const limiter = rateLimit({
      windowMs: config.rateLimiter.time,
      max: config.rateLimiter.maxNumberOfRequest,
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      handler: (req, res, next, options) =>
        res
          .status(options.statusCode)
          .send({ message: options.message, code: 'RATE_LIMIT_EXCEEDED' }),
    });
    RegisterRoutes(this.express.use(limiter));
  }

  private mountHelmet(): void {
    // Define the max-age (e.g., 1 year in seconds)
    const maxAge = 31536000; // 1 year in seconds

    // Use helmet to set various HTTP headers for security
    this.express.use(helmet());

    // Prevent clickjacking
    this.express.use(
      helmet.frameguard({
        action: 'deny', // or 'sameorigin' if you want to allow same origin framing
      })
    );

    // Set HSTS header with includeSubDomains and preload
    this.express.use(
      helmet.hsts({
        maxAge,
        includeSubDomains: true,
        preload: true,
      })
    );
  }

  /**
   * Starts the express server
   */
  public init(): void {
    try {
      // Mount necessary express settings
      this.disablePoweredByNodejs();
      this.mountStatics();
      this.mountBodyParser();
      this.mountCookieParserAndCors();
      this.mountHelmet();
      this.mountRoutes();
      this.mountErrorHandlers();

      // Start the server on the specified port
      this.express.listen(process.env.PORT || Secret.App.port, () => {
        this.log.info(
          `Server launched on host: ${Secret.App.host}:${Secret.App.port}`
        );
      });
    } catch (err) {
      this.log.error(`Server got an error: ${err.message}`);
      throw err;
    }
  }

  public get Server(): express.Application {
    return this.express;
  }
}

export default new Express();
