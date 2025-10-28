import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { IpBlocking } from './ip-blocking/ip-blocking';
import { ServerManagement } from './server-management/server-management';
import { TaskManagement } from './task-management/task-management';
import { AdminChatbot } from './admin-chatbot/admin-chatbot';

const routes: Routes = [
  {path:'dashboard', component:Dashboard},
  {path:'ip-bloxking', component:IpBlocking},
  {path:'server-managment', component:ServerManagement},
  {path:'task-managment', component:TaskManagement},
  {path:'chatboot' , component:AdminChatbot}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
