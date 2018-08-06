
import './polyfills';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.Module';

platformBrowserDynamic().bootstrapModule(AppModule);
