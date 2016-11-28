import {Component, ViewChild} from "@angular/core";
import {MealService} from "./meal.service";
import {Observable} from "rxjs";
import {UserMeal} from "../model/userMeal";
import {FormBuilder} from "@angular/forms";
import {EditMealComponent} from "./meal-edit.component";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    selector: 'meal-list',
    templateUrl: './templates/meal/meal-list.html'
})
export class MealListComponent {

    mealsHolder: Observable<UserMeal[]>;

    @ViewChild(EditMealComponent)
    private editMealChild: EditMealComponent;

    constructor(private mealService: MealService,
                private formBuilder: FormBuilder) {
    }

    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;

    ngOnInit() {
        console.log("meals init");
        this.mealsHolder = this.mealService.loadAllMeals();
    }

    updateList() {
        console.log("meals update");
        this.mealsHolder = this.mealService.loadAllMeals();
    }

    deleteItem(meal: UserMeal) {
        this.mealService.deleteMeal(meal).subscribe(res => {
            this.updateList();
        });
    }

    showCreateModal() {
        this.editMealChild.resetForm();
        this.editMealChild.showToggle = true;
    }

    selectMeal(meal) {
        this.editMealChild.showToggle = true;
        this.editMealChild.fillMyForm(meal.data);
    }

    save(userMeal: UserMeal) {
        this.editMealChild.showToggle = false;
        this.mealService.save(userMeal).subscribe(
            res => {
                this.updateList();
            }
        );
    }

    onFilter() {
        this.mealsHolder = this.mealService.getFilteredDataSet(
            this.startDate,
            this.endDate,
            this.startTime,
            this.endTime);
    }

    clearFilters() {
        this.startDate = null;
        this.endDate = null;
        this.startTime = null;
        this.endTime = null;
        this.updateList();
    }

}