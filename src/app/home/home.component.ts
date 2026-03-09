import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  activeSection: string = 'about';
  private readonly observers: IntersectionObserver[] = [];

  ngAfterViewInit() {
    // Active section tracking
    const sections = ['about', 'experience', 'projects'];
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });
    this.observers.push(navObserver);

    // Scroll entrance animations
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in-item').forEach(el => fadeObserver.observe(el));
    this.observers.push(fadeObserver);
  }

  ngOnDestroy() {
    this.observers.forEach(o => o.disconnect());
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
