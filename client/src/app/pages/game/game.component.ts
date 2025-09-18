import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  playerHealth: number = 100;
  enemyHealth: number = 100;
  specialCooldown: number = 0;
  turnCount: number = 0;
  logs: string[] = [];
  gameOver: boolean = false;

  // Ataque básico do jogador
  attack() {
    const damage = this.getRandom(5, 10);
    this.enemyHealth = Math.max(this.enemyHealth - damage, 0);
    this.logs.unshift(`Jogador usou Ataque Básico (-${damage} inimigo)`);

    this.nextTurn();
  }

  // Ataque especial
  specialAttack() {
    if (this.specialCooldown === 0) {
      const damage = this.getRandom(10, 20);
      this.enemyHealth = Math.max(this.enemyHealth - damage, 0);
      this.logs.unshift(`Jogador usou Ataque Especial (-${damage} inimigo)`);

      this.specialCooldown = 2; // precisa esperar 2 turnos
      this.nextTurn(true); // ataque especial pode atordoar
    }
  }

  // Cura
  heal() {
    const heal = this.getRandom(5, 15);
    this.playerHealth = Math.min(this.playerHealth + heal, 100);
    this.logs.unshift(`Jogador curou (+${heal} vida)`);

    this.nextTurn();
  }

  // Desistir
  giveUp() {
    this.logs.unshift("Jogador desistiu!");
    this.endGame("Derrota");
  }

  // Lógica de turno
  private nextTurn(fromSpecial: boolean = false) {
    this.turnCount++;

    if (this.enemyHealth <= 0) {
      this.endGame("Vitória");
      return;
    }

    if (this.specialCooldown > 0) this.specialCooldown--;

    // 50% chance de inimigo perder turno se foi atordoado
    if (fromSpecial && Math.random() < 0.5) {
      this.logs.unshift("Inimigo ficou atordoado e perdeu o turno!");
      return;
    }

    // inimigo ataca
    this.enemyAttack();
  }

  // Ataque do inimigo
  private enemyAttack() {
    let damage: number;

    if (this.turnCount % 3 === 0) {
      damage = this.getRandom(8, 16); // ataque especial a cada 3 turnos
      this.logs.unshift(`Inimigo usou Ataque Especial (-${damage} jogador)`);
    } else {
      damage = this.getRandom(6, 12);
      this.logs.unshift(`Inimigo usou Ataque Básico (-${damage} jogador)`);
    }

    this.playerHealth = Math.max(this.playerHealth - damage, 0);

    if (this.playerHealth <= 0) {
      this.endGame("Derrota");
    }
  }

  // Encerrar jogo
  private endGame(result: string) {
    this.logs.unshift(`Fim do jogo: ${result}`);
    this.gameOver = true;

    // calcular pontuação
    const score = Math.floor((this.playerHealth * 1000) / this.turnCount);
    this.logs.unshift(`Pontuação final: ${score}`);
  }

  // Utilitário
  private getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

