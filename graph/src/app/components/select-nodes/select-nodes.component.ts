import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GraphInitService } from 'src/app/services/graph-init.service';
import { FlowValidator } from 'src/app/validators/flow-validator';

@Component({
  selector: 'app-select-nodes',
  templateUrl: './select-nodes.component.html',
  styleUrls: ['./select-nodes.component.css'],
})
export class SelectNodesComponent implements OnInit {
  graphFormGroup: FormGroup = this.formBuilder.group({
    source: new FormControl('1', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
      FlowValidator.checkSourceSinkId(this.graphInitService.vertices.length)
    ]),
    sink: new FormControl('13', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
      FlowValidator.checkSourceSinkId(this.graphInitService.vertices.length)
    ]),
  });

  displayStyle: string = "none";

  get source() {
    return this.graphFormGroup.get('source')!;
  }

  get sink() {
    return this.graphFormGroup.get('sink')!;
  }
  constructor(private formBuilder: FormBuilder, private graphInitService: GraphInitService, private router: Router) {}

  ngOnInit(): void {
     GraphInitService.areSourceSinkSet.next(false);
  }

  // Select source and sink
  onSubmit() {
    this.graphInitService.resetNodes();
    const sourceId = parseInt(this.graphFormGroup.get('source')!.value);
    const sinkId = parseInt(this.graphFormGroup.get('sink')!.value);
    if (!this.graphInitService.network.areTwoNodesConnected(sourceId, sinkId)){
        this.displayStyle = "block";
        return;
    }
    this.graphInitService.highlightNode(sourceId);
    this.graphInitService.highlightNode(sinkId);
    this.graphInitService.setSourceandSink(sourceId, sinkId);
    this.graphInitService.findPathsBetweenSourceAndSink();
    this.router.navigate(['step-two'])
  }

  closeModal(){
    this.displayStyle = "none";
  }
}
