import {
  GuestCast, GuestChain, GuestObjectType,
} from 'patron-oop';
import { BrowserLaunchQueue, FileSystemContent } from 'patron-scheme-editor';
import debug from 'debug';

const localDebug = debug('FSHtmlContent');

export class FSHtmlContent {
  public constructor(
    private fsContent: FileSystemContent,
    private launchQueue: BrowserLaunchQueue,
  ) { }

  public content(target: GuestObjectType<string>): this {
    this.fsContent.content(new GuestCast(target, (value) => {
      localDebug('html content', value);
      target.give(value);
    }));
    return this;
  }

  public give(value: string): this {
    this.fsContent.give(value);
    return this;
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    localDebug('check canbe used');
    const chain = new GuestChain<{fileHandler: FileSystemFileHandle, canBeUsed: boolean}>();
    this.launchQueue.fileHandler(new GuestCast(guest, chain.receiveKey('fileHandler')));
    this.fsContent.canBeUsed(new GuestCast(guest, chain.receiveKey('canBeUsed')));
    chain.result(({ fileHandler, canBeUsed }) => {
      const isHTML = fileHandler.name.indexOf('.html') > 0;
      localDebug('isHTML', isHTML);
      guest.give(canBeUsed && isHTML);
    });
    return guest;
  }
}
