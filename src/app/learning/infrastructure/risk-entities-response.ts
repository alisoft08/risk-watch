import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

export interface RiskEntityResource extends BaseResource{
  name: string;
  jurisdiction: string;
  linkedTo: string;
  dataSource: string;
}

export interface RiskEntitiesResponse extends BaseResponse{
  riskEntities: RiskEntityResource[];
}

