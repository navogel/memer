import { Component, Input, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Card, Meme } from '../../../../interfaces';

@Component({
  selector: 'memer-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent implements AfterViewInit {
  @Input() meme: Meme = { top: null, bottom: '????' };
  @ViewChild('memeEl', { static: false }) memeEl: ElementRef;
  @ViewChild('memetop', { static: false }) topCaption: ElementRef;
  @ViewChild('memeimg', { static: false }) img: ElementRef;
  @ViewChild('memebottom', { static: false }) bottomCaption: ElementRef;
  get cssBackgroundImageValue() { return `url(${this.meme.photoURL})`; }

  private maxFontSize = 62;
  private maxHeight = 80;

  constructor(private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    if (!this.topCaption || !this.bottomCaption) { return; }

    const imgWidth = this.getElementWidth(this.img);

    this.renderer.setStyle(this.topCaption.nativeElement, 'width', `${imgWidth}px`);
    this.renderer.setStyle(this.bottomCaption.nativeElement, 'width', `${imgWidth}px`);

    const topHeight = this.getElementHeight(this.topCaption);
    const bottomHeight = this.getElementHeight(this.bottomCaption);

    if (topHeight > this.maxHeight) {
      this.scaleDownFont(this.topCaption);
    }

    if (bottomHeight > this.maxHeight) {
      this.scaleDownFont(this.bottomCaption);
    }

  }

  private scaleDownFont(captionRef: ElementRef) {
    let fontSize = this.maxFontSize;
    this.renderer.setStyle(captionRef.nativeElement, 'font-size', `${fontSize}px`);

    while (this.getElementHeight(captionRef) > this.maxHeight) {
      fontSize -= 4;
      this.renderer.setStyle(captionRef.nativeElement, 'font-size', `${fontSize}px`);
    }
  }

  private getElementWidth(elRef: ElementRef) {
    if (!elRef) { return; }

    return elRef.nativeElement.offsetWidth;
  }

  private getElementHeight(elRef: ElementRef) {
    if (!elRef) { return; }

    return elRef.nativeElement.offsetHeight;
  }
}
