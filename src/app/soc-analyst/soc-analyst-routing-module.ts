import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chatbot } from './chatbot/chatbot';
import { Alerts } from './alerts/alerts';
import { Dashboard } from './dashboard/dashboard';
import { ThreatScanner } from './threat-scanner/threat-scanner';
import { ThreatsDetected } from './threats-detected/threats-detected';
import { Reports } from './reports/reports';

const routes: Routes = [
{path:'reports' , component:Chatbot},
{path:'chatbot', component:Alerts},
{path:'dashboard' , component:Dashboard},
{path:'threat-scanner', component:ThreatScanner},
{path:'threat-detected', component:ThreatsDetected},
{path:'report', component:Reports}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocAnalystRoutingModule { }
