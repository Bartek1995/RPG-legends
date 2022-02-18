

//PLAYER OBJECT
class Player {

    nick
    attack
    defense
    attack_upgrade_level = 0
    defense_upgrade_level = 0
    attack_upgrade_cost = 30
    defense_upgrade_cost = 30
    level = 1
    current_health = 100
    max_health = 100
    current_experience = 0
    previous_level_experience = 0
    experience_to_level_up = (1 * 100) * 0.7
    difference_between_current_experience_and_previous_level_experience = 0
    difference_between_experience_to_level_up_and_previous_level_experience = this.experience_to_level_up - this.previous_level_experience
    class_id = 0
    gold = 50

    constructor(nick) {
        this.nick = nick
      }
    


    checkCharacterExperience(){
        if (this.current_experience >= this.experience_to_level_up)
        {   
            this.previous_level_experience = this.experience_to_level_up
            this.levelUp()
            this.difference_between_current_experience_and_previous_level_experience = this.current_experience - this.previous_level_experience
            this.difference_between_experience_to_level_up_and_previous_level_experience = parseInt((this.experience_to_level_up - this.previous_level_experience).toFixed())
        }
        else
        {
            this.difference_between_current_experience_and_previous_level_experience = this.current_experience - this.previous_level_experience
            this.difference_between_experience_to_level_up_and_previous_level_experience = parseInt((this.experience_to_level_up - this.previous_level_experience).toFixed())
        }
    }

    levelUp(){
        this.level++
        this.max_health += 10
        this.current_health = this.max_health
        this.attack += 5
        this.defense += 5
        this.experience_to_level_up = (this.experience_to_level_up * 2.3)
        this.experience_to_level_up = parseInt(this.experience_to_level_up.toFixed())
    }

    experienceToLevelUpAsPercent(){
        return ((100 * this.difference_between_current_experience_and_previous_level_experience) / this.difference_between_experience_to_level_up_and_previous_level_experience).toFixed(2)
    }
    
    healthAsPercent(){
        return ((100 * this.current_health) / this.max_health).toFixed(2)
    }
    
    generateEnemyToFight(enemy_level){
        enemy = new Enemy(enemy_level)
    }

    attackEnemy(){
        //GET HEALTH BARS
        let player_health = document.getElementById('current-health-fight-player')
        let enemy_health = document.getElementById('current-health-fight-enemy')

        //GET FIGHT LOG
        let fight_log = document.getElementById('fight-log')

        //GET ATTACK BUTTON
        let attack_button = document.getElementById('attack-enemy')

        //GENERATE DAMAGE VALUE
        let minimum_player_attack_value = 0.8 * player.attack
        let maximum_player_attack_value = 1.2 * player.attack
        let player_attack_value = (Math.floor(Math.random() * (maximum_player_attack_value - minimum_player_attack_value + 1)) + minimum_player_attack_value) - (enemy.defense / 10);
        console.log(player_attack_value)
        let minimum_enemy_attack_value = 0.8 * enemy.attack
        let maximum_enemy_attack_value = 1.2 * enemy.attack
        let enemy_attack_value = (Math.floor(Math.random() * (maximum_enemy_attack_value - minimum_enemy_attack_value + 1)) + minimum_enemy_attack_value) - (player.defense / 10);

        //FIGHT CONDITIONS
        if (player.current_health > 0)
        {
            //CREATE CRITICAL CHANCE VARIABLE
            let critical_chance_for_player = Math.random() * (100 - 0) + 0;
            let player_attack = document.createElement('p')

            //IF CRITICAL CHANCE VARIABLE = TRUE THEN MULTIPLY ATTACK DAMAGE
            if (critical_chance_for_player >= 90)
            {
                player_attack_value *= 1.8
                player_attack.innerHTML = 'Gracz ' + player.nick + ' zadał przeciwnikowi ' + player_attack_value + ' obrażeń! Cios Krytyczny!'
            }
            else
                player_attack.innerHTML = 'Gracz ' + player.nick + ' zadał przeciwnikowi ' + player_attack_value + ' obrażeń.'

            
            //ADD DATA TO FIGHT LOG
            fight_log.appendChild(player_attack)

            //MODIFY PLAYER HEALTH
            enemy.current_health -= player_attack_value



            //IF PLAYER WIN
            if (enemy.current_health <= 0)
            {
                let gained_experience = document.createElement('p')
                let gained_gold = document.createElement('p')
                gained_experience.innerHTML = 'Zdobywasz ' + enemy.experience_for_kill + ' doświadczenia'
                gained_gold.innerHTML = 'Zdobywasz ' + enemy.gold_for_kill + ' sztuk złota'
                enemy_health.style.width = 0 + '%'
                player.current_experience += enemy.experience_for_kill
                player.gold += enemy.gold_for_kill
                fight_log.appendChild(gained_experience)
                fight_log.appendChild(gained_gold)
            }

            else
                enemy_health.style.width = enemy.healthAsPercent() + '%'
        }


        if (enemy.current_health > 0)
        {
            let enemy_attack = document.createElement('p')
            enemy_attack.innerHTML = 'Przeciwnik ' + enemy.name + ' zadał Ci ' + enemy_attack_value + ' obrażeń.'
            fight_log.appendChild(enemy_attack)
            

            player.current_health -= enemy_attack_value

            if (player.current_health <= 0)
            {
                //GET END GAME OBJECTS
                let game_over_window = document.getElementById('game-over')
                let player_level_span = document.getElementById('player-level')
                let player_experience_span = document.getElementById('player-experience')

                //SEND DATA TO THIS OBIECTS
                player_level_span.innerHTML = player.level
                player_experience_span.innerHTML = player.current_experience
                game_over_window.style.display = 'initial'
                player_health.style.width = 0 + '%'
            }
            else
                //MODIFY PLAYER HEALTH BAR
                player_health.style.width = player.healthAsPercent() + '%'
        }
        else
        {
            attack_button.style.display = 'none'
        }

        //SCROLL FIGHT LOG TO DOWN
        fight_log.scrollTop = fight_log.scrollHeight;

    }
}



