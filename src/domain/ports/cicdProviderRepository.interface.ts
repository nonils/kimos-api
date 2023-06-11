import { CICDProviderM } from '../models';

export interface CICDProviderRepositoryInterface {
  getAllCICDProviders(): Promise<CICDProviderM[]>;
  getCICDProviderById(id: string): Promise<CICDProviderM>;
}
