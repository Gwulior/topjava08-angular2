/**
 * Created by gwuli on 31.10.2016.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {UserMeal} from "../model/userMeal";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidateUtil} from "../validators/validate-util";

@Component({
    templateUrl: '../../templates/meal/meal-edit.html',
    selector: 'edit-meal'
})
export class EditMealComponent {

    showToggle: boolean = false;

    mealForm: FormGroup;

    @Output()
    onSaveEvent: EventEmitter<UserMeal> = new EventEmitter<UserMeal>();

    constructor(private formBuilder: FormBuilder) {
        this.mealForm = formBuilder.group({
            id: [''],
            dateTime: [null, Validators.required],
            description: [``, Validators.required],
            calories: [``, Validators.compose([Validators.required, ValidateUtil.validateCalories])]
        });
    }

    fillMyForm(userMeal: UserMeal) {
        this.mealForm.patchValue(
            userMeal
            // id: [userMeal.id],
            // dateTime: [userMeal.dateTime, Validators.required],
            // description: [userMeal.description, Validators.required],
            // calories: [userMeal.calories, Validators.compose([Validators.required, ValidateUtil.validateCalories])]
        );
    }

    resetForm() {
        this.mealForm.reset();
    }

    onSave() {
        let value = this.mealForm.value;
        this.onSaveEvent.emit(value);
        this.mealForm.reset();
    }


}