class Enemy{
    name 
    level
    current_health
    max_health
    attack
    defense
    experience_for_kill
    
    constructor(level){
        let names_of_enemies = ['Mroczny magik', 'Nietoperz jaskiniowy', 'Bandyta', 'Wielki Pająk', 'Zombie', 'Krokodyl', 'Mumia', 'Wilkołak', 'Goblin', 'Ork', 'Pirat']
        let enemy_number = Math.floor(Math.random() * 9) + 0;
        this.name = names_of_enemies[enemy_number]
        this.level = level
        this.max_health = 100 + (this.level * 10)
        this.current_health = this.max_health
        this.attack = 10 + (this.level * 5)
        this.defense = 10 + (this.level * 5)
        this.experience_for_kill = 20 + (level * 30)
        this.gold_for_kill = 30 + (level * 30)

        //SET ENEMY HEALTH BAR TO 100% IF OBJECT HAS BEEN CREATED
        let enemy_health = document.getElementById('current-health-fight-enemy')
        enemy_health.style.width = '100%'
    }

    healthAsPercent(){
        return ((100 * this.current_health) / this.max_health).toFixed(2)
    }

}

var player = new Player()
var enemy

//CREATING CHARACTER WITH NICK FROM USER INPUT

function createCharacter(){
    //GET OBJECTS FROM GAME WINDOW
    let input_field = document.getElementById('input-character-name')
    let start_game_button = document.getElementById('start-game')
    let starting_screen = document.getElementById('starting-screen')
    let game_tip = document.getElementById('game-tip')

    //SET NICKNAME AND CREATE OBJECT PLAYER WITH NICKNAME FROM INPUT
    let nickname = input_field.value
    player.nick = nickname

    //DELETE OBJECTS FROM GAME WINDOW
    starting_screen.removeChild(start_game_button)
    starting_screen.removeChild(input_field)
    starting_screen.removeChild(game_tip)

    //CREATE TEXT - SELECT CLASS
    game_tip.innerHTML = 'Wybierz klasę postaci'
    let hello_player = document.createElement('p');
    hello_player.innerHTML = 'Witaj ' + player.nick + ' wybierz klase postaci.';
    hello_player.className = 'hello-player'
    starting_screen.appendChild(hello_player)

    //CREATE FLEX DIV WITH CLASS ICONS
    let class_choice_div = document.createElement('div')
    class_choice_div.className = 'class_choice_div'
    starting_screen.appendChild(class_choice_div)

    let warrior = document.createElement('div')
    let warrior_icon = document.createElement('i')
    warrior_icon.className = 'fas fa-duotone fa-sword fa-4x'
    warrior.className = 'class warrior'
    warrior.id = 'warrior_button'
    warrior.appendChild(warrior_icon)

    let archer = document.createElement('div')
    let archer_icon = document.createElement('i')
    archer_icon.className = 'fas fa-solid fa-bow-arrow fa-4x'
    archer.className = 'class archer'
    archer.id = 'archer_button'
    archer.appendChild(archer_icon)

    let mage = document.createElement('div')
    let mage_icon = document.createElement('i')
    mage_icon.className = 'fas fa-wand-magic fa-4x'
    mage.className = 'class mage'
    mage.id = 'mage_button'
    mage.appendChild(mage_icon)

   
    //ADD SELECT CLASS BUTTONS TO GAME
    class_choice_div.appendChild(warrior)
    class_choice_div.appendChild(archer)
    class_choice_div.appendChild(mage)

    warrior.addEventListener("click", function () {
        player.attack = 20;
        player.defense = 20;
        player.class_id = 1;
        let character_stats = document.getElementById('character-stats')
        character_stats.style.display = 'initial'
        gameMenu()
    });

    archer.addEventListener("click", function () {
        player.attack = 25;
        player.defense = 15;
        player.class_id = 2;
        let character_stats = document.getElementById('character-stats')
        character_stats.style.display = 'initial'
        gameMenu()
    });

    mage.addEventListener("click", function () {
        player.attack = 30;
        player.defense = 10;
        player.class_id = 3;
        let character_stats = document.getElementById('character-stats')
        character_stats.style.display = 'initial'
        gameMenu()
    });
    


}

