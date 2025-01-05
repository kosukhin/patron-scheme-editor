import { HtmlTemplate } from '@/modules/html/HtmlTemplate';
import debug from 'debug';
import {
  Guest,
  GuestAware,
  GuestAwareType,
  GuestCast,
  GuestChain,
  GuestObject,
  GuestObjectType,
  Patron,
  PatronOnce,
  SourceEmpty,
  SourceType,
} from 'patron-oop';

export interface ShareFileDocument {
  name: string,
  content: string,
  mime: string,
}

interface MapCurrentIDType extends GuestObjectType<string> {
  id(guest: GuestObjectType<string>): GuestObjectType<string>;
}

const localDebug = debug('ShareContent');

const storageFirstValue = new SourceEmpty();

export class ShareContent {
  private contentSource: GuestAwareType<string>;

  public constructor(
    private sharedSource: SourceType<ShareFileDocument>,
    private sharedFromWorker: GuestAwareType<ShareFileDocument>,
    private htmlTemplate: HtmlTemplate,
    private mapCurrentID: MapCurrentIDType,
    private storageChangedGuest: GuestObjectType<boolean>,
  ) {
    this.sharedFromWorker.value(new Patron((valueFromWorker) => {
      this.sharedSource.value((cachedValue) => {
        if (!cachedValue) {
          this.sharedSource.give(valueFromWorker);
        }
      });
    }));
    this.contentSource = new GuestAware((guest) => {
      const guestObject = new GuestObject(guest);
      this.sharedSource.value(new GuestCast(guestObject, (v) => {
        if (v) {
          if (v.name.includes('.html')) {
            this.htmlTemplate.htmlToJson(v.content, new GuestCast(guestObject, (json) => {
              guestObject.give(json);
            }));
          } else {
            guestObject.give(v.content);
          }
        }
      }));
    });

    const chain = new GuestChain<{
      fromWorker: ShareFileDocument,
      fromStorage: ShareFileDocument
    }>();
    this.sharedFromWorker.value(new Patron(chain.receiveKey('fromWorker')));
    this.sharedSource.value(new Patron(chain.receiveKey('fromStorage')));
    chain.result(new Patron(({ fromWorker, fromStorage }) => {
      localDebug('fromWorker = ', fromWorker.content.length);
      localDebug('fromStorage = ', fromStorage.content.length);
      this.storageChangedGuest.give(fromWorker.content.length !== fromStorage.content.length);
    }));

    this.sharedSource.value(new PatronOnce(storageFirstValue));
    const storageChain = new GuestChain<{
      fromStorage: ShareFileDocument,
      storageRemembered: ShareFileDocument
    }>();
    this.sharedSource.value(new Patron(storageChain.receiveKey('fromStorage')));
    storageFirstValue.value(new Patron(storageChain.receiveKey('storageRemembered')));
    storageChain.result(new Patron(({ fromStorage, storageRemembered }) => {
      this.storageChangedGuest.give(fromStorage.content.length !== storageRemembered.content.length);
    }));
  }

  public canBeUsed(guest: GuestObjectType<boolean>) {
    this.sharedFromWorker.value(new GuestCast(guest, (v) => {
      guest.give(!!v);
    }));

    this.sharedSource.value(new GuestCast(guest, (v) => {
      guest.give(!!v);
    }));

    return guest;
  }

  public content(target: GuestObjectType<string>): this {
    this.contentSource.value(target);
    return this;
  }

  public give(content: string): this {
    this.mapCurrentID.id(new Guest((id) => {
      const isEmptyMap = id === 'current' && content.includes('"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{}');

      localDebug('give', isEmptyMap, content);

      this.sharedSource.value((value) => {
        const correnctContent = isEmptyMap ? value.content : content;

        if (value.mime.includes('html')) {
          if (isEmptyMap) {
            this.sharedSource.give({
              ...value,
              content: correnctContent,
            });
          } else {
            localDebug('try to save html to storage');
            this.htmlTemplate.jsonToHtml(correnctContent, new Guest((htmlContent: string) => {
              localDebug('save html to storage');
              this.sharedSource.give({
                ...value,
                content: htmlContent,
              });
            }));
          }
        } else {
          this.sharedSource.give({
            ...value,
            content: correnctContent,
          });
        }
      });
    }));
    return this;
  }
}
