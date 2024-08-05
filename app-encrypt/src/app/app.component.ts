import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment as prod } from '../environments/environment.prod';
import { environment as dev } from '../environments/environment.development';
import { environment as local } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'app-encrypt';

  ngOnInit(): void {
    console.log('prod: ', prod.title);
    console.log('dev: ', dev.title);
    console.log('prod: ', local.title);
  }
}