function checkUpgradeAvability(){
    let attack_upgrade_button = document.getElementById('attack-upgrade-button')
    let defense_upgrade_button = document.getElementById('defense-upgrade-button')

    //CHANGE BUTTON COLOR IF PLAYER HAVE REQUIRED GOLD
    if (player.gold >= player.attack_upgrade_cost)
        attack_upgrade_button.className = 'btn btn-primary'
    else
        attack_upgrade_button.className = 'btn btn-secondary'

    if (player.gold >= player.defense_upgrade_cost)
        defense_upgrade_button.className = 'btn btn-primary'
    else
        defense_upgrade_button.className = 'btn btn-secondary'
    
}


function upgradeAttack(){
    //UPGRADE PLAYER ATTACK 
    if (player.gold >= player.attack_upgrade_cost)
    {
        player.attack_upgrade_level++
        player.gold -= player.attack_upgrade_cost 
        player.attack_upgrade_cost = (player.attack_upgrade_cost + (player.attack_upgrade_cost * 0.6))
        player.attack_upgrade_cost = player.attack_upgrade_cost.toFixed()
        player.attack_upgrade_cost = parseInt(player.attack_upgrade_cost)

        player.attack += (player.attack_upgrade_level * 2.5)

        //UPDATE DATA IN GAME
        setInitialDataToCharacterInformationBox()
    }
}

function upgradeDefense(){
    //UPGRADE PLAYER DEFENSE
    if (player.gold >= player.defense_upgrade_cost)
    {
        player.defense_upgrade_level++
        player.gold -= player.defense_upgrade_cost 
        player.defense_upgrade_cost = (player.defense_upgrade_cost + (player.defense_upgrade_cost * 0.6))
        player.defense_upgrade_cost = player.defense_upgrade_cost.toFixed()
        player.defense_upgrade_cost = parseInt(player.defense_upgrade_cost)

        player.defense += (player.defense_upgrade_level * 2.5)

        //UPDATE DATA IN GAME
        setInitialDataToCharacterInformationBox()
    }
}

