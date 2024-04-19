import { OnInit, Component, Inject, ViewChild, ElementRef } from '@angular/core';
import * as cytoscape from 'cytoscape';
import { GraphInitService } from './services/graph-init.service';
import { Vertex } from './common/vertex';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cy: cytoscape.Core = this.graphInitServices.getGraph();
  paths!: Vertex[][];
  sourceTxt!: string;
  sinkTxt!: string;

  mediaPhoneS = window.matchMedia("(max-width: 530px)");
  mediaPhone = window.matchMedia("(max-width: 694px)");
  mediaTabletS = window.matchMedia("(max-width: 695px)");
  mediaTablet = window.matchMedia("(max-width: 1100px)");
  mediaDesktopSmall = window.matchMedia("(max-width: 1300px)");
  
  constructor(private graphInitServices: GraphInitService){}

  ngOnInit(): void {
    this.adjustMediaDisplay();
    this.graphInitServices.makeGraph();
    if (this.graphInitServices.sourceNode != undefined && this.graphInitServices.sinkNode != undefined){
        this.paths = this.graphInitServices.paths;
        this.sourceTxt = this.graphInitServices.sourceNode.id.toString();
        this.sinkTxt = this.graphInitServices.sinkNode.id.toString();
    }
  }

  adjustMediaDisplay(){
    this.editMediaDisplayPhoneS(this.mediaPhoneS);
    this.mediaPhoneS.addEventListener("change", () => {
        this.editMediaDisplayPhoneS(this.mediaPhoneS);
    })
    this.editMediaDisplayPhone(this.mediaPhone);
    this.mediaPhone.addEventListener("change", () => {
        this.editMediaDisplayPhone(this.mediaPhone)
    })
    this.editMediaDisplayTabletS(this.mediaTabletS);
    this.mediaTabletS.addEventListener("change", () => {
        this.editMediaDisplayTabletS(this.mediaTabletS)
    })
    this.editMediaDisplayTablet(this.mediaTablet);
    this.mediaTablet.addEventListener("change", () => {
        this.editMediaDisplayTablet(this.mediaTablet);
    })
    this.editMediaDisplayDesktop(this.mediaDesktopSmall);
    this.mediaDesktopSmall.addEventListener("change", () => {
        this.editMediaDisplayDesktop(this.mediaDesktopSmall)
    })
  }

  editMediaDisplayDesktop(x: any){
    if (x.matches){
        this.graphInitServices.panX = -90;
    } else {
        this.graphInitServices.panX = -40;
    }
    this.graphInitServices.makeGraph();
  }

  editMediaDisplayTablet(x: any){
    if (x.matches){
        this.graphInitServices.panX = -80;
        this.graphInitServices.zoomLevel = 0.9;
    } else {
        this.graphInitServices.panX = -40;
        this.graphInitServices.zoomLevel = 1;
    }
    this.graphInitServices.makeGraph();
  }

  editMediaDisplayTabletS(x: any){
    if (x.matches){
        this.graphInitServices.panX = -80;
        this.graphInitServices.zoomLevel = 0.8;
    } else {
        this.graphInitServices.panX = -40;
        this.graphInitServices.zoomLevel = 1;
    }
    this.graphInitServices.makeGraph();
  }

  editMediaDisplayPhone(x: any){
    if (x.matches){
        this.graphInitServices.panX = -100;
        this.graphInitServices.panY = 20;
        this.graphInitServices.zoomLevel = 0.7;
    } else {
        this.graphInitServices.panX = -40;
        this.graphInitServices.zoomLevel = 1;
    }
    this.graphInitServices.makeGraph();
  }

  editMediaDisplayPhoneS(x: any){
    if (x.matches){
        this.graphInitServices.panX = -60;
        this.graphInitServices.panY = 20;
        this.graphInitServices.zoomLevel = 0.7;
    } else {
        this.graphInitServices.panX = -40;
        this.graphInitServices.zoomLevel = 1;
    }
    this.graphInitServices.makeGraph();
  }

}
