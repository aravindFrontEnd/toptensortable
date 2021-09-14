const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const topTen = [
  "New Zealand",
  "England",
  "Australia",
  "India",
  "South Africa",
  "Pakistan",
  "Bangladesh",
  "West Indies",
  "Sri Lanka",
  "Afghanistan",
];

// store list items

const listItems =[];

let dragStartIndex;

createList();

//INsert list items into DOM
//make the scrambled list 
function createList()
{
    [...topTen]
    .map(a =>({value: a ,sort: Math.random()}))
    .sort((a,b)=> a.sort - b.sort) //sort based on above sorted values
    .map(a =>a.value) //map the sorted values in listItems
    .forEach((person,index)=>{
        const listItem = document.createElement('li');
        // listItem.classList.add('over')
        listItem.setAttribute('data-index',index);
        listItem.innerHTML = `
        <span class="number">${index +1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;
    listItems.push(listItem);
    draggable_list.appendChild(listItem);
    });

    addEventListeners();
    
}

function dragStart(){
dragStartIndex =this.closest('li').getAttribute('data-index')
}

function dragEnter() {
 this.classList.add('over');
}

function dragLeave() {
this.classList.remove('over');
}
//majorly to prevent the default behavior 
function dragOver(e) {
e.preventDefault();
}

function dragDrop() {
const dragEndIndex = this.getAttribute("data-index");
swapItems(dragStartIndex,dragEndIndex);
this.classList.remove('over');
}

function swapItems(fromIndex,toIndex){
const itemOne = listItems[fromIndex].querySelector(".draggable");
const itemTwo = listItems[toIndex].querySelector(".draggable");
//swapping the start & end index list to list items
listItems[fromIndex].appendChild(itemTwo);
listItems[toIndex].appendChild(itemOne);
}

//check order function
function checkOrder()
{
    listItems.forEach((list,index)=>{
        const personName = list.querySelector('.draggable').innerText.trim();

        if(personName !==topTen[index])
        {
            list.classList.add('wrong');
        }
        else{
            list.classList.remove("wrong");
            list.classList.add("right");
        }
    })

}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll(".draggable-list li");

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart',dragStart);
    });

     dragListItems.forEach((item) => {
       item.addEventListener("dragover", dragOver);
       item.addEventListener("drop", dragDrop);
       item.addEventListener("dragenter", dragEnter);
       item.addEventListener("dragleave", dragLeave);
     });
}

check.addEventListener('click',checkOrder);