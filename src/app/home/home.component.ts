import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    const yOffset = -80; // adjust as needed (height of your fixed sidebar or some padding)
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

}
