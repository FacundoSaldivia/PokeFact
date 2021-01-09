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
        .catch(function(response){
            console.log('no existe kpo');
            consultarPkm(1);
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
        if (!typeArray.includes(type.type.name)) {
            typeArray.push(type.type.name);
        } 
    })
    bgType(typeArray)
    agregarType(typeArray)
    
    typeArray.length = 0;
}
var auxArr = []
function agregarType(array){
    tipo[0].setAttribute('src',`img/${array[0]}.png`)
    tipo[1].setAttribute('src',`img/${array[1]}.png`)
    }


function bgType(array){
    if (array.length > 1){
        document.body.style.background = `linear-gradient(76deg, var(--${array[0]}) 0%, var(--${array[1]}) 100%)`
        console.log()
    } else if ( array.length == 1){
        document.body.style.background = `var(--${array[0]})`
    }
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
var a = 0;
function mostrarPkmFact(arrPkmFact){
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
var pkmSearch = 1;

leftButton.addEventListener('click', ()=>{
    a--
    consultarPkm(pkmSearch)
 })
 rightButton.addEventListener('click', ()=>{
    a++
    consultarPkm(pkmSearch)
 })



var barInput = document.getElementById("myInput");
barInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   pkmSearch = (barInput.value);
   consultarPkm(pkmSearch)
   barInput.value = '';
  }
});
consultarPkm(pkmSearch)