import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrganizationM } from 'domain/models';
import { CreateOrganizationUsecase } from '../../application/usecases/organizations/createOrganization.usecase';
import { CreateOrganizationCommand } from '../../application/commands/organization/createOganization.command';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/api/v1/organizations')
export default class OrganizationController {
  constructor(
    private readonly createOrganizationUsecase: CreateOrganizationUsecase,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async createOrganization(
    @Req() request,
    @Body() organizationCommand: CreateOrganizationCommand,
  ): Promise<OrganizationM> {
    return this.createOrganizationUsecase.handler(organizationCommand);
  }
}
