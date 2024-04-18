import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { GraphInitService } from "../services/graph-init.service";
import { inject } from "@angular/core";

export const CanActivateStepTwo: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return GraphInitService.areSourceSinkSet.getValue() ? true : inject(Router).createUrlTree(['/step-one']);
}
