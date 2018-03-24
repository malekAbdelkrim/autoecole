import { Routes } from "@angular/router";
import{ AccueilPromoComponent } from "./accueilPromo.component";
import{ PromotionComponent } from "./promotion.component";


export const PROMO_ROUTES: Router = [
	{path: 'updatePromo', component: PromotionComponent }
];