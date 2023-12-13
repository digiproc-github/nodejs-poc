import { type Logger } from 'pino';
import type Ajv from 'ajv';
import type Emittery from 'emittery';
import { type UnsubscribeFunction } from 'emittery';
import { type Static, Type, type TSchema } from '@sinclair/typebox';
import { LogAware } from 'src/log/log-aware.js';
import { DateInputSchema } from 'src/common/schemas.js';

export type GenericEventName = `${string}/${string}`;

/**
 * @description the event schema has always a reference date,
 * bear in mind that as events can be JSON serialized.
 * All dates MUST be represented as ISO8061 strings (date-time format)
 */
export const GenericEventSchema = Type.Object({
  name: Type.String({ pattern: '^.+/.+$' }),
  refDate: DateInputSchema,
  data: Type.Optional(Type.Any())
});

export type GenericEvent = Omit<Static<typeof GenericEventSchema>, 'name'> & {
  name: GenericEventName
};

export type Listener<E extends GenericEvent> = (event: E) => Promise<void>;

/**
 * @description a generic event bus that supports async event handlers
 * and schema validation of events through Ajv (JSON schema validator).
 * This means that all our events MUST be JSON serializable and have a related schema,
 * defined using typebox.
 *
 * This allows us to migrate the event bus to support different transports like:
 * - redis bullMQ messages
 * - native cloud pub/sub like the one from GCP
 * - other distributed message queue systems
 */
export class EventBus extends LogAware {
  constructor(
    private readonly ajv: Ajv.default,
    private readonly emitter: Emittery,
    logger: Logger
  ) {
    super(logger);
  }

  async emit<E extends GenericEvent>(event: E): Promise<void> {
    if (this.emitter.listenerCount(event.name) < 1) {
      this.logger.error({ event }, 'event doesn\'t have any handler: failing emit');
      throw new Error(`no event handler associated to event "${event.name}"`);
    }

    await this.emitter.emit(event.name, event);
  }

  on<E extends GenericEvent>(name: E['name'], fn: Listener<E>, schema?: TSchema): UnsubscribeFunction {
    if (schema !== undefined) {
      const compiledSchema = this.ajv.compile<E>(schema);

      return this.emitter.on(name, async (event) => {
        this.logger.debug({ event }, 'validating and converting the event');
        const isValid = compiledSchema(event);
        if (!isValid) {
          this.logger.error({ event, errors: compiledSchema.errors, schema }, 'error validating the event');
          throw new Error(`event of type ${event?.name}" is invalid`);
        }

        await fn(event);
      });
    }

    return this.emitter.on(name, fn);
  }
}
