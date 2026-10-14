import {
  animationFrames,
  BehaviorSubject,
  EMPTY,
  filter,
  fromEventPattern,
  map,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";

const message$ = fromEventPattern<MessageEvent<any>>(
  (h) => self.addEventListener("message", h),
  (h) => self.removeEventListener("message", h),
);
const messageerror$ = fromEventPattern<MessageEvent<any>>(
  (h) => self.addEventListener("messageerror", h),
  (h) => self.removeEventListener("messageerror", h),
);

const animate$ = animationFrames();
const offscreen$ = new BehaviorSubject<OffscreenCanvas | null>(null);
const buffer$ = new BehaviorSubject<Uint8Array>(new Uint8Array());

message$
  .pipe(
    filter((e) => e.data instanceof OffscreenCanvas),
    map((e) => e.data as OffscreenCanvas),
  )
  .subscribe(offscreen$);

message$
  .pipe(
    filter((e) => e.data instanceof Uint8Array),
    map((e) => e.data as Uint8Array),
  )
  .subscribe(buffer$);

offscreen$
  .pipe(
    switchMap((offscreen) => {
      if (!offscreen) {
        return EMPTY;
      }

      const ctx = offscreen.getContext("2d");

      if (!ctx) {
        return EMPTY;
      }

      return animate$.pipe(
        tap(() => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          const list = buffer$.getValue();

          ctx.strokeStyle = "blue";
          ctx.beginPath();
          ctx.moveTo(0, 0);
          list.forEach((height, index) => {
            ctx.lineTo(index, 255 - height);
          });
          ctx.stroke();
        }),
      );
    }),
    takeUntil(messageerror$),
  )
  .subscribe();
