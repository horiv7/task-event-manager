import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WebApiService } from './web-api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(WebApiService)
  ]
})
export class WebApiModule { }
