import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppComponent } from "./app.component";
import { AutoEcoleComponent } from "./autoecole/autoecole.component";
import { AutoComponent } from "./autoecole/auto.component";
import { UploadComponent } from "./autoecole/upload.component";
import { HoraireComponent } from "./autoecole/horaire.component";
import { ProfesseurComponent } from "./autoecole/professeur.component";
import { UpdateProfesseurComponent } from "./autoecole/updateProfesseur.component";
import { PromotionComponent } from "./promotion/promotion.component";
import { AccueilPromoComponent } from "./promotion/accueilPromo.component";
import { PackComponent } from "./pack/pack.component";
import { UpdatePackComponent } from "./pack/updatePack.component";
import { CoursComponent } from "./cours/cours.component";
import { UpdateCoursComponent } from "./cours/updateCours.component";

import { SerieComponent } from "./quiz/serie.component";
import { QuizSerieComponent } from "./quiz/quizSerie.component";
import { UpdateQuizComponent } from "./quiz/updateQuiz.component";


import { ContratComponent } from "./contrat/contrat.component";
import { AccueilContratComponent } from "./contrat/acceuilContrat.component";
import { DetailContratComponent } from "./contrat/detailContrat.component";
import { FilterPipe } from "./contrat/filterPipe.pipe";

import { AuthentificationComponent } from "./client/auth/authentification.component";
import { LogoutComponent } from "./client/auth/logout.component";
import { SigninComponent } from "./client/auth/signin.component";
import { SignupComponent } from "./client/auth/signup.component";

import { AvisComponent } from "./client/avis/avis.component";

import { PlayQuizComponent } from "./client/playQuiz/playQuiz.component";




import {  AutoEcoleService } from "./autoecole/autoecole.service";
import {  PromotionService } from "./promotion/promotion.service";
import {  PackService } from "./pack/pack.service";
import {  CoursService } from "./cours/cours.service";
import {  QuizService } from "./quiz/quiz.service";
import {  ContratService } from "./contrat/contrat.service";
import {  AuthService } from "./client/auth/auth.service";
import {  AvisService } from "./client/avis/avis.service";
import {  PlayQuizService } from "./client/playQuiz/playQuiz.service";




import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';


import { routing } from "./app.routing";



@NgModule({
    declarations: [
        AppComponent, 
        AutoEcoleComponent,
        UploadComponent,
        HoraireComponent,
        ProfesseurComponent,
        UpdateProfesseurComponent,
        AutoComponent,
        PromotionComponent,
        AccueilPromoComponent,
        PackComponent,
        UpdatePackComponent,
        CoursComponent,
        UpdateCoursComponent,
        SerieComponent,
        QuizSerieComponent,
        UpdateQuizComponent,
        ContratComponent,
        AccueilContratComponent,
        DetailContratComponent,
        FilterPipe,
        AuthentificationComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        AvisComponent,
        PlayQuizComponent 

    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        Ng2SearchPipeModule,
        BrowserAnimationsModule,
        ToastModule.forRoot()
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AngularDateTimePickerModule,
        NgCircleProgressModule.forRoot({
    
              radius: 100,
              outerStrokeWidth: 16,
              innerStrokeWidth: 8,
              outerStrokeColor: "#78C000",
              innerStrokeColor: "#C7E596",
              animationDuration: 300
        })
    ],
    bootstrap: [AppComponent],
    providers: [AutoEcoleService, PromotionService, PackService, CoursService, QuizService, ContratService, AuthService, AvisService, PlayQuizService]
})
export class AppModule {

}