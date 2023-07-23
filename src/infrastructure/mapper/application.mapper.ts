import { ApplicationEntity } from '../adapters/repository/application/entity/application.entity';
import { ApplicationM } from '../../domain/models/application.model';
import { Optional } from 'typescript-optional';

export class ApplicationMapper {
  public static toDomain(
    templateInstanceEntity?: ApplicationEntity,
  ): Optional<ApplicationM> {
    if (!templateInstanceEntity) {
      return Optional.empty<ApplicationM>();
    }
    const application = new ApplicationM(
      templateInstanceEntity.id,
      templateInstanceEntity.templateImplementationId,
      templateInstanceEntity.projectId,
    );
    return Optional.of(application);
  }
}
