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
    name: 'templateImplementationId',
    description: 'Id of the template implementation (UUID)',
    example: 'faa3b3e0-9f1a-4e1a-8b1a-0b9e2b7b3b3e',
  })
  templateImplementationId: string;
  @ApiProperty({
    name: 'allowsJiraIntegration',
    description: 'If the project allows jira integration',
    example: true,
  })
  allowsJiraIntegration: boolean;
  @ApiProperty({
    name: 'jiraProjectKey',
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
