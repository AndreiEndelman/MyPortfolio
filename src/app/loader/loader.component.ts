import { Component, ChangeDetectorRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  messages = [
    'software engineer.',
    'full stack developer.',
    'technophile.'
  ];
  rotatingText = this.messages[0];
  private msgIndex = 0;
  fadeState: 'in' | 'out' = 'in';


  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.startRotation();
  }

  startRotation() {
    setInterval(() => {
      this.fadeState = 'out';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.msgIndex = (this.msgIndex + 1) % this.messages.length;
        this.rotatingText = this.messages[this.msgIndex];
        this.fadeState = 'in';
        this.cdr.detectChanges();
      }, 500); // fade out duration
    }, 2500); // message display duration
  }

  continue() {
    this.router.navigate(['/home']);
  }
}
