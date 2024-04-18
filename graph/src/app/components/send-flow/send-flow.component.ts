import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as cytoscape from 'cytoscape';
import { BehaviorSubject } from 'rxjs';
import { Vertex } from 'src/app/common/vertex';
import { GraphInitService } from 'src/app/services/graph-init.service';
import { FlowValidator } from 'src/app/validators/flow-validator';

@Component({
  selector: 'app-send-flow',
  templateUrl: './send-flow.component.html',
  styleUrls: ['./send-flow.component.css'],
})
export class SendFlowComponent implements OnInit {
  @Input() msg = 'Select an edge by clicking on the graph.';
  counter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  paths!: Vertex[][];

  selectedEdge!: cytoscape.EdgeSingular;
  edgeSource: BehaviorSubject<number> = new BehaviorSubject<number>(0); // invalid source id (1-indexing)
  edgeTarget: BehaviorSubject<number> = new BehaviorSubject<number>(0); // invalid target id (1-indexing)
  edgeCapacity: BehaviorSubject<number> = new BehaviorSubject<number>(0); // invalid capacity

  isFlowInvalid: boolean = false;
  showForm: boolean = false;
  showFlowInput: boolean = false;
  edgeError: string = 'none';
  flowError: string = 'none';
  flowCalculatedError: boolean = false;
  clicked: boolean = false;
  flowValue!: number;
  sourceTxt!: string;
  sinkTxt!: string;
  selectedEdgeTxt!: string;

  flowFormGroup: FormGroup = this.formBuilder.group({
    flow: new FormControl('0', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
      FlowValidator.checkFlowCapacity(this.edgeCapacity),
    ]),
  });

  get flow() {
    return this.flowFormGroup.get('flow')!;
  }

  flowCalculateGroup: FormGroup = this.formBuilder.group({
    flowVal: new FormControl('0', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ]),
  });

  get flowVal() {
    return this.flowCalculateGroup.get('flowVal')!;
  }

  printPath(path: Vertex[]) {
    var pathStr = '';
    for (let vertex of path) {
      pathStr += vertex.id + ' -> ';
    }
    return pathStr.substring(0, pathStr.length - 4);
  }

  constructor(
    private formBuilder: FormBuilder,
    private graphInitServices: GraphInitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paths = this.graphInitServices.paths;
    this.sourceTxt = this.graphInitServices.sourceNode.id.toString();
    this.sinkTxt = this.graphInitServices.sinkNode.id.toString();

    this.graphInitServices.cy.on('tap', (e) => {
      if (e.target._private.group == 'edges') {
        let sourceId = +e.target._private.data['source'];
        let sinkId = +e.target._private.data['target'];
        if (
          this.graphInitServices.network.isEdgeInPaths(
            sourceId,
            sinkId,
            this.paths
          )
        ) {
          this.graphInitServices.removeHighlightedEdges();
          this.flowFormGroup.reset();
          this.msg = `Edge ${sourceId} -> ${sinkId} selected.`;
          this.showForm = true;
          this.selectedEdge = this.graphInitServices.cy
            .edges()
            .getElementById(e.target._private.data['id']);
          this.edgeSource.next(sourceId);
          this.edgeTarget.next(sinkId);
          this.edgeCapacity.next(
            this.graphInitServices.network.adjMatrix[
              this.edgeSource.getValue()
            ][this.edgeTarget.getValue()].capacity
          );
          this.selectedEdge.addClass('highlighted');
        }
        else {
            this.selectedEdgeTxt = `${sourceId} -> ${sinkId}`;
            this.edgeError = "block";
        }
      }
    });
  }

  isFlowBelowCapacity(): boolean {
    if (
      this.graphInitServices.network.adjMatrix[this.edgeSource.getValue()][
        this.edgeTarget.getValue()
      ].capacity >= this.flow.value
    ) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (
      this.selectedEdge &&
      this.edgeSource.getValue() &&
      this.edgeTarget.getValue()
    ) {
      this.graphInitServices.removeHighlightedEdges();      
      this.graphInitServices.network.adjMatrix[this.edgeSource.getValue()][this.edgeTarget.getValue()].flow = this.flow.value;
      var label = this.selectedEdge.css('label');
      var parts = label.split('/');
      if (parts.length == 2) {
        this.selectedEdge.css('label', this.flow.value + '/' + parts[1]);
      }
      this.counter.next(this.counter.getValue() + 1);
      this.selectedEdge.addClass('selected');
      this.flowFormGroup.reset();
      this.showForm = false;
      this.msg = 'Select an edge by clicking on the graph.';
    }
  }

  calculateFlow() {
    if (!this.graphInitServices.isFlowValid()) {
      this.flowError = 'block';
    } else this.showFlowInput = true;
  }

  compute() {
    if (this.flowVal.value == this.graphInitServices.checkFlowAmount(0)) {
        this.flowCalculatedError = false;
        this.flowValue = this.graphInitServices.checkFlowAmount(0);
        this.clicked = true;
    } else {
        this.flowCalculatedError = true;
        this.clicked = true;
    }
  }

  closeModalFlow() {
    this.flowError = 'none';
  }

  closeModalEdge(){
    this.edgeError = "none";
  }

  goBack() {
    this.graphInitServices.resetNodes();
    this.graphInitServices.resetEdges();
    this.flowFormGroup.reset();
    this.router.navigate(['/step-one']);
  }
}
