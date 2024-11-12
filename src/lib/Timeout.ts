export class Timeout {
  private endAt: number;
  constructor(private readonly delay: number) {
    this.endAt = Date.now() + this.delay;
  }

  get() {
    return this.endAt - Date.now();
  }
}
