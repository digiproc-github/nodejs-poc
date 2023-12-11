import { type FastifyInstance, type RouteGenericInterface, type FastifyReply, type FastifyRequest, type ContextConfigDefault, type FastifyBaseLogger, type FastifySchema, type FastifyTypeProvider, type FastifyTypeProviderDefault, type RawReplyDefaultExpression, type RawRequestDefaultExpression, type RawServerBase, type RawServerDefault } from 'fastify';
import { LogAware } from 'src/log/log-aware.js';

/**
 * @description this is simply an alias so that our controllers ignore the server impl
 */
export type Server = FastifyInstance;

/**
 * @description this is simply an alias so that our controllers ignore the server impl
 */
export type Route = RouteGenericInterface;

/**
 * @description
 * this is a custom type for defining our route handlers, copied from fastify
 * but without having to be forcefully bound to the fastify instance, which is
 * anyway accessible by using req.server
 */
export type RouteHandler<
RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
RawServer extends RawServerBase = RawServerDefault,
RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
ContextConfig = ContextConfigDefault,
SchemaCompiler extends FastifySchema = FastifySchema,
TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
Logger extends FastifyBaseLogger = FastifyBaseLogger
> = (
  request: FastifyRequest<RouteGeneric, RawServer, RawRequest, SchemaCompiler, TypeProvider, ContextConfig, Logger>,
  reply: FastifyReply<RawServer, RawRequest, RawReply, RouteGeneric, ContextConfig, SchemaCompiler, TypeProvider>
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => RouteGeneric['Reply'] | void | Promise<RouteGeneric['Reply'] | void>;

export abstract class Controller extends LogAware {
  public abstract mount(app: FastifyInstance): void;
}
