import { CodeVersionManagerProviderM } from '../models';

export interface CodeVersionManagerProviderRepositoryInterface {
  getAllCodeVersionManagerProviders(): Promise<CodeVersionManagerProviderM[]>;
}
