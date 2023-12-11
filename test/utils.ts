import { type RouteGenericInterface, type FastifyReply, type FastifyRequest, type RawServerDefault, type RawRequestDefaultExpression, type RawReplyDefaultExpression, type ContextConfigDefault, type FastifySchema, type FastifyTypeProviderDefault } from 'fastify';
import { type ResolveFastifyReplyType } from 'fastify/types/type-provider.js';
import { type Logger } from 'pino';
import { vi } from 'vitest';

export function getLoggerMock(): Logger {
  return {
    child: vi.fn().mockReturnThis(),
    trace: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn()
  } as any as Logger;
}

export function getRequestMock<T extends RouteGenericInterface = RouteGenericInterface>({
  params,
  query,
  body
}: {
  params?: Record<string, any>
  query?: Record<string, any>
  body?: Record<string, any>
} = {}): FastifyRequest<T> {
  return {
    params: params ?? {},
    query: query ?? {},
    body: body ?? {}
  } as any as FastifyRequest<T>;
}

export function getReplyMock<T extends RouteGenericInterface = RouteGenericInterface>(): FastifyReply<
RawServerDefault,
RawRequestDefaultExpression<RawServerDefault>,
RawReplyDefaultExpression<RawServerDefault>,
T,
ContextConfigDefault,
FastifySchema,
FastifyTypeProviderDefault,
ResolveFastifyReplyType<FastifyTypeProviderDefault, FastifySchema, T>
> {
  return {
    status: vi.fn().mockReturnThis(),
    send: vi.fn().mockResolvedValue(undefined)
  } as any as FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  T,
  ContextConfigDefault,
  FastifySchema,
  FastifyTypeProviderDefault,
  ResolveFastifyReplyType<FastifyTypeProviderDefault, FastifySchema, T>>;
}
