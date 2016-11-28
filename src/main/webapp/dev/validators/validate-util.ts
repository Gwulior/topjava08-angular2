/**
 * Created by gwuli on 27.11.2016.
 */
import {FormControl} from "@angular/forms";

export class ValidateUtil {

    static  validateCalories(formControl: FormControl) {
        console.log("validator minmax");
        if (formControl.value < 10 || formControl.value > 5000) {
            return {error : true}
        }
        return null;
    }
}

