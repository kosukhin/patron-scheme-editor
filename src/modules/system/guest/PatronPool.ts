import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { PoolType } from '@/modules/system/guest/PoolType';
import {
  GuestType,
  ReceiveOptions,
} from './GuestType';

/**
 * Пул постоянных посетителей для источника - патронов
 */
export class PatronPool<T> implements PoolType<T> {
  private patrons = new Set<GuestType<T>>();

  public constructor(private initiator: unknown) {}

  /**
   * Добавить гостя в пул патронов, если гость представился патроном
   */
  public add(shouldBePatron: GuestType<T>) {
    try {
      if (shouldBePatron.introduction && shouldBePatron.introduction() === 'patron') {
        this.patrons.add(shouldBePatron);
      }
      return this;
    } catch (e) {
      throw new RuntimeError('Cant add patron to pool', { cause: e });
    }
  }

  /**
   * Передать один документ всем известным патронам
   */
  public receive(value: T, options?: ReceiveOptions) {
    try {
      this.patrons.forEach((target) => {
        target.receive(value, {
          ...options,
          specificData: {
            ...(options?.specificData ?? {}),
            initiator: this.initiator,
          },
        });
      });
      return this;
    } catch (e) {
      throw new RuntimeError('Cant receive value in patrons pool', { cause: e });
    }
  }

  public distributeReceivingOnce(receiving: T, possiblePatron: GuestType<T>): this {
    this.add(possiblePatron);
    possiblePatron.receive(receiving);
    return this;
  }

  /**
   * Позволяет распространить значение если оно имеет смысл
   */
  public distributeMeaningfulReceiving(meaningful: boolean, receiving: T, possiblePatron: GuestType<T>) {
    if (meaningful) {
      this.distributeReceivingOnce(receiving, possiblePatron);
    } else {
      this.add(possiblePatron);
    }
  }

  /**
   * ATTENTION! этот метод может быть опасен, если использовать его в
   * местах где нужно данные отдать, может привести к записи старых данных
   *
   * Передаст получение гостю и добавит его в патроны
   * если гость является патроном. Также передаст получение
   * другим уже существовавшим ранее патронам
   */
  public distributeReceiving(receiving: T, ...possiblePatrons: GuestType<T>[]) {
    const options: ReceiveOptions = {
      specificData: {
        initiator: this.initiator,
      },
    };
    possiblePatrons.forEach((patron) => patron.receive(receiving, options));
    this.receive(receiving, options);
    possiblePatrons.forEach((patron) => this.add(patron));
    return this;
  }
}
