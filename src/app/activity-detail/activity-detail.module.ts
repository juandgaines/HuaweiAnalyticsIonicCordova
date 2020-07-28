import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPageRoutingModule } from './activity-detail-routing.module';

import { ActivityDetailPage } from './activity-detail.page';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import { ActivityVideoPageModule } from '../activity-video/activity-video.module';
import { RouterModule,Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ActivityDetailPage,
  }
];

@NgModule({
  imports: [
    ActivityVideoPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],

  declarations: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
