import { type FastifyListenOptions } from 'fastify';

const serverConfig: FastifyListenOptions = {
  port: process.env.PORT !== undefined ? Number.parseInt(process.env.PORT) : 3000,
  /* @description
   * fastify uses localhost only by default
   * this is especially important to be set to 0.0.0.0 when running inside a container,
   * otherwise the service will be unreachable from the outer host
   */
  host: '0.0.0.0'
};

export default serverConfig;
