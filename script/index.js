
const activeclass=()=>{
const active = document.querySelectorAll(".ctgbtn");
active.forEach((btn)=> btn.classList.remove("active"));
}
// card button 
const addCard = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res)=> res.json())
    .then((data)=> addcarddetail(data.plants))
}

const removediv=(dt)=>{
const totalvalue = Number(document.getElementById("totalTk").innerText);
const newvalue =  Number(dt);
document.getElementById("totalTk").innerText = totalvalue - newvalue ;
}

const  addcarddetail =(ca)=>{
 const maindiv = document.getElementById("card-div")
    const newdiv = document.createElement("div");
    newdiv.innerHTML=`
  <div class="bg-[#F0FDF4] py-1 px-1 flex content-center mt-1 mb-2">
                    <div class="w-full">
                    <h1 class="font-bold ">${ca.name }</h1>
                    <p class = "font-semibold"> Price : ৳${ca.price}</p>
                    </div>
                    <div onclick="this.parentElement.remove(); removediv(${ca.price})" class="content-center text-[#8C8C8C]"> <i class="fa-solid fa-xmark font-bold "></i></div>
   </div>
  `;
  maindiv.append(newdiv)

const totalvalue = Number(document.getElementById("totalTk").innerText);
const newvalue =  Number(ca.price);
document.getElementById("totalTk").innerText = totalvalue + newvalue ;

}

fetch('https://openapi.programming-hero.com/api/categories')
.then((res)=> res.json())
.then((data)=>allbutton(data.categories))

const treeCtg=(id)=>{
fetch(`https://openapi.programming-hero.com/api/category/${id}`)
.then((res)=> res.json())
.then((data)=>{
     activeclass()
     const clickbtn = document.getElementById(`CtgBtn-${id}`);
     clickbtn.classList.add("active");

    plants(data.plants)})
}
const allbutton = (ctg)=>{
    const allbutton = document.getElementById("all-button");
    ctg.forEach((el)=>{
        const newbutton = document.createElement("div");
        newbutton.innerHTML=`<button id="CtgBtn-${el.id}" onclick="treeCtg(${el.id})"  class="text-left  w-full font-bold  h-10 py-2 px-2 text-sm ctgbtn ">${el.category_name}</button>`;
        allbutton.append(newbutton);
    })
};


const allPlantTree =()=>{
    fetch('https://openapi.programming-hero.com/api/plants')
    .then((res)=> res.json())
    .then((data)=> plants(data.plants))
}
// all tree plants
document.getElementById("all-trees").addEventListener("click",function(){
    activeclass();
    this.classList.add("active");
    fetch('https://openapi.programming-hero.com/api/plants')
    .then((res)=> res.json())
    .then((data)=> plants(data.plants))
})

const plants = (data)=>{
    const card = document.getElementById("all-trees-card");
        card.innerHTML="";
    data.forEach(el => {
        spinnershowhide(true)
        const newdiv = document.createElement("div");
        newdiv.innerHTML=`
            <div class="card bg-base-100 py-4 px-4 shadow-sm bg-[#FFFFFF] h-90 content-around md:px-2 py-2 lg:px-4 py-4 max-[577px]:px-2">
                        <figure>
                            <img class="object-cover h-45 w-full mx-auto object-fit"
                            src="${el.image}"
                            alt="Tree" />
                        </figure>
                        <div class="mt-4 md:mt-2 lg:mt-4">
                            <h2 onclick="loadDetails(${el.id})" class=" card-title text-sm font-bold  max-[345px]:text-[0.6rem]">${el.name}</h2>
                            <p class="text-[0.7rem] line-clamp-2 max-[577px]:text-[0.7rem]">${el.description}</p>
                            <div class="card-actions justify-between py-2 ">
                                <div class="badge bg-[#DCFCE7] rounded-full text-[#15803D] max-[577px]:text-[0.4rem] sm:text-[0.5rem] md:text-[0.5rem] lg:text-[0.5rem] xl:text-[0.8rem]">${el.category}</div>
                                <div class="font-semibold max-[577px]:text-[0.7rem]  md:text-[0.7rem] lg:text-[0.9rem] xl:text-[1rem] ">৳${el.price}</div>
                            </div>
                            <div onclick="addCard(${el.id})" class="card-actions  py-2">
                            <button class="btn w-full rounded-full bg-[#15803D] text-[#FFFFFF] max-[345px]:text-[0.6rem]" >Add to Cart</button>
                            </div>
                        </div>
            </div>
        `;
        card.append(newdiv);

    });
    spinnershowhide(false)
}
// detail card 
const loadDetails= (id)=>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res)=> res.json())
    .then((data)=> detailshow(data.plants))

}
const detailshow=(de)=>{
    console.log(de)
const newdiv = document.getElementById("container-detail");
newdiv.innerHTML=`
                        <h1 class=" card-title text-2xl font-bold">${de.name}</h1>
                        <img class="object-fit object-cover objecr-center h-78 w-full  mx-auto mt-1" src="${de.image}"alt="Tree" />
                        <div class="font-sm py-1"> 
                        <div class=""><span class="font-semibold">Category</span> : ${de.category}</div>
                        <div class=""><span class="font-semibold"> Price </span> : ৳${de.price}</div>   
                        <p class="text-[1rem]"><span class="font-semibold">Description </span> : ${de.description}</p>
                        </div>
`;

    document.getElementById("my_modal_5").showModal();
}


 allPlantTree();

const spinnershowhide=(data)=>{
if(data){
    document.getElementById("spinner-div").classList.remove("hidden");
    document.getElementById("all-trees-card").classList.add("hidden");
}
else{
    document.getElementById("all-trees-card").classList.remove("hidden");
    document.getElementById("spinner-div").classList.add("hidden");
}
}