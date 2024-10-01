export class Timeout {
  private endAt: number;
  constructor(
    private readonly startAt: Date,
    private readonly delay: number,
  ) {
    this.endAt = this.startAt.getTime() + this.delay;
  }

  get() {
    return this.endAt - Date.now();
  }
}
