import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Activity} from '../types'
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ActivityVideoPageModule } from '../activity-video/activity-video.module';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'

declare var HMSAnalytics: any;

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  
  activityDetail:Observable<Activity>;
  constructor(
    private _modalController:ModalController,
    activityService:ActivityService,
    private _activatedRoute:ActivatedRoute,
    private _socialSharing:SocialSharing
    ) {

    const activityID=_activatedRoute.snapshot.params["activityID"];
    this.activityDetail=activityService.getActivity(activityID);

    const eventObj = {
      idActivity: activityID,
    }

    HMSAnalytics.onEvent('activity_detail_view', eventObj, () => {
      console.log('onEvent->Success')
    }, (err) => {
      console.log('onEvent-> Error: ' + err)
    })
   }

  ngOnInit() {
  }

  async openModal(){

    console.log("Opening")
  
    const videoModal= await this._modalController.create({
      component:ActivityVideoPage
    });

   return await this.activityDetail.subscribe((activity)=>{
      videoModal.componentProps={
        videoURL:activity.video_url
      };
      return videoModal.present()
    });

  }

  share(){
    const activityID=this._activatedRoute.snapshot.params["activityID"];
    
    const eventObj = {
      idActivity: activityID,
    }

    HMSAnalytics.onEvent('activity_social_media_shared', eventObj, () => {
      console.log('onEvent->Success')
    }, (err) => {
      console.log('onEvent-> Error: ' + err)
    })
    this.activityDetail.subscribe((activity)=>
    {
      this._socialSharing.share("Look what I found in this app",activity.name,"",activity.cropped)
    })
  }

}
