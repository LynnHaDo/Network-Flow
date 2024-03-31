import {
  OnInit,
  Component,
  Input,
} from '@angular/core';

import * as p5 from 'p5';

// Reference: https://github.com/andresrodriguez55/algorithmsVisualizer/blob/gh-pages/src/Pages/Graphs/SketchGraphs.js

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input() title = 'Network Flow';
  private sketch!: p5;

  // Define screen parameters
  screenWidth!: number;
  screenHeight!: number;

  ngOnInit(): void {}

  // Run the algorithm
  runMaxFlow(){
    
  }
}