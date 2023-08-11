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
}
