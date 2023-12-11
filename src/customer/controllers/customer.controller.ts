import { type Logger } from 'pino';
import { type IdParamsDto, IdParamsDtoSchema } from 'src/common/dtos/id-params.dto.js';
import { Controller, type Server, type RouteHandler, type Route } from 'src/server/controller.js';
import { ErrorStatusCode } from 'src/error/error-with-code.js';
import { type CustomerDto, CustomerDtoSchema } from '../dtos/customer.dto.js';
import { type CustomerService } from '../services/customer.service.js';
import { CustomerNotFoundError } from '../errors/customer-not-found.error.js';
import { CustomerConflictError, CustomerConflictErrorSchema } from '../errors/customer-conflict.error.js';

export interface GetByIdRoute extends Route {
  Params: IdParamsDto
  Reply: CustomerDto
}

export class CustomerController extends Controller {
  constructor(
    private readonly service: CustomerService,
    logger: Logger
  ) {
    super(logger);
  }

  public mount(app: Server): void {
    app.get(
      '/customer/:id',
      {
        schema: {
          params: IdParamsDtoSchema,
          response: {
            200: CustomerDtoSchema
          }
        }
      },
      this.getById
    );

    app.post(
      '/customer',
      {
        schema: {
          response: {
            [ErrorStatusCode.CONFLICT]: CustomerConflictErrorSchema
          }
        }
      },
      this.create
    );
  }

  public getById: RouteHandler<GetByIdRoute> = async (req, res) => {
    const customer = await this.service.getById(req.params.id);
    if (customer === null) {
      throw new CustomerNotFoundError();
    }

    await res.send(customer);
  };

  public create: RouteHandler = async () => {
    throw new CustomerConflictError('something');
  };
}
