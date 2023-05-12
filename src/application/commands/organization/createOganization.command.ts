import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationCommand {
  @ApiProperty({
    name: 'email',
    description: 'Public email that will be used to contact the organization',
    example: 'test@test.com',
  })
  email: string;

  @ApiProperty({
    name: 'name',
    description: 'Name of the organizatiokn',
    example: 'Test name organization',
  })
  name: string;

  @ApiProperty({
    name: 'imageUrl',
    description:
      'Image url of the image that will be used to display in the organization profile',
    example: 'https://test.com/image.png',
  })
  imageUrl: string;

  @ApiProperty({
    name: 'description',
    description:
      'A short description about the organization that will be displayed in the organization profile',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  description: string;

  @ApiProperty({
    name: 'url',
    description:
      'Url of the web that will be used to display in the organization profile',
    example: 'https://test.com',
  })
  url: string;

  @ApiProperty({
    name: 'billingEmail',
    description:
      'Email that will be used to send the billing information of the organization',
    example: 'billing.test@test.com',
  })
  billingEmail: string;
  @ApiProperty({
    name: 'plan',
    description:
      'Plan that will be used to send the billing information of the organization',
    example: 'FREE',
  })
  plan: string;
}
