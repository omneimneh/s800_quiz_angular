import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIcon, NgIf, MatIconButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 's800_quiz';
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.url);
      }
    });
  }

  backButtonVisible() {
    return this.history.length > 1;
  }

  async back() {
    this.history.pop();
    try {
      if (this.history.length > 0) {
        const url = this.history.pop() as string;
        await this.router.navigateByUrl(url);
      } else {
        await this.router.navigateByUrl("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
