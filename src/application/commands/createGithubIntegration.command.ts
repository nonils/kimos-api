import { ApiProperty } from '@nestjs/swagger';

export default class CreateGithubIntegrationCommand {
  @ApiProperty({
    name: 'state',
    description: 'State returned from Github',
    example: '1234-1234-1235-1235',
  })
  public state: string;
  @ApiProperty({
    name: 'githubInstallationId',
    description: 'Instalation id returned from github',
    example: '1234',
  })
  public githubInstallationId: string;
}
