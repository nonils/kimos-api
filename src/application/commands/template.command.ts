import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class TemplateCommand {
  @ApiProperty({
    name: 'name',
    description: 'Name of the template',
    example: 'Template 1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the template',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  public description: string;
  @ApiProperty({
    name: 'technologies',
    description: 'Technologies related to the template',
    example: ['Angular', 'NestJS'],
  })
  public technologies: string[];
}
