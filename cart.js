// DOM tamamen yüklendikten sonra bu kodu çalıştır
document.addEventListener('DOMContentLoaded', () => {
  //add-cart sınıfına ait tüm öğeleri seç
  const carts = document.querySelectorAll('.add-cart');
  //seeyehat dizisinde bulunan ögelerin detaylarını bulunuyor
  let travels = [
    {
      name: "Şeytan Sofrası",
      tag: "seytansofrasi",
      inCart: 0
      },
      {
      name: "Cunda Adası",
      tag: "cundaadasi",
      inCart: 0
      },
      {
      name: "Aşıklar Tepesi",
      tag: "asiklartepesi",
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

  //carts dizisndeki nesnleri döngüye alıyoruz
  for (let i = 0; i < carts.length; i++) {
    //click gerçekleştiğinde  
    carts[i].addEventListener('click', () => {
      //travels dizisini cartNumbers için parametre gönderir
      cartNumbers(travels[i]);
    });
  }

  // Sayfa yüklendiğinde, sepetin içindeki gezilecek yer sayısını yükleyen fonksiyon
function onLoadCartNumbers() {
  // localStorage'dan 'cartNumbers' olan değeri alıyoruz
  let travelNumbers = localStorage.getItem('cartNumbers');
  // Eğer 'cartNumbers' değeri varsa, bu değeri sepete ekliyoruz
  if (travelNumbers) {
      document.querySelector('.cart span').textContent = travelNumbers;
  }
}

// Bir ürünü sepete eklemek için kullanılan fonksiyon
function cartNumbers(travel) {
  // localStorage'dan 'cartNumbers' olan değeri alıyoruz
  let travelNumbers = localStorage.getItem('cartNumbers');
  travelNumbers = parseInt(travelNumbers);

  // Eğer 'cartNumbers' değeri varsa ve travel öğesi sepette değilse, sayıyı artırıyoruz
  if (travelNumbers) {
      if (travel.inCart === 0) {
          localStorage.setItem('cartNumbers', travelNumbers + 1);
          document.querySelector('.cart span').textContent = travelNumbers + 1;
      }
  } else {
      // Eğer 'cartNumbers' değeri yoksa, değeri 1 yapıyoruz ve sepet simgesine yazıyoruz
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent = 1;
  }

  // Sepete eklenen yerleri localStorage'a kaydediyoruz
  setItems(travel);
}

// Sepete eklenen yerleri localStorage'a kaydetmek için kullanılan fonksiyon
function setItems(travel) {
  // localStorage'dan 'travelsInCart' olan değeri alıyoruz ve JSON formatına çeviriyoruz
  let cartItems = localStorage.getItem('travelsInCart');
  cartItems = JSON.parse(cartItems);

  // Eğer 'cartItems' null değilse ve travel öğesi daha önce eklenmemişse, travel öğesini ekliyoruz
  if (cartItems != null) {
      if (cartItems[travel.tag] === undefined) {
          cartItems = {
              ...cartItems,
              [travel.tag]: travel
          };
      }
        //cart numbers değerinin  yapılmasının nedeni daha sonrasında sepete eklemeyi engellemek
      // Eğer travel öğesi sepette 1'den fazla değilse, 'inCart' sayısını artırıyoruz
      if (cartItems[travel.tag].inCart != 1) {
          cartItems[travel.tag].inCart += 1;
      }
  } else {
      // Eğer 'cartItems' null ise, travel öğesini sepete ekliyoruz ve 'inCart' değerini 1 yapıyoruz
      travel.inCart = 1;
      cartItems = {
          [travel.tag]: travel
      };
  }
  // 'travelsInCart' anahtarıyla güncellenmiş 'cartItems' değerini localStorage'a kaydediyoruz
  localStorage.setItem("travelsInCart", JSON.stringify(cartItems));
}

// Sepetteki ürünleri ekranda gösteren fonksiyon
function displayCart() {
  // localStorage'dan 'travelsInCart' anahtarına sahip değeri alıyoruz ve JSON formatına çeviriyoruz
  let cartItems = localStorage.getItem("travelsInCart");
  cartItems = JSON.parse(cartItems);
  let travelContainer = document.querySelector(".travels");

  // Eğer 'cartItems' ve 'travelContainer' varsa, sepet öğelerini ekranda gösteriyoruz
  if (cartItems && travelContainer) {
      travelContainer.innerHTML = '';
      // Sepetteki her ürünü ekranda gösteriyoruz
      Object.values(cartItems).forEach((item, index) => {
          travelContainer.innerHTML += `
              <div class="travel" id="travel-${index}">
                  <span>${item.name}</span>
                  <img src="./images/${item.tag}.jpg" alt="${item.name}">
                  <ion-icon name="trash-outline" class="remove-item" data-tag="${item.tag}"></ion-icon>
              </div>
          `;
      });

      let removeIcons = document.querySelectorAll('.remove-item');
      removeIcons.forEach(icon => {
          icon.addEventListener('click', (e) => {
              let tag = e.target.getAttribute('data-tag');
              removeItem(tag);
          });
      });
  }
}

// Sepetten ürün çıkarmak için kullanılan fonksiyon
function removeItem(tag) {
  // localStorage'dan 'travelsInCart' anahtarına sahip değeri alıyoruz ve JSON formatına çeviriyoruz
  let cartItems = JSON.parse(localStorage.getItem('travelsInCart'));
  // Eğer 'cartItems' ve 'cartItems[tag]' varsa, ilgili yeri çıkartıyoruz
  if (cartItems && cartItems[tag]) {
      delete cartItems[tag];
      localStorage.setItem('travelsInCart', JSON.stringify(cartItems));

      // 'cartNumbers' değerini bir azaltıyoruz ve sepet simgesine yazıyoruz
      let travelNumbers = localStorage.getItem('cartNumbers');
      travelNumbers = parseInt(travelNumbers) - 1;
      localStorage.setItem('cartNumbers', travelNumbers);
      document.querySelector('.cart span').textContent = travelNumbers;

      // Güncellenmiş sepeti tekrar ekranda gösteriyoruz
      displayCart();
  }
}

// Sayfa yüklendiğinde sepet sayısını ve içeriğini ekranda göstermek için çağırıyoruz
onLoadCartNumbers();
displayCart();
});
