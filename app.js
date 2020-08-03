var app = new Vue({
    el: '#app',
    data: {
        game:{
            status: 'paused',
            winner: false
        },
        player: {
            life: 100
        },
        monster: {
            life: 100
        },
        logs: {
            attacks: [
    
            ]
        }
    },
    methods: {
        attackMonster(){
            this.game.status = "in progress"
            if(this.player.life <= 0 || this.monster.life <= 0){
                return this.game.status = "finish game"
            }
            const playerAttack = Math.floor(Math.random() * 10);
            const monsterAttack = playerAttack + Math.round((playerAttack / 100) * 50);
            const newLifePlayer = this.player.life - monsterAttack;
            const newLifeMonster = this.monster.life - playerAttack;
            if(newLifePlayer <= 0 || newLifeMonster <= 0){
                 this.game.status = "finish game"
                 this.player.life =  newLifePlayer <= 0 ?  0 : this.player.life;
                 return this.monster.life = newLifeMonster <= 0 ? 0 : this.monster.life;
            }
            this.logs.attacks.push({
                monster: monsterAttack,
                player: playerAttack
            })
            this.player.life = newLifePlayer;
            this.monster.life = newLifeMonster;
            console.log("player life =>", this.player.life);
            console.log("monster life =>", this.monster.life);


        }
    }
  })