import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CameraOptions, Camera, EncodingType } from '@ionic-native/camera/ngx'

declare var HMSAnalytics: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  myProfileImage = "https://scontent.fbog15-1.fna.fbcdn.net/v/t1.0-9/101287173_10157993702906084_8179953059921657856_o.jpg?_nc_cat=105&_nc_sid=8bfeb9&_nc_eui2=AeH5kxoa-ci3VQL2fJexlrGBlb5PRnBRb22Vvk9GcFFvbRWdMa3UmsaJpn3KBf2G7aM&_nc_ohc=tq2HQmQ0V4AAX8LRBQl&_nc_ht=scontent.fbog15-1.fna&oh=de893b06a7fa9778a1f87bdc2490f73d&oe=5F4263BD";
  constructor(
    private _camera: Camera,
    private _alertController: AlertController) {
    const eventObj = {
      testString: 'StrContent',
      testInt: 20,
      testDouble: 2.2,
      testBoolean: false
    }
    HMSAnalytics.onEvent('profile_event', eventObj, () => {
      console.log('onEvent->Success')
    }, (err) => {
      console.log('onEvent-> Error: ' + err)
    })

    HMSAnalytics.setUserProfile("UserProfileName", "Juan Gaines", ()=> {
      alert('setUserProfile -> Success');
    }, (err)=> {
      alert('setUserProfile -> Error : ' + err);
    });
  }

  async selectImageSource() {
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.CAMERA
    }
    const galleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this._camera.DestinationType.DATA_URL,
      encodingType: this._camera.EncodingType.JPEG,
      mediaType: this._camera.MediaType.PICTURE,
      targetHeight: 200,
      correctOrientation: true,
      sourceType: this._camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    const alert = await this._alertController.create({
      header: "Select source",
      message: "Pick a source for your image",
      buttons: [
        {
          text: "Camera",
          handler: () => {
            this._camera.getPicture(cameraOptions)
              .then((imageData => {
                this.myProfileImage = "data:image/jpeg;base64," + imageData;

                const eventObj = {
                  source:'Camera',
                  encodingType: 'image/jpeg',
                  format: 'base64',
                }
                HMSAnalytics.onEvent('profile_image_changed',eventObj,() => {
                  console.log('onEvent->Success')
                }, (err) => {
                  console.log('onEvent-> Error: ' + err)
                })
                
              }))
          }
        },
        {
          text: "Gallery",
          handler: () => {
            this._camera.getPicture(galleryOptions)
              .then((imageData => {
                this.myProfileImage = "data:image/jpeg;base64," + imageData;

                const eventObj = {
                  source:'Gallery',
                  encodingType: 'image/jpeg',
                  format: 'base64',
                }
                HMSAnalytics.onEvent('profile_image_changed',eventObj,() => {
                  console.log('onEvent->Success')
                }, (err) => {
                  console.log('onEvent-> Error: ' + err)
                })
              }))
          }
        }
      ]
    })
    await alert.present();
  }
}
