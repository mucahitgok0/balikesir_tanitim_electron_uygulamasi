let carts = document.querySelectorAll('.add-cart');

let travels = [
    {
    name: "Agia Triyada Kilisesi",
    tag: "agiatriyadakilisesi",
    inCart: 0
    },
    {
        name: "Çataltepe Plajı",
        tag: "cataltepe plajı",
        inCart: 0
    },
    {
        name: "ilkkursun",
        tag: "ilkkursun",
        inCart: 0
    },
]
for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click',() =>{
        cartNumbers(travels[i]);
    })
}
function onLoadCartNumbers(){
    let travelNumbers = localStorage.getItem('cartNumbers');
    let data = document.querySelectorAll('.cart span');
    if(travelNumbers){
        data.textContent = travelNumbers;
    }
}

function cartNumbers(travels) {
    console.log("the product clicked is",travels);
        let travelNumbers = localStorage.getItem('cartNumbers');
       
        
        travelNumbers = parseInt(travelNumbers);
        
        if( travelNumbers){
            localStorage.setItem('cartNumbers',travelNumbers+1);
            document.querySelector('.cart span').textContent = travelNumbers+1;
        }
        else{
            localStorage.setItem('cartNumbers',1)
            document.querySelectorAll('.cart span').textContent = 1;
        }
        setItems(travels);
        
}

function setItems(travels){
    let cartItems = localStorage.getItem('travelsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[travels.tag] == undefined){
            cartItems = {
                ...cartItems,
                [travels.tag]: travels
            }
        }
        cartItems[travels.tag].inCart += 1;
    }
    /*seçtiğin ürünün sayısını arttırıyor*/else{
        travels.inCart = 1;

        cartItems = {
            [travels.tag]: travels
        }
    }
    /*
    travels.inCart = 1;

    cartItems = {
        [travels.tag]: travels
    }*/

    localStorage.setItem("travelsInCart",JSON.stringify
    (cartItems));
}

function displayCart(){
    let cartItems = localStorage.getItem("travelsInCart");
    cartItems = JSON.parse(cartItems);
    let travelContainer = document.querySelector(".travels");
    console.log(cartItems);
    if(cartItems && travelContainer){
        travelContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            travelContainer.innerHTML +=  `
            <div class="travel">
            <span>${item.name}</span>
            <img src="./images/${item.tag}.jpg">
            <ion-icon name="trash-outline"></ion-icon>
            </div>
            `
        });
    }
}

onLoadCartNumbers();
displayCart();