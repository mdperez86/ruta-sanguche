import { Observable, Subscriber } from 'rxjs';

export const watchPosition = (options?: PositionOptions) => new Observable((subscriber: Subscriber<Position>) => {
  let watchId;
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => subscriber.next(position),
      (positionError) => subscriber.error(positionError),
      options,
    );
  } else {
    subscriber.error('Geolocation not available');
  }
  return {
    unsubscribe() {
      navigator.geolocation.clearWatch(watchId);
    }
  };
});

export const getCurrentPosition = (options?: PositionOptions) => new Observable((subscriber: Subscriber<Position>) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => subscriber.next(position),
      (positionError) => subscriber.error(positionError),
      options,
    );
  } else {
    subscriber.error('Geolocation not available');
  }
});
