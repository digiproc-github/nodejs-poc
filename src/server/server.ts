import { type Logger } from 'pino';
import { type FastifyInstance } from 'fastify';
import { LogAware } from 'src/log/log-aware.js';
import httpConfig from './server.config.js';
import { type Controller } from './controller.js';

export class Server extends LogAware {
  constructor(
    private readonly app: FastifyInstance,
    private readonly controllers: Controller[],
    logger: Logger
  ) {
    super(logger);
  }

  public async start(): Promise<void> {
    for (const controller of this.controllers) {
      this.logger.debug(`mounting controller "${controller.constructor.name}"`);
      controller.mount(this.app);
    }

    await this.app.listen(httpConfig);
  }

  public async stop(): Promise<void> {
    await this.app.close();
  }
}
