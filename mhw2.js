const IMG_ADD_PREF = 'https://img.icons8.com/ios/452/favorites.png'
const IMG_REMOVE_PREF = 'https://cdn.iconscout.com/icon/free/png-256/minus-2652914-2202831.png'

document.body.onload = addBox();
document.getElementById("box_ricerca").addEventListener("keyup", cerca);



function cerca(event) {
    const search_in = document.getElementById("box_ricerca");
    const change = search_in.value.toUpperCase();
    const ricerca_store = document.querySelectorAll("#box h1");
  
    for (let i in ricerca_store) {
      const text = ricerca_store[i].textContent;
      
      if (text.toUpperCase().indexOf(change) > -1) {
        ricerca_store[i].parentNode.classList.remove('hidden');
      } else {
        ricerca_store[i].parentNode.classList.add('hidden');
      }
    }

}

function addBox(){
const grid = document.querySelector("#box");
    for(let i =0; i < titoli.length; i++){
       
        const div_item = document.createElement("div");
        div_item.classList.add("square");
        grid.appendChild(div_item);
    
        const title_item = document.createElement("h1");
        title_item.setAttribute("style", "position: relative;");
        title_item.textContent = titoli[i];
        div_item.appendChild(title_item);
        
        const img_item = document.createElement("img");
        img_item.src = immagini[i];
        img_item.classList.add("settingImg");
        div_item.appendChild(img_item);

        const pref_item = document.createElement("img");
        pref_item.src = IMG_ADD_PREF;
        pref_item.classList.add("pref");
        pref_item.addEventListener("click",boxPreferiti);
        div_item.appendChild(pref_item);

        const desc_item = document.createElement("a");
        desc_item.textContent = "Mostra Dettagli";
        desc_item.addEventListener("click",mostraDiPiu);
        div_item.appendChild(desc_item);

        const detail_item = document.createElement("p");
        detail_item.textContent = descrizioni[i];
        detail_item.classList.add("hidden");
        div_item.appendChild(detail_item);

    }
}

function mostraDiPiu(event){
   const x = event.currentTarget;
   const y = event.currentTarget.parentNode.querySelector("p");
   
   if(x.textContent == "Mostra Dettagli"){
       y.classList.remove("hidden");
       x.textContent = "Nascondi Dettagli";
   } else {
       y.classList.add("hidden");
       x.textContent = "Mostra Dettagli";
   }

}

function calcolo(){
    let i = 0;
    const controllo = document.querySelectorAll('#fav_items div');
    while(controllo[i]){
       i++;
    }
    return i;
}


function boxPreferiti(event){

    const title=event.currentTarget.parentNode.querySelector('h1');
    let pref=event.currentTarget.parentNode.querySelector('.pref');
    const img=event.currentTarget.parentNode.querySelector('.settingImg');
 
    if(pref === null){
        pref= event.currentTarget.parentNode.querySelector('.pref_rem');
    }

    if(pref.src === IMG_ADD_PREF){

         // se è già trai preferiti non aggiungerlo
         if(document.querySelector ('#fav_items h1')){
            const vettore = document.querySelectorAll("#fav_items h1");

            for(let i =0; i < calcolo() ; i++){
                if(title.textContent === vettore[i].textContent){
                    return;
                }
         }
        }

        const z = document.querySelector("p");
        z.classList.remove("hidden");
        
       
        const box_mini = document.createElement("div");
        box_mini.classList.add("square_box");
        const preferiti=document.querySelector("#Preferiti");
        preferiti.classList.remove('hidden');
        const prefe= document.querySelector('#fav_items');
        const removeimg = document.createElement("img");
        removeimg.src = IMG_REMOVE_PREF;
        removeimg.addEventListener("click",boxPreferiti);
        removeimg.classList.add("pref_rem");
        const titolo = document.createElement("h1");
        titolo.textContent = title.textContent;
        const foto = document.createElement("img");
        foto.src = img.src;
        foto.classList.add("settingImg");
       
        prefe.appendChild(box_mini);
        box_mini.appendChild(titolo);
        box_mini.appendChild(foto);
        box_mini.appendChild(removeimg);
    
    }
    
    if(pref.src === IMG_REMOVE_PREF){
     event.currentTarget.parentNode.remove("h1");
        if(document.querySelector("#fav_items").childElementCount === 0) {
            const fav = document.querySelector("p");
            fav.classList.add('hidden');
        }  
        
    }
}
