import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var window;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab1Page {
  public smsTextmessage: string = '';
  public appHashString: string = '';

  constructor(public platform: Platform, private cd: ChangeDetectorRef) { }

  getHashCode() {
    if (this.platform.ready()) {
      const smsRetriever: any = window.cordova.plugins.smsRetriever;
      smsRetriever['getAppHash']((res) => {
        this.appHashString = res;
        this.cd.detectChanges();
        console.log(res);
      }, (err) => {
        console.warn(err);
      });
    }

  }

  getSMS() {
    if (this.platform.ready()) {
      const smsRetriever: any = window.cordova.plugins.smsRetriever;
      smsRetriever['startWatching']((res) => {
        this.smsTextmessage = res.Message;
        console.log(res);
        this.cd.detectChanges();
      }, (err) => {
        console.warn(err);
      });
    }
  }
}
