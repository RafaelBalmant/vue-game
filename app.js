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
        logs: []
    },
    computed: {},
    methods: {
        setLife(playerAttack, monsterAttack, type){
            const newLifePlayer = type === "attack" ? this.player.life - monsterAttack :  this.player.life - monsterAttack + playerAttack;
            const newLifeMonster = type === "attack" && this.monster.life - playerAttack || this.monster.life;
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
                    this.setLife(healPlayer, monsterHealAttack, "heal");
                    break;
                default:
                    console.log("type attack null")          
            }
        },
        restartGame(){
            this.game.status = "start";
            this.logs = []
            this.player.life = 100;
            this.monster.life = 100;
        }
    },
    watch: {
        'player.life'(newValue, oldValue){
            if(newValue <= 0){
                this.game.status =  "Você perdeu : (";
                return this.player.life =  0;
            }
            if(newValue >= 100) return this.player.life = 100
        },
        'monster.life'(newValue, oldValue){
            if(newValue <= 0){
                this.monster.life = 0;
                this.game.status = "Você ganhou :)"
            }
        }
    }
  })