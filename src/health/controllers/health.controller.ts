import { Controller, type Server, type RouteHandler } from 'src/server/controller.js';

export class HealthController extends Controller {
  public mount(app: Server): void {
    app.get('/health', this.get);
  }

  public get: RouteHandler = async (_, res) => {
    await res.send({
      status: 'up'
    });
  };
}
