import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
export function tokenGetter() {
  return sessionStorage.getItem('token');
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8081'],
          disallowedRoutes: ['http://localhost:8081/login/forget'],
        },
      })
    ), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
