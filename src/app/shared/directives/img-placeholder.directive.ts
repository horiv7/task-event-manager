import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[placeholder]'
})
export class ImgPlaceholderDirective {
  @Input() placeholder: string;

  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  @HostListener('error')
  changeUrl(): void {
    this.renderer.setAttribute(this.element.nativeElement, 'src', this.placeholder);
  }

  @HostListener('load')
  load(): void {
    this.renderer.addClass(this.element.nativeElement, 'image-loaded');
    this.renderer.removeClass(this.element.nativeElement, 'image-loading');
  }

}
