import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectNodesComponent } from './components/select-nodes/select-nodes.component';
import { SendFlowComponent } from './components/send-flow/send-flow.component';
import { ExplanationComponent } from './components/explanation/explanation.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectNodesComponent,
    SendFlowComponent,
    ExplanationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
