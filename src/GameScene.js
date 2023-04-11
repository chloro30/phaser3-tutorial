import { Scene } from "phaser";

class GameScene extends Scene {
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const sky = this.add.image(0, 0, "sky"); // x좌표, y좌표, preload 이미지 id
    sky.setOrigin(0, 0); // 이미지의 위치를 왼쪽 상단으로 재설정한다. originX그리고.originY대신 속성을 입력합니다.

    this.createPlatforms();
    this.createPlayer();
    this.createCursor();
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody(); // bottom
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, "dude");

    this.player.setBounce(0.2); // 바운스 물리 엔진 설정
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms); // 플레이어가 플랫폼과 충돌할 수 있도록 Collider 개체를 만든다.이 개체는 두 개의 물리 객체(그룹 포함)를 모니터링하여 충돌 또는 중복 여부를 확인한다.

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }), // dude 이미지에서 0~3 만 반복
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default GameScene;
