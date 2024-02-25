function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      this.currentRound++;
      const attackValue = getRandomNumber(8, 15);
      this.addLogMessage('monster', 'attack', attackValue);
      this.playerHealth -= attackValue;
    },

    useSpecialAttack() {
      this.currentRound++;
      const attackValue = getRandomNumber(10, 18);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },

    useHeal() {
      this.currentRound++;
      const healValue = getRandomNumber(10, 18);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
    },

    surrender(){
        this.winner = 'monster'
    },

    restartGame(){
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.currentRound = 0;
        this.winner = null;
        this.logMessages = []
    },

    addLogMessage(who, what, value){
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        });
    }
  },

  computed: {
    monsterHealthBar() {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
      }
      return { width: this.monsterHealth + "%" };
    },

    playerHealthBar() {
      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
      }
      return { width: this.playerHealth + "%" };
    },

    canUseSpecial() {
      return this.currentRound % 3 !== 0;
    },
  },

  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if(value <= 0) {
        this.winner = "player";
      }
    },

    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if(value <= 0) {
        this.winner = "monster";
      }
    },
  },
});

app.mount("#game");
