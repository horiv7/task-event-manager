import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Directive({
  selector: '[appMediaQueryMatcher]'
})
export class MediaQueryMatcherDirective implements OnInit, OnDestroy {

  @Input('appMediaQueryMatcher') mediaQuery = '(min-width: 64em)';
  @Output() queryChange = new EventEmitter<MediaQueryList>();
  mediaQueryList: MediaQueryList;
  private mediaQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, mediaMatcher: MediaMatcher) {
    this.mediaQueryList = mediaMatcher.matchMedia(this.mediaQuery);
    this.mediaQueryListener = () => changeDetectorRef.detectChanges();
    this.mediaQueryList.addEventListener('change', this.mediaQueryListener);
    this.mediaQueryList.onchange = () => {
      this.queryChange.emit(this.mediaQueryList);
    };
  }

  ngOnInit(): void {
    this.queryChange.emit(this.mediaQueryList);
  }

  ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
  }

}
