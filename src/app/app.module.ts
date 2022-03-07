import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CreateArticleModule } from './create-article/create-article.module';
import { EditArticleModule } from './edit-article/edit-article.module';
import { GlobalFeedModule } from './global-feed/global-feed.module';
import { SettingsModule } from './settings/settings.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { TopBarModule } from './shared/modules/top-bar/top-bar.module';
import { PersistanceService } from './shared/services/persistance.service';
import { UserProfileModule } from './user-profile/user-profile.module';
import { YourFeedModule } from './your-feed/your-feed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AuthModule,
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    CreateArticleModule,
    EditArticleModule,
    ArticleModule,
    SettingsModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
