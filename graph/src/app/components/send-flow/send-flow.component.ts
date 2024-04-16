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

  selectedEdge!: cytoscape.EdgeSingular;
  edgeSource: BehaviorSubject<number> = new BehaviorSubject<number>(0); // invalid source id (1-indexing)
  edgeTarget: BehaviorSubject<number> = new BehaviorSubject<number>(0); // invalid target id (1-indexing)
  edgeCapacity: BehaviorSubject<number> = new BehaviorSubject<number>(0); // invalid capacity

  isFlowInvalid: boolean = false;
  showForm: boolean = false;
  showFlowInput: boolean = false;
  flowError: string = "none";

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
        Validators.pattern('^(0|[1-9][0-9]*)$')
    ]),
  })

  get flowVal() {
    return this.flowCalculateGroup.get('flowVal')!;
  }

  constructor(
    private formBuilder: FormBuilder,
    private graphInitServices: GraphInitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.graphInitServices.cy.on('tap', (e) => {
      if (e.target._private.group == 'edges') {
        this.graphInitServices.removeHighlightedEdges();
        this.flowFormGroup.reset();
        this.msg = `Edge ${e.target._private.data['source']} -> ${e.target._private.data['target']} selected.`;
        this.showForm = true;
        this.selectedEdge = this.graphInitServices.cy
          .edges()
          .getElementById(e.target._private.data['id']);
        this.edgeSource.next(+e.target._private.data['source']);
        this.edgeTarget.next(+e.target._private.data['target']);
        this.edgeCapacity.next(
          this.graphInitServices.network.adjMatrix[this.edgeSource.getValue()][
            this.edgeTarget.getValue()
          ].capacity
        );
        this.selectedEdge.addClass('highlighted');
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
      this.graphInitServices.network.adjMatrix[this.edgeSource.getValue()][
        this.edgeTarget.getValue()
      ].flow = this.flow.value;
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
    if (!this.graphInitServices.isFlowValid()){
        this.flowError = "block";
    } else this.showFlowInput = true;
  }

  compute(){
    
  }

  closeModal(){
    this.flowError = "none";
  }

  goBack() {
    this.graphInitServices.resetNodes();
    this.graphInitServices.resetEdges();
    this.flowFormGroup.reset();
    this.router.navigate(['/step-one']);
  }
}
