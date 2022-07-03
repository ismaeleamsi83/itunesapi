/* Si Funciona
const API_URL = "http://jsonplaceholder.typicode.com";

const HTMLResponse = document.querySelector("#app");


fetch (`${API_URL}/users`).then((response) => response.json()).then((users) => {
    const tpl = users.map((user) => `<li class="bg-white p-3">${user.name} - ${user.email}</li>`);
    HTMLResponse.innerHTML = `<ul>${tpl}</ul>`;
    console.log(tpl);
});

*/



const introducido = document.getElementById("busq");
const buscar = document.getElementById("buscar");
buscar.addEventListener(`click`, busqueda );

const lista = document.getElementById("lista");

console.log("primero");

function busqueda(){
    let url = 'https://itunes.apple.com/search?term='+introducido.value
   // let cors = 'https://cors-anywhere.herokuapp.com/'

   
    

    fetch(url)
    .then( data => data.json())
    .then(json => {
        console.log(json)
        const finalHTML = [];

        json.results.forEach(song => {
            const videoAudio = song.previewUrl;

            lista.innerHTML = '';
            
            if(videoAudio.includes("audio")){

                finalHTML.unshift(
                `
                <li class="prueba"><img src="${song.artworkUrl60}" class="oculto" />
                <br>Titulo: ${song.trackName}
                <br>Autor: ${song.artistName}
                <br><audio src="${song.previewUrl}" preload="none" controls class="oculto" class="reproducir"></audio></li>
                `
                );

            }else if(videoAudio.includes("video")){
                finalHTML.push(
                `
                <li class="prueba"><img src="${song.artworkUrl60}" class="oculto" />
                <br>Titulo: ${song.trackName}
                <br>Autor: ${song.artistName}
                <br><video src="${song.previewUrl}" preload="none" controls class="oculto" style="width:100%" class="reproducir"></video></li>
                `
                );
            }else{
                console.log('no tiene video');
            }
            
            
            
        });
        
        
        finalHTML.forEach(pegarLi);
        
        function pegarLi(item){
            //console.log(item);
            lista.innerHTML += item;
            
        }
        
        
        //lista.innerHTML = finalHTML;
        
    })
    .catch(error => console.log(error))
    
    //console.log("segundo");
    
}


lista.addEventListener('click', (e) => {
    for(let i = 0; i < lista.children.length; i++){
        lista.children[i].style.backgroundColor = 'white';
        lista.children[i].className = 'ocultar';
        lista.children[i].color = 'black';
        lista.children[i].boxShadow = 'none';
    }

    const posicion = e.target;
    arriba = document.querySelector('#arriba');
    arriba.style.backgroundColor = '#679EFF';
    arriba.style.color = 'black';
    arriba.innerHTML = posicion.innerHTML;

    

    posicion.style.backgroundColor = 'aliceblue';
    posicion.className = 'mostrar';

    const imagenyCancion = arriba.querySelectorAll('.oculto');
    imagenyCancion[0].className = 'muestra';
    imagenyCancion[1].className = 'muestra';


    // autoplay
    let check = document.getElementById('autoplay');
    let reprod = arriba.querySelector('.reproducir');
    console.log(check);
    if(check.checked == true){
        console.log("ok autoplay");
        
    }


    //tarea 8
    let xIni;

    lista.addEventListener('touchstart', (e) => {
        xIni = e.targetTouches[0].pageX;
    });

    lista.addEventListener('touchmove', (e) =>{
        const posi = e.target;
        
        const touchLocation = e.targetTouches[0].pageX;
        //console.log(touchLocation);

        if(xIni > touchLocation){
            //console.log("Izquierda");
            // sale 
            window.confirm("Desea Borrar esta cancion/video");

            //tarea 9

             
            
            let borrarLista = document.createElement("p");
            let textoLista = document.createTextNode("Borrar de la lista");
            borrarLista.appendChild(textoLista);

            posi.appendChild(borrarLista);
            borrarLista.style.color = 'white';
            borrarLista.style.backgroundColor = 'red';
            borrarLista.style.width = '25%';
            borrarLista.style.textAlign = 'center';

            borrarLista.addEventListener('click', (e) =>{

                posi.remove();
                borrarLista.remove();
        
            });
            
            
        }

        

    });

    

    

});


