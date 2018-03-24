import { Routes } from "@angular/router";
import{ AutoEcoleComponent } from "./autoecole.component";
import{ HoraireComponent } from "./horaire.component";
import{ ProfesseurComponent } from "./professeur.component";
import{ UpdateProfesseurComponent } from "./updateProfesseur.component";

export const AUTO_ROUTES: Router = [
	{ path: '', redirectTo: 'infoAuto', pathMatch: 'full' },
	{path: 'infoAuto', component: AutoEcoleComponent},
	{path: 'profAuto', component: ProfesseurComponent},
	{ path: 'horaireAuto', component: HoraireComponent},
	{path: 'updateProf', component: UpdateProfesseurComponent}

];
		