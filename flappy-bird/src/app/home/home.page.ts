import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Bird } from '../models/bird';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  alturaContenedor!: number;
  anchuraContenedor!: number;

  juegoEmpezado: boolean = false;
  juegoTerminado: boolean = false;
  musicaActiva: boolean = false;
  audio = new Audio('/assets/music/ionic-bird-track.MP3');

  puntaje: number = 0;

  bird: Bird = new Bird({
    height: 38,
    width: 43,
    top: 300
  });

  obstacleHeight: number = 0;
  obstacleWidth: number = 52;
  obstaclePosition: number = this.anchuraContenedor;
  obstacleGap: number = 200;

  birdInterval!: NodeJS.Timeout;
  obstacleInterval!: NodeJS.Timeout;

  constructor(private plataforma: Platform) {}

  ngOnInit() {
    this.setTamanioContenedor();
    this.birdInterval = setInterval(this.addGravity.bind(this), 24);
    this.obstacleInterval = setInterval(this.moverObstaculo.bind(this), 24);
  }

  public empezarJuego() {
    this.juegoEmpezado = true;
    this.juegoTerminado = false;
    this.puntaje = 0;
  }

  public saltar() {
    this.bird.saltar();
  }

  public playMusica() {
    this.musicaActiva = !this.musicaActiva;

    if (this.musicaActiva) {
      this.audio.play();
      this.audio.loop;
    } else {
      this.audio.pause();
    }
  }

  private setTamanioContenedor() {
    this.alturaContenedor = this.plataforma.height();
    this.anchuraContenedor =
      this.plataforma.width() < 576 ? this.plataforma.width() : 576;
  }

  private addGravity() {
    if (this.juegoEmpezado) this.bird.caer();
  }

  private moverObstaculo() {
    let speed: number = 6;
    if (this.anchuraContenedor < 400) speed = 4;
    if (this.juegoEmpezado && this.obstaclePosition >= this.obstacleWidth)
      this.obstaclePosition -= speed;
    else {
      this.resetearPositionObstaculo();
      if (this.juegoEmpezado) this.puntaje++;
    }

    this.checkearColision();
  }

  private setGameOver(){
    this.juegoTerminado = true;
    this.juegoEmpezado = false;
    this.bird.top = 300;
  }

  private checkearColision(){
    let colisionObtaculoArriba = this.bird.top >= 0 && this.bird.top < this.obstacleHeight;
    let colisionObtaculoAbajo = this.bird.top >= this.alturaContenedor - (this.alturaContenedor - this.obstacleGap - this.obstacleHeight) - this.bird.height;
    let colisionSuelo = (this.bird.top + 40) >= this.alturaContenedor;

    if (colisionSuelo) this.setGameOver();

    if (this.obstaclePosition >= this.obstacleWidth &&
       this.obstaclePosition <= this.obstacleWidth + 80 &&
       (colisionObtaculoArriba || colisionObtaculoAbajo)) {
        this.setGameOver();
       }
  }

  private resetearPositionObstaculo() {
    this.obstaclePosition = this.anchuraContenedor;
    this.obstacleHeight = Math.floor(
      Math.random() * (this.alturaContenedor - this.obstacleGap)
    );
  }
}
