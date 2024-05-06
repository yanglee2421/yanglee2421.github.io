export function random() {
  speed = (speed * 16807) % 2147483647;
  return (speed - 1) / 2147483646;
}

let speed = 42;
