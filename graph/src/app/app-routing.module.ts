import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectNodesComponent } from './components/select-nodes/select-nodes.component';
import { SendFlowComponent } from './components/send-flow/send-flow.component';

const routes: Routes = [
    {path: "step-two", component: SendFlowComponent},
    {path: "step-one", component: SelectNodesComponent},
    {path: "", redirectTo: "/step-one", pathMatch: "full"},
    {path: "**", redirectTo: "/step-one", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
