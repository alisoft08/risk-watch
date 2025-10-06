import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RiskEntity} from '../domain/model/risk-entity.entity';
import {RiskEntityResource, RiskEntitiesResponse} from './risk-entities-response';
import {RiskEntityAssembler} from './risk-entity-assembler';

const riskEntitiesEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderRiskEntitiesEndpointPath}`;
export class RiskEntitiesApiEndpoint extends BaseApiEndpoint<RiskEntity, RiskEntityResource, RiskEntitiesResponse, RiskEntityAssembler> {
  constructor(http: HttpClient) {
    super(http, riskEntitiesEndpointUrl, new RiskEntityAssembler());
  }
}

