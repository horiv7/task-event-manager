import { NgModule } from '@angular/core';
import { EventAdapter } from '../models/event.model';
import { APP_CONFIG, APP_DI_CONFIG } from './app.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './url-http-interceptor';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    EventAdapter,
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
