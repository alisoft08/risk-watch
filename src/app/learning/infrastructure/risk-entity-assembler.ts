import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {RiskEntitiesResponse, RiskEntityResource} from './risk-entities-response';
import {RiskEntity} from '../domain/model/risk-entity.entity';


export class RiskEntityAssembler implements BaseAssembler<RiskEntity, RiskEntityResource, RiskEntitiesResponse> {
  toEntitiesFromResponse(response: RiskEntitiesResponse): RiskEntity[] {
    return response.riskEntities.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: RiskEntityResource): RiskEntity {
    return new RiskEntity({
      name: resource.name,
      jurisdiction: resource.jurisdiction,
      linkedTo: resource.linkedTo,
      dataSource: resource.dataSource
    });
  }

  toResourceFromEntity(entity: RiskEntity): RiskEntityResource {
    return {
      name: entity.name,
      jurisdiction: entity.jurisdiction,
      linkedTo: entity.linkedTo,
      dataSource: entity.dataSource
    };
  }
}

