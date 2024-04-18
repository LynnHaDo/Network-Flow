import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectNodesComponent } from './components/select-nodes/select-nodes.component';
import { SendFlowComponent } from './components/send-flow/send-flow.component';
import { CanActivateStepTwo } from './common/can-activate-step-two';

const routes: Routes = [
    {path: "step-two", component: SendFlowComponent, canActivate: [CanActivateStepTwo]},
    {path: "step-one", component: SelectNodesComponent},
    {path: "", redirectTo: "/step-one", pathMatch: "full"},
    {path: "**", redirectTo: "/step-one", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