function setInitialDataToCharacterInformationBox(){

    //GET ELEMENTS FROM SITE STRUCTURE
    let player_nick_and_level = document.getElementById('player-nick-and-level')
    let health_text = document.getElementById('stat-health')
    let experience_text = document.getElementById('stat-experience')
    let second_experience_text = document.getElementById('current_experience')
    let level_text = document.getElementById('level')
    let attack_text = document.getElementById('attack')
    let defense_text = document.getElementById('defense')
    let current_health_text = document.getElementById('current_health')
    let max_health_text = document.getElementById('max_health')
    let gold = document.getElementById('gold')
    let required_attack_upgrade_gold = document.getElementById('required-attack-upgrade-gold')
    let required_defense_upgrade_gold = document.getElementById('required-defense-upgrade-gold')
    let current_experience_bar = document.getElementById('current-experience-bar')
    let current_health_bar = document.getElementById('current-health-bar')

    //USE CHANGE COLOR FUNCTION
    checkUpgradeAvability()
    player.checkCharacterExperience()

    //CHANGE ELEMENTS DATA
    health_text.innerHTML = 'Zdrowie ' + player.current_health + '/' + player.max_health
    experience_text.innerHTML = 'Doświadczenie ' + player.current_experience + '/' + player.experience_to_level_up
    current_experience_bar.style.width = player.experienceToLevelUpAsPercent() + '%'
    current_health_bar.style.width = player.healthAsPercent() + '%'
    second_experience_text.innerHTML = player.current_experience
    level_text.innerHTML = player.level
    attack_text.innerHTML = player.attack
    defense_text.innerHTML = player.defense
    current_health_text.innerHTML = player.current_health
    max_health_text.innerHTML = player.max_health
    gold.innerHTML = player.gold
    required_attack_upgrade_gold.innerHTML = player.attack_upgrade_cost
    required_defense_upgrade_gold.innerHTML = player.defense_upgrade_cost
    player_nick_and_level.innerHTML = player.nick + ' - Poziom ' + player.level
}
function resetGame(){
    location.reload()
}
function gameMenu(){
    let game_fight = document.getElementById('game-fight')
    game_fight.style.display = 'none'
    let generate_enemy_easy = document.getElementById('generate-enemy-easy')
    let generate_enemy_medium = document.getElementById('generate-enemy-medium')
    let generate_enemy_hard = document.getElementById('generate-enemy-hard')
    let generate_enemy_hardcore = document.getElementById('generate-enemy-hardcore')



    generate_enemy_easy.addEventListener('click', function (){
        fight(player.level - 1)
    })

    generate_enemy_medium.addEventListener('click', function (){
        fight(player.level)
    })

    generate_enemy_hard.addEventListener('click', function (){
        fight(player.level + 1)
    })

    generate_enemy_hardcore.addEventListener('click', function (){
        fight(player.level + 2)
    })

    setInitialDataToCharacterInformationBox()
    let starting_screen = document.getElementById('starting-screen')
    let game_menu = document.getElementById('game-menu')
    starting_screen.style.display = 'none'
    game_menu.style.display = 'initial'
}

function fight(enemy_level){
    //GET CONTENT
    let game_fight = document.getElementById('game-fight')
    let back_to_castle = document.getElementById('back-to-castle')
    let attack_enemy_button = document.getElementById('attack-enemy')
    let fight_log = document.getElementById('fight-log')
    let attack_button = document.getElementById('attack-enemy')
    let enemy_name = document.getElementById('enemy-name')

    //UPDATE PLAYER HEALTH BAR WIDTH
    let player_health_bar = document.getElementById('current-health-fight-player')
    player_health_bar.style.width = player.healthAsPercent() + '%'

    
    
    //CLEAN FIGHT LOG DATA
    while (fight_log.firstChild) {
        fight_log.firstChild.remove()
    }
    
    
    //ADD ACTION TO BUTTONS
    back_to_castle.addEventListener('click', gameMenu)
    attack_enemy_button.addEventListener('click', player.attackEnemy)
    
    //SET ELEMENTS VISIBILITY
    game_fight.style.display = 'initial'
    attack_button.style.display = 'initial'
    
    
    //GENERATE ENEMY
    player.generateEnemyToFight(enemy_level)
    
    //SET ENEMY NAME IN FIGHT SCREEN
    enemy_name.innerHTML = 'Jest nim ' + enemy.name





}