import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'angular2-notifications';

import { AppModule } from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);