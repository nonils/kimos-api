import { ApiProperty } from '@nestjs/swagger';

export default class CreateProjectCommand {
  @ApiProperty({
    name: 'name',
    description: 'Name of the project',
    example: 'New Project name',
  })
  name: string;
  @ApiProperty({
    name: 'description',
    description: 'Description of the project',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;
  @ApiProperty({
    name: 'isPrivateRepo',
    description: 'If the project is private or public',
    example: true,
  })
  isPrivateRepo: boolean;
  @ApiProperty({
    name: 'repositoryName',
    description:
      'Name of the repository. Without spaces. (If you use spaces or invalid characters for the code version manager provider, it will be replaced or skipped)',
    example: 'a-beautiful-name',
  })
  repositoryName: string;
  @ApiProperty({
    name: 'repositoryName',
    description: 'Key of the project in JIRA. (Just 3 or 4 characters)',
    example: 'TEST',
  })
  jiraProjectKey: string;
  @ApiProperty({
    name: 'jiraProjectName',
    description:
      'Name of the project . Without spaces. (If you use spaces or invalid characters for the code version manager provider, it will be replaced or skipped)',
    example: 'a-beautiful-name',
  })
  jiraProjectName: string;
  @ApiProperty({
    name: 'organizationId',
    description:
      'If the project should be created by an organization this param should be sent. As default we take the account as owner',
  })
  organizationId?: string;
}
