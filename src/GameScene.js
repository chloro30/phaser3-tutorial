import { Scene } from "phaser";

class GameScene extends Scene {
  preload() {
    this.load.image("logo", "assets/logo.png");
  }

  create() {
    const logo = this.add.image(400, 150, "logo");
    const message = this.add.text(100, 100, "hello"); // text 생성

    // addEventListener('mousedown', () => {});
    this.input.on("pointerdown", () => {
      message.text = "Click!";
    });

    // addEventListener('mouseup', () => {});
    this.input.on("pointerup", () => {
      message.text = "hello";
    });

    // tween은 animation이다.
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000, //2초 동안
      ease: "Power2", // 동작 ease
      yoyo: true, // yoyo는 앞뒤로 반복
      loop: -1, // 영원히 반복
    });
  }
}

export default GameScene;
