import { CloudProviderM } from '../models';

export interface CloudProviderRepositoryInterface {
  getAllCloudProviders(): Promise<CloudProviderM[]>;
  getCloudProviderById(id: string): Promise<CloudProviderM>;
}
