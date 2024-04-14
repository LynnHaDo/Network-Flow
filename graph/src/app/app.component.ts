import { OnInit, Component } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { GraphInitService } from './services/graph-init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cy: cytoscape.Core = this.graphInitService.getGraph();
  sourceNode: cytoscape.NodeSingular = this.graphInitService.sourceNode;
  sinkNode: cytoscape.NodeSingular = this.graphInitService.sinkNode;

  ngOnInit(): void {
    
    this.graphInitService.makeGraph();
    this.graphInitService.highlightSourceAndSink();
  }

  constructor(private graphInitService: GraphInitService) {}


}
