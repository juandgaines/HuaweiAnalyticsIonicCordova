# Huawei Analytics kit example guide

## AppGallery Connect Configuration
Please follow the [instructions](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/config-agc-0000001050134733) to enable analytics on the project and your AppGallery Connect console. Then add agconnect-services.json to root directory [instructions](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/integrating-plugin-0000001050134741).


## Plugins
For this project, you will need to use the following plugins for Cordova and Ionic.

-[SocialSharing](https://ionicframework.com/docs/native/social-sharing): Share text, files, images, and links via social networks, sms, and email.

-[Camera](https://ionicframework.com/docs/native/camera):Take a photo or capture video

-[cordova-plugin-hms-analytics](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/integrating-plugin-0000001050134741): Analytics kit HMS. Please follow instructions for configuration and installation.

Install the android platform 

```bash
ionic cordova platform add android
```
Install downloaded plugins using the following command

```bash
ionic cordova plugin add CORDOVA_PLUGIN_PATH
```

Import required package and add following code to onCreate function in MainActivity.java inside platforms\android\app\src\main\java
```java

// Add the following import statement.
import com.huawei.hms.cordova.analytics.utils.HMSAnalyticsUtils; 
 
public class MainActivity extends CordovaActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        // Initialize HMS Analytics Kit.
        HMSAnalyticsUtils.initHMSAnalytics(this);
        
        // ...
    }
}
```

Run the project: 
```bash
ionic cordova build android
ionic cordova run android
```