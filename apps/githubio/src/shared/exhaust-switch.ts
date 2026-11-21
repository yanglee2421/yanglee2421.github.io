import type { ObservableInput, ObservedValueOf, OperatorFunction } from "rxjs";
import { from, interval, Observable, of, Subscription } from "rxjs";

/**
 * Uses exhaustMap behavior for consecutive equal values and switchMap behavior
 * whenever the source value changes.
 */
export function exhaustSwitch<T, O extends ObservableInput<unknown>>(
  project: (value: T, index: number) => O,
): OperatorFunction<T, ObservedValueOf<O>> {
  return (source) => {
    return new Observable<ObservedValueOf<O>>((destination) => {
      const subscriptions = new Subscription();
      let previousValue: T;
      let hasPreviousValue = false;
      let activeInner: Subscription | null = null;
      let outerComplete = false;
      let index = 0;

      const subscribeInner = (value: T, currentIndex: number) => {
        const innerSubscription = new Subscription();
        activeInner = innerSubscription;
        subscriptions.add(innerSubscription);

        let innerObservable: ObservableInput<ObservedValueOf<O>>;
        try {
          innerObservable = project(value, currentIndex) as ObservableInput<
            ObservedValueOf<O>
          >;
        } catch (error) {
          destination.error(error);
          return;
        }

        innerSubscription.add(
          from(innerObservable).subscribe({
            next: (innerValue) => destination.next(innerValue),
            error: (error) => destination.error(error),
            complete: () => {
              if (activeInner === innerSubscription) {
                activeInner = null;
                subscriptions.remove(innerSubscription);
                if (outerComplete) {
                  destination.complete();
                }
              }
            },
          }),
        );
      };

      subscriptions.add(
        source.subscribe({
          next: (value) => {
            const isSameValue = hasPreviousValue && value === previousValue;
            previousValue = value;
            hasPreviousValue = true;

            if (isSameValue && activeInner) {
              return;
            }

            if (!isSameValue && activeInner) {
              subscriptions.remove(activeInner);
              activeInner.unsubscribe();
              activeInner = null;
            }

            subscribeInner(value, index++);
          },
          error: (error) => destination.error(error),
          complete: () => {
            outerComplete = true;
            if (!activeInner) {
              destination.complete();
            }
          },
        }),
      );

      return subscriptions;
    });
  };
}

interval(1000).pipe(
  exhaustSwitch((value) => {
    return of(value);
  }),
);
