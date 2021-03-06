import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService, Theme } from '../../../../core/services';

@Component({
  selector: 'memer-gif-options',
  templateUrl: './gif-options.component.html',
  styleUrls: ['./gif-options.component.scss']
})
export class GifOptionsComponent implements OnInit, OnDestroy {
  @Input() options: string[];
  @Input() playerCanSelect: boolean;
  @Input() usernameSelecting: string;
  @Input() chosenTag: string;
  @Output() optionSelect = new EventEmitter<string>();

  get isDarkTheme() { return this.themeService.theme === Theme.DARK; }

  imageIndex = 0;
  selectingIndicator = 'SELECTING   ';
  timerId;
  wildcardImage = 'assets/wildcard.png';

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.timerId = setInterval(() => {
      if (this.selectingIndicator.includes('...')) {
        this.selectingIndicator = 'SELECTING   ';
      } else {
        this.selectingIndicator = this.selectingIndicator.replace(' ', '.');
      }
    }, 1000);
  }

  next(): void {
    if (!this.playerCanSelect) { return; }
    this.imageIndex += 1;
    if (this.imageIndex >= this.options.length) {
      this.imageIndex = 0;
    }
  }

  previous(): void {
    if (!this.playerCanSelect) { return; }

    this.imageIndex -= 1;
    if (this.imageIndex < 0) {
      this.imageIndex = (this.options.length - 1);
    }
  }

  selectOption(option: string) {
    if (!this.playerCanSelect) { return; }
    this.optionSelect.emit(option);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
