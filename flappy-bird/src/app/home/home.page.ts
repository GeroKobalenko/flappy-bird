import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';

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

  birdHeight: number = 38;
  birdWidth: number = 43;
  birdPosition: number = 300;

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

  setTamanioContenedor() {
    this.alturaContenedor = this.plataforma.height();
    this.anchuraContenedor =
      this.plataforma.width() < 576 ? this.plataforma.width() : 576;
  }

  addGravity() {
    let gravedad = 4.5;
    if (this.juegoEmpezado) this.birdPosition += gravedad;
  }

  saltar() {
    if (this.juegoEmpezado) {
      if (this.birdPosition < this.birdHeight) this.birdPosition = 0;
      else this.birdPosition -= 60;
    }
  }

  playMusica() {
    this.musicaActiva = !this.musicaActiva;

    if (this.musicaActiva) {
      this.audio.play();
      this.audio.loop;
    } else {
      this.audio.pause();
    }
  }

  moverObstaculo() {
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

  setGameOver(){
    this.juegoTerminado = true;
    this.juegoEmpezado = false;
    this.birdPosition = 300;
  }

  checkearColision(){
    let colisionObtaculoArriba = this.birdPosition >= 0 && this.birdPosition < this.obstacleHeight;
    let colisionObtaculoAbajo = this.birdPosition >= this.alturaContenedor - (this.alturaContenedor - this.obstacleGap - this.obstacleHeight) - this.birdHeight;
    let colisionSuelo = (this.birdPosition + 40) >= this.alturaContenedor;

    if (colisionSuelo) this.setGameOver();

    if (this.obstaclePosition >= this.obstacleWidth &&
       this.obstaclePosition <= this.obstacleWidth + 80 &&
       (colisionObtaculoArriba || colisionObtaculoAbajo)) {
        this.setGameOver();
       }
  }

  resetearPositionObstaculo() {
    this.obstaclePosition = this.anchuraContenedor;
    this.obstacleHeight = Math.floor(
      Math.random() * (this.alturaContenedor - this.obstacleGap)
    );
  }
}
