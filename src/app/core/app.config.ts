
import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export interface AppConfig {
  API_URL: string;
}

export const APP_DI_CONFIG: AppConfig = {
  API_URL: environment.API_URL
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
