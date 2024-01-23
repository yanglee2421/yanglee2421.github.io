export function toCountdown(...targetTime: ConstructorParameters<typeof Date>) {
  const [day, restDay] = toTimeCarry(
    new Date(...targetTime).getTime() - Date.now(),
    1000 * 60 * 60 * 24
  );
  const [hour, restHour] = toTimeCarry(restDay, 1000 * 60 * 60);
  const [min, restMin] = toTimeCarry(restHour, 1000 * 60);
  const [sec, restSec] = toTimeCarry(restMin, 1000);

  return `${day}天/${hour}小时/${min}分/${sec}秒/${restSec}毫秒`;
}

function toTimeCarry(totalTime: number, unit: number): [number, number] {
  return [Math.floor(totalTime / unit), totalTime % unit];
}
