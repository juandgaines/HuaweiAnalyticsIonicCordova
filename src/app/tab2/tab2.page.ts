import { Component } from '@angular/core';

declare var HMSAnalytics: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  constructor() {

    const eventObj= {
      testString: 'StrContent'
    }
    HMSAnalytics.onEvent('tab2_event', eventObj, () => {
      console.log('onEvent->Success')
    }, (err) => {
      console.log('onEvent-> Error: ' + err)
    })
  }

}
