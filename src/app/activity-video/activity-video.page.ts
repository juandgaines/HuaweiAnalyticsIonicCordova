import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
declare var HMSAnalytics: any;
@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
})
export class ActivityVideoPage implements OnInit {

  videoURL:string;

  constructor(
    navParams:NavParams,
    private _modalController:ModalController) {
      
      this.videoURL=navParams.get("videoURL")
      const eventObj = {
        url: this.videoURL,
      }

      HMSAnalytics.onEvent('activity_seen_video', eventObj, () => {
        console.log('onEvent->Success')
      }, (err) => {
        console.log('onEvent-> Error: ' + err)
      })
    }

  ngOnInit() {
  }

  closeModal(){
    this._modalController.dismiss();
  }

}
