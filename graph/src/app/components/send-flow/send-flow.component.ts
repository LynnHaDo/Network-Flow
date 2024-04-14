import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';
import * as cytoscape from 'cytoscape';
import { BehaviorSubject } from 'rxjs';
import { GraphInitService } from 'src/app/services/graph-init.service';

@Component({
  selector: 'app-send-flow',
  templateUrl: './send-flow.component.html',
  styleUrls: ['./send-flow.component.css']
})
export class SendFlowComponent implements OnInit {
    @Input() msg = 'Select an edge by clicking on the graph.';
    counter: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    showForm: boolean = false;
    selectedEdge!: cytoscape.EdgeSingular;
    
    flowFormGroup: FormGroup = this.formBuilder.group({
        flow: new FormControl('0', [
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$'),
          ]),
      });

    get flow(){
        return this.flowFormGroup.get('flow')!;
    }
    
    constructor(private formBuilder: FormBuilder, private graphInitServices: GraphInitService){}

    ngOnInit(): void {
        /*this.graphInitServices.cy.on('tap', (e) => {
            if (e.target._private.group == "edges"){
                this.msg = `Edge ${e.target._private.data['source']} -> ${e.target._private.data['target']} selected.`
                this.showForm = true;
                this.selectedEdge = this.graphInitServices.cy.edges().getElementById(e.target._private.data['id']);
                this.selectedEdge.addClass("highlighted");
            } 
        })*/
    }

    onSubmit(){
        if (this.selectedEdge){
            var label = this.selectedEdge.css('label')
            var parts = label.split("/")
            if (parts.length == 2){
                this.selectedEdge.css('label', this.flow.value + "/" + parts[1])
            }
            this.counter.next(this.counter.getValue() + 1)
            this.selectedEdge.removeClass("highlighted");
            this.selectedEdge.addClass("selected");
            this.showForm = false;
            this.msg = "Select an edge by clicking on the graph."
        }
    }
}
