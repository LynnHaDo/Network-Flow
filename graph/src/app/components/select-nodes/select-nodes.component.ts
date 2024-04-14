import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GraphInitService } from 'src/app/services/graph-init.service';

@Component({
  selector: 'app-select-nodes',
  templateUrl: './select-nodes.component.html',
  styleUrls: ['./select-nodes.component.css'],
})
export class SelectNodesComponent {
  graphFormGroup: FormGroup = this.formBuilder.group({
    source: new FormControl('1', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ]),
    sink: new FormControl('13', [
      Validators.required,
      Validators.pattern('^(0|[1-9][0-9]*)$'),
    ]),
  });

  get source() {
    return this.graphFormGroup.get('source')!;
  }

  get sink() {
    return this.graphFormGroup.get('sink')!;
  }
  constructor(private formBuilder: FormBuilder, private graphInitService: GraphInitService, private router: Router) {}

  // Select source and sink
  onSubmit() {
    this.graphInitService.resetNodes();
    const sourceId = parseInt(this.graphFormGroup.get('source')!.value);
    const sinkId = parseInt(this.graphFormGroup.get('sink')!.value);
    this.graphInitService.highlightNode(parseInt(this.graphFormGroup.get('source')!.value));
    this.graphInitService.highlightNode(parseInt(this.graphFormGroup.get('sink')!.value));
    this.graphInitService.sourceNode = this.graphInitService.cy.nodes('[name' + sourceId + ']')[0];
    this.graphInitService.sinkNode = this.graphInitService.cy.nodes('[name=' + sinkId + ']')[0];
    this.graphInitService.findPathsBetweenSourceAndSink(sourceId, sinkId);
    this.router.navigate(['step-two'])
  }
}
