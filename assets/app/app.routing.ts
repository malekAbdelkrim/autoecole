import { Routes, RouterModule } from "@angular/router";

import { AUTO_ROUTES } from "./autoecole/auto.routes";
import { AUTH_ROUTES } from "./client/auth/auth.routes";
import { PACK_ROUTES } from "./pack/pack.routes";

import { AutoComponent } from "./autoecole/auto.component";
import { AuthentificationComponent } from "./client/auth/authentification.component";

import{ AccueilPromoComponent } from "./promotion/accueilPromo.component";
import{ PromotionComponent } from "./promotion/promotion.component";


import{ PackComponent } from "./pack/pack.component";
import { UpdatePackComponent } from "./pack/updatePack.component";

import{ CoursComponent } from "./cours/cours.component";
import { UpdateCoursComponent } from "./cours/updateCours.component";

import{ SerieComponent } from "./quiz/serie.component";
import { QuizSerieComponent } from "./quiz/quizSerie.component";
import { UpdateQuizComponent } from "./quiz/updateQuiz.component";

import { ContratComponent } from "./contrat/contrat.component";
import { AccueilContratComponent } from "./contrat/acceuilContrat.component";
import { DetailContratComponent } from "./contrat/detailContrat.component";






const APP_ROUTES: Routes =[
	{ path: '', redirectTo: 'auto', pathMatch: 'full' },
	{ path: 'auto', component: AutoComponent , children: AUTO_ROUTES },

	{ path: 'auth', component: AuthentificationComponent , children: AUTH_ROUTES },

	{ path: 'promo', component: AccueilPromoComponent},
	{ path: 'updatePromo', component: PromotionComponent},
	
	{ path: 'pack', component: PackComponent},
	{ path: 'updatePack', component:  UpdatePackComponent},

	{ path: 'cours', component: CoursComponent},
	{ path: 'updateCours', component:  UpdateCoursComponent},

	{ path: 'serieQuiz', component: SerieComponent},
	{ path: 'serieQuiz/:id', component:  QuizSerieComponent},
	{ path: 'updateQuiz/:id/:id2', component:  UpdateQuizComponent},

	{ path: 'updateContrat/:id', component:  ContratComponent},
	{ path: 'contrat', component: AccueilContratComponent},
	{ path: 'detailContrat/:id', component: DetailContratComponent}

];
export const routing = RouterModule.forRoot(APP_ROUTES);