import { CICDProviderM } from '../models';

export interface CICDProviderRepositoryInterface {
  getAllCICDProvider(): Promise<CICDProviderM[]>;
  getCICDProviderById(id: string): Promise<CICDProviderM>;
}
