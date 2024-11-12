export class AnimateController {
  constructor(private readonly animate: () => void) {}

  #animateId = 0;
  play() {
    this.#animateId = requestAnimationFrame(this.play.bind(this));

    this.animate();
  }
  abort() {
    cancelAnimationFrame(this.#animateId);
  }
}
