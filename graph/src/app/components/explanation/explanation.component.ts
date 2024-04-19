import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { GraphInitService } from 'src/app/services/graph-init.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css'],
})
export class ExplanationComponent implements OnInit {
  @Input() sum!: string;
  @Input() aim!: string;
  mathJaxObject!: any;
  constructor(private graphInitServices: GraphInitService, @Inject(DOCUMENT) public document: Document) {}

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
        var currentDate = new Date().toLocaleString().split(",")[0]
        document.getElementById('currentDate')!.textContent = currentDate;
    });
    this.renderMath();
    this.loadMathConfig();
  }

  renderMath(){
    // @ts-ignore
    this.mathJaxObject = this.graphInitServices.nativeGlobal()['MathJax'];
    setTimeout(() => {
      this.mathJaxObject.Hub.Queue(
        ['Typeset', this.mathJaxObject.Hub], "sum", "aim"
      );
    }, 1000);
  }

  loadMathConfig(){
    // @ts-ignore
    this.mathJaxObject  = this.graphInitServices.nativeGlobal()['MathJax'] ;
    this.mathJaxObject.Hub.Config({        
      showMathMenu: false,
      tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]], processEscapes: true},
      menuSettings: { zoom: "Double-Click",zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    });
    this.sum = `$$\\sum_{\\text{e into v}}f(e) = \\sum_{\\text{e out of v}}f(e)$$`;
    this.aim = `In the network flow problem, we want to find the maximum $s-t$ flow $= \\text{flow out of source} = \\text{flow into sink}$ using residual graphs (Ford-Fulkerson algorithm). 
                This project is incomplete since I have yet added the feature to calculate the maximum flow.
                If you have any suggestions, want to report a bug, or contribute any features, please submit a pull request to`
  }

}
