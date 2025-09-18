import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { RulesComponent } from './pages/rules/rules.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // rota inicial
  { path: 'game', component: GameComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'rules', component: RulesComponent },
];
