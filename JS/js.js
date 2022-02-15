

//PLAYER OBJECT
class Player {

    nick;
    health = 100;
    strength = 10;
    defense = 10;
    level = 1;

    constructor(nick) {
        this.nick = nick;
      }
}



//CREATING CHARACTER WITH NICK FROM USER INPUT

function createCharacter(){
    //GET OBJECTS FROM GAME WINDOW
    let input_field = document.getElementById('input-character-name')
    let start_game_button = document.getElementById('start-game')
    let starting_screen = document.getElementById('starting-screen')
    let game_tip = document.getElementById('game-tip')

    //SET NICKNAME AND CREATE OBJECT PLAYER WITH NICKNAME FROM INPUT
    let nickname = input_field.value
    var player = new Player(nickname);


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

    warrior.addEventListener("click", gameMenu);
    archer.addEventListener("click", gameMenu);
    mage.addEventListener("click", gameMenu);
}


