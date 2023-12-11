import { Controller, type Server, type RouteHandler, type Route } from 'src/server/controller.js';
import { type IdParamsDto, IdParamsDtoSchema } from 'src/common/dtos/id-params.dto.js';
import { type Logger } from 'pino';
import { SupplierDtoSchema } from '../dtos/supplier.dto.js';
import { type SupplierService } from '../services/supplier.service.js';

interface GetByIdRoute extends Route {
  Params: IdParamsDto
}

export class SupplierController extends Controller {
  constructor(
    private readonly supplierService: SupplierService,
    logger: Logger
  ) {
    super(logger);
  }

  public mount(app: Server): void {
    app.get(
      '/supplier/:id',
      {
        schema: {
          params: IdParamsDtoSchema,
          response: {
            200: SupplierDtoSchema
          }
        }
      },
      this.getById
    );
  }

  public getById: RouteHandler<GetByIdRoute> = async (req, res) => {
    const supplier = await this.supplierService.getById(req.params.id);
    if (supplier === null) {
      throw new SupplierNotFoundError();
    }

    await res.send(supplier);
  };
}
