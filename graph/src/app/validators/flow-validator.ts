import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export class FlowValidator {
    static checkFlowCapacity(capacity: BehaviorSubject<number>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (capacity.getValue() != 0){
                const violated = capacity.getValue() < parseInt(control.value);
                return violated? {"checkFlowCapacity": true} : null;
            }
            return null
        }
    }

    static checkSourceSinkId(numVertices: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const violated = parseInt(control.value) > numVertices || parseInt(control.value) <= 0;
            return violated? {"checkSourceSinkId": true} : null;
        }
    } 
}
