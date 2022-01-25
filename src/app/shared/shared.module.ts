import { NgModule } from '@angular/core';
import { MediaQueryMatcherDirective } from './directives/media-query-matcher.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ImgPlaceholderDirective } from './directives/img-placeholder.directive';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    MediaQueryMatcherDirective,
    ConfirmDialogComponent,
    ImgPlaceholderDirective,
    SearchPipe,
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    MediaQueryMatcherDirective,
    ConfirmDialogComponent,
    ImgPlaceholderDirective,
    SearchPipe,
  ]
})
export class SharedModule { }
