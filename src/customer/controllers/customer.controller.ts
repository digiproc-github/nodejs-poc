import { type Logger } from 'pino';
import { type IdParamsDto, IdParamsDtoSchema } from 'src/common/dtos/id-params.dto.js';
import { Controller, type Server, type RouteHandler, type Route } from 'src/server/controller.js';
import { type CustomerDto, CustomerDtoSchema } from '../dtos/customer.dto.js';
import { type CustomerService } from '../services/customer.service.js';

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
      this.getCustomer
    );
  }

  public getCustomer: RouteHandler<GetByIdRoute> = async () => {
    throw new Error('not implemented');
  };
}
