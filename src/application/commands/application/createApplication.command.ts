import { ApiProperty } from '@nestjs/swagger';

export default class CreateApplicationCommand {
  @ApiProperty({
    name: 'name',
    description: 'Name of the application',
    example: 'New Application name',
  })
  name: string;
  @ApiProperty({
    name: 'description',
    description: 'Description of the application',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;
  @ApiProperty({
    name: 'projectId',
    description: 'Project uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  projectId: string;
  @ApiProperty({
    name: 'isPrivateRepo',
    description: 'Is the repository private for this app?',
    example: 'true',
  })
  isPrivateRepo: boolean;
  @ApiProperty({
    name: 'allowsJiraIntegration',
    description: 'Does the app allow Jira integration?',
    example: 'true',
  })
  allowsJiraIntegration: boolean;
  @ApiProperty({
    name: 'jiraKey',
    description: 'Jira project key',
    example: 'TEST',
  })
  jiraKey: string;
  @ApiProperty({
    name: 'jiraProjectName',
    description: 'Jira project name',
    example: 'Test',
  })
  jiraProjectName: string;
  @ApiProperty({
    name: 'string',
    description: 'Repository name',
    example: 'test-repo',
  })
  repositoryName: string;
  @ApiProperty({
    name: 'templateId',
    description: 'Template uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  templateId: string;
  @ApiProperty({
    name: 'templateImplementationId',
    description: 'Template implementation uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  templateImplementationId: string;
}
