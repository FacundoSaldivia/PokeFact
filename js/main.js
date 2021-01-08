const pkmFact = document.getElementById('fact');
const typeArray = [];
const tipo = document.getElementsByClassName('type');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const input = document.getElementById('input');

function consultarPkm(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function(response){
        response.json()
        .then(function(pokemon){
            crearPkm(pokemon);
        })
    })
}

function consultarEspecie(id){
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then (response => {
        response.json().then (pkmEspecie => {
            crearPkmFact(pkmEspecie)
        })
    })

}

function consultarType(pokemon){
    pokemon.types.forEach(type =>{
        agregarType(type.type.name)
    })
}

function agregarType(type){
    typeArray.push(type);
    tipo[0].setAttribute('src',`img/${typeArray[0]}.png`)
    tipo[1].setAttribute('src',`img/${typeArray[1]}.png`)
}


function crearPkmFact(pokemon){
    const pkmFactArray = [];
    var dataParaComparacion = '';
    pokemon.flavor_text_entries.forEach(element => {
        if(element.language.name == 'es'){
            if(element.flavor_text != dataParaComparacion){
                dataParaComparacion = element.flavor_text;
                pkmFactArray.push(element.flavor_text);

            }
        }  
    })
    mostrarPkmFact(pkmFactArray)
}
var asd = 0;
function boton(num){
    console.log(asd)
    return asd;
}
var a = 0;
function mostrarPkmFact(arrPkmFact){
    console.log(a)
    if (a >= 0 && a < arrPkmFact.length){
        pkmFact.textContent = arrPkmFact[a];
        leftButton.classList.remove('closed')
        rightButton.classList.remove('closed')
        if(a == 0){
            leftButton.classList.add('closed')
        } 
        if(a == arrPkmFact.length - 1){
            rightButton.classList.add('closed')
        }
    }

}


function crearPkm(pokemon){
    let pkmImg = document.getElementById('poke-img')
    consultarType(pokemon);
    pkmImg.setAttribute('src',pokemon.sprites.front_default)
    consultarEspecie(pokemon.id)
}
var as = 0;

leftButton.addEventListener('click', ()=>{
    a--
    consultarPkm(1)
 })
 rightButton.addEventListener('click', ()=>{
    a++
    consultarPkm(1)
 })

 consultarPkm(1)

 function search(ele) {
    if(Event.key === 13) {
        alert(ele.value);        
    }
}
search(input);