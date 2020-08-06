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
        logs: [
            {
                type: "teste",
                value: 0
            }
        ]
    },
    methods: {
        setLife(playerAttack, monsterAttack, type){
            console.log(this.logs)
            const newLifePlayer = type === "attack" ? this.player.life - monsterAttack :  this.player.life - monsterAttack + playerAttack;
            const newLifeMonster = type === "attack" && this.monster.life - playerAttack || this.monster.life;
            if(newLifePlayer <= 0 || newLifeMonster <= 0){
                 this.game.status = newLifePlayer <= 0 ?  "você perdeu amigão" : "Quente again"
                 this.player.life =  newLifePlayer <= 0 ?  0 : this.player.life;
                 return this.monster.life = newLifeMonster <= 0 ? 0 : this.monster.life;
            }
            this.logs.push({
                type: "attack",
                monsterValue: monsterAttack,
                playerValue: type === "attack" && playerAttack || 0
            })
            if(type === "heal"){
                this.logs.push({
                    type: "heal",
                    playerHeal: playerAttack
                })
            }
            this.player.life = newLifePlayer;
            this.monster.life = newLifeMonster;
        },
        attackMonster(value){
            this.game.status = "in progress"
            if(this.player.life <= 0 || this.monster.life <= 0){
                return this.game.status = this.player.life <= 0 ?  "você perdeu amigão" : "Quente again"
            }
            switch(value){
                case "normal":
                    const playerAttack = Math.floor(Math.random() * 10);
                    const monsterAttack = playerAttack + Math.round((playerAttack / 100) * 50);
                    this.setLife(playerAttack, monsterAttack, "attack");
                    break;
                case "super":
                    const monsterSuperAttack = Math.floor(Math.random() * 10);
                    const playerSuperAttack = monsterSuperAttack + Math.round((monsterSuperAttack / 100) * 50);
                    this.setLife(playerSuperAttack, monsterSuperAttack, "attack"); 
                    break;
                case "heal": 
                    const monsterHealAttack = Math.floor(Math.random() * 10);
                    const healPlayer = Math.floor(Math.random() * 10)
                    this.setLife(healPlayer, monsterHealAttack, "heal")

                    
            }

        }
    }
  })