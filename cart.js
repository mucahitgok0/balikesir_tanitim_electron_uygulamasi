let carts = document.querySelectorAll('.add-cart');

let travels = [
    {
        name: "Agia Triyada Kilisesi",
        tag: "agiatriyadakilisesi",
        inCart: 0
    },
    {
        name: "Çataltepe Plajı",
        tag: "cataltepeplajı",
        inCart: 0
    },
    {
        name: "ilkkursun",
        tag: "ilkkursun",
        inCart: 0
    },
];

// localStorage'daki cartItems'ı oku ve travels dizisini güncelle
let cartItems = localStorage.getItem('travelsInCart');
cartItems = JSON.parse(cartItems);
if (cartItems) {
    travels = travels.map(travel => {
        if (cartItems[travel.tag]) {
            travel.inCart = cartItems[travel.tag].inCart;
        }
        return travel;
    });
}

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(travels[i]);
    });
}

function onLoadCartNumbers() {
    let travelNumbers = localStorage.getItem('cartNumbers');
    if (travelNumbers) {
        document.querySelector('.cart span').textContent = travelNumbers;
    }
}

function cartNumbers(travel) {
    console.log("tıklandığında verilerin localstoragee kaydedildiğini gösteriyor", travel);
    let travelNumbers = localStorage.getItem('cartNumbers');
    travelNumbers = parseInt(travelNumbers);

    if (travelNumbers) {
        if (travel.inCart === 0) {
            localStorage.setItem('cartNumbers', travelNumbers + 1);
            document.querySelector('.cart span').textContent = travelNumbers + 1;
        }
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(travel);
}

function setItems(travel) {
    let cartItems = localStorage.getItem('travelsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[travel.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [travel.tag]: travel
            };
        }
        cartItems[travel.tag].inCart += 1;
    } else {
        travel.inCart = 1;
        cartItems = {
            [travel.tag]: travel
        };
    }
    localStorage.setItem("travelsInCart", JSON.stringify(cartItems));
}

function displayCart() {
    let cartItems = localStorage.getItem("travelsInCart");
    cartItems = JSON.parse(cartItems);
    let travelContainer = document.querySelector(".travels");

    if (cartItems && travelContainer) {
        travelContainer.innerHTML = '';
        Object.values(cartItems).forEach(item => {
            travelContainer.innerHTML += `
            <div class="travel">
                <span>${item.name}</span>
                <img src="./images/${item.tag}.jpg">
                <ion-icon name="trash-outline"></ion-icon>
            </div>
            `;
        });
    }
}

onLoadCartNumbers();
displayCart();
