// const loginBtn = document.getElementById('login')
// const loginModal = document.getElementById('modal')
// const closeModal = document.getElementById('closeModal')
// loginBtn.addEventListener("click", function() {
//   loginModal.classList.toggle('hidden')
// })


if (window.location.pathname != '/login.html' && window.location.pathname != '/register.html' ) {
  console.log(window.location.pathname)
  document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });
}

if (window.location.pathname === '/register.html') {
  const register_btn = document.getElementById('register-btn')
  const register_form = document.getElementById('register-form')
  register_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if(data.email != "" || data.user != "" || data.password != "" || data.name != "" || data.address != "" || data.contact != "" ) {
      alert("SUCCESSFULLY REGISTER")
      window.location.href = "login.html"
    } else {
      alert("PLEASE FILL ALL INPUT")
    }
  })
}

if (window.location.pathname === '/index.html' || window.location.pathname === '/service.html') {
  
  const login = document.querySelectorAll('.login')
  const loginIcon = document.querySelectorAll('.login-icon')
  if(localStorage.getItem("isLoggedIn") === "true") {
    login.forEach(element => {
      element.classList.toggle('hidden')
    })
    loginIcon.forEach(element => {
      element.classList.toggle('hidden')
    })
  }
}

if (window.location.pathname === '/profile.html') {
  const logout = document.getElementById('logout-btn')
  if(localStorage.getItem("isLoggedIn") === "true") {
    login.classList.toggle('hidden')
    // loginIcon.classList.toggle('hidden')
  }

  logout.addEventListener('click', () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  })
}




//fetch paintings
async function getPaintings() {
  try {
    let response = await fetch('./painting.json');
    let data = await response.json();
    return data;
  } catch (err) {
    console.log("You got an error: " + err);
    
  }
}

// render all paintings 
// add to cart button 
if (window.location.pathname === '/shopping.html' ) {

  

  if(localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
  }

  async function renderPaintings() {
    //shopping container
    const shopping_div = document.getElementById('shopping-container');
    let html = '';
    let data = await getPaintings();
    data.forEach(painting => {
      html += `
      <article data-id=${painting.id} class="cursor-pointer painting-list break-inside-avoid group  rounded-4xl">
          <div class="relative overflow-hidden rounded-2xl">
              <img class="w-full object-cover object-center group-hover:scale-y-105 group-hover:scale-x-105 duration-75 ease-in" src="${painting.image}" alt="Find more" />
              <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 ease-in ">
                  <button class="add-cart w-full text-lg py-2 bg-white text-slate-900"> Add to Cart</button>
              </div>
          </div>
      </article>
              `;
    });
    shopping_div.innerHTML = html;
    //show painting modal
    const painting_list = document.querySelectorAll('.painting-list');
    painting_list.forEach(element => {
      element.addEventListener('click', function () {
        let id = this.dataset.id;
        const selectedPainting = data.find(painting => painting.id == id);
        modalShow(selectedPainting);
        modal.classList.toggle('hidden');
      })
    })
    //for cart render
    let cart = localStorage.getItem("Cart");
    if (cart) {
      cart = JSON.parse(cart)
    } else {
      cart = []
    }
    const add_cart = document.querySelectorAll('.add-cart')
    add_cart.forEach(button => {
      button.addEventListener('click', (e) => {


        


        const paintingArticle = e.target.closest('.painting-list');
        const id = paintingArticle.dataset.id
        const selectedPainting = data.find(painting => painting.id == id);
        if (!cart.includes(selectedPainting.id)) {
              alert("SUCCESSFULLY ADDED TO CART")
            cart.push(selectedPainting.id)
        } else {
          alert("This is already in your cart")
        }
        localStorage.setItem("Cart", JSON.stringify(cart))
        // }
      })
    })

    //add to cart
    // const add_cart = document.querySelectorAll('.add-cart')
    // add_cart.forEach(element => {
    //   element.addEventListener('click', () => {

    //   })
    // })
    // paintingModalTrigger(data)
  }
  renderPaintings()


  //responsible showing what image you click and their correspond data
  // function paintingModalTrigger(data) {
  //   const painting_list = document.querySelectorAll('.painting-list');
    
  //   painting_list.forEach(element => {
  //     element.addEventListener('click', function () {
  //       const id = this.dataset.id;
  //       modal.classList.toggle('hidden');
  //       const selectedPainting = data.find(painting => painting.id == id);
  //       modalShow(selectedPainting);
  //     })
  //   })
  // }
  // paintingModalTrigger()

  //responsible to show the modal when clicking the image
  //also it handling the close button 
  //and the full view of the image
  function modalShow(data) {
    const modal = document.getElementById('modal');
    html = ` 
    <div class="body-modal bg-white rounded-lg shadow-lg w-full max-w-3xl relative min-h-3/5 max-h-4/6 max-[780px]:max-h-4/5 md:flex mx-20">
                <!-- Close Button -->
                <button id="close-modal" class="absolute top-3 right-3 text-gray-500 hover:text-black text-3xl font-bold">
                  &times;
                </button>
                <!-- Modal Content -->
                  <div class="modal-content flex flex-col md:flex-row ">
                      <!-- Image Section -->
                      <div class="md:w-1/2 w-full relative max-[790px]:h-60">
                        <div class="group absolute right-3 bottom-3" id="full-view"> 
                          <div class="bg-[#e2e1d3]/70 rounded-lg px-2 py-2 cursor-pointer flex items-center gap-3"> 
                            <p class="group-hover:block hidden "> Full view </p>
                            <i class="fa-solid fa-expand text-xl"></i>
                          </div>
                        </div>
                        <img src="${data.image}" alt="Painting preview" class="w-full h-full  shadow object-cover object-center" />
                      </div>
                      
                      <!-- Text Section -->
                      <div class="md:w-1/2 w-full grid p-5 space-y-5">
                          <div class="text-center">
                              <h1 class="text-3xl font-semibold font-[Fraunces]">${data.title}</h1  >
                              <p class="text-gray-600 italic mt-0">${data.artist}</p>
                          </div>
                          <p class="text-slate-800 text-lg">${data.description}</p>
                          <ul class="text-sm text-gray-400 text-left pl">
                              <li>Made of: ${data.madeOf}</li>
                              <li>Dimensions: ${data.dimension}</li>
                              <li>Location: ${data.location}</li>
                          </ul>
                          <h2 class="font-[Fraunces] text-4xl font-bold text-[hsl(158,36%,37%)]">₱ ${data.price}</h2>
                          <div class="flex items-center gap-3"> 
                            <button  class="buy-btn p-3 w-full bg-[hsl(158,36%,37%)] hover:bg-red-600 text-white font-medium rounded-md transition duration-200">
                                PLACE ORDER
                            </button>
                          </div> 
                      </div>
                  </div>
              </div>
    `;
    modal.innerHTML = html
    const modalBox = document.querySelector('.body-modal');

    const success_message = document.querySelectorAll('.success-message')
    const dismiss_btn = document.querySelectorAll('.dismiss-btn')
    const buyBtn = document.querySelectorAll('.buy-btn')

    dismiss_btn.forEach(element => {
      element.addEventListener('click', () => {
        success_message.forEach(element => {
          
        element.classList.add('hidden')
        })
      })
    })

    buyBtn.forEach(element => {
      element.addEventListener('click', () => {
        modal.classList.toggle('hidden')
        success_message.forEach(element => {
          
        element.classList.toggle('hidden')
        })
      })
    })

    modal.addEventListener('click', (e) => {
    if (!modalBox.contains(e.target)) {
      modal.classList.add('hidden');
    }
  });

    
    const close_modal = document.getElementById("close-modal");
    close_modal.addEventListener('click', () => {
      modal.classList.toggle('hidden')
    })

    const view_image = document.getElementById('full-view')
    view_image.addEventListener('click', () => {
      window.open(data.image, '_blank');
    })
    
  }
}

if (window.location.pathname === '/cart.html') {

  


  async function cartItem() {
    let data = await getPaintings()
    let cartItem = localStorage.getItem("Cart")
    if (cartItem) {
      cartItem = JSON.parse(cartItem)
    } 

    let dataCart = [];
    for (let id of cartItem) {
      let item = data.find(element => element.id == id);
      if (item) dataCart.unshift(item); // adds to the front
    }

    const a = document.getElementById("cartItem")
    let html = "";
    dataCart.forEach(data => {
      html += `
          <div class="cart-item peer border-1 mx-4 sm:mx-10 sm:flex gap-5 max-w-full sm:max-w-3xl w-full" data-id="${data.id}" data-price="${data.price}">
            <div class="sm:w-1/3 max-sm:h-36 w-full aspect-square">
                <img class="h-full w-full object-cover object-center" src="${data.image}" alt="">
            </div>
            <div class="sm:w-2/3 py-5 max-sm:px-5">
                <div class="text-sm text-gray-500 mb-5 space-y-1.5  ">
                    <div class="flex items-center gap-2">
                        <label for="checkItem">
                            <input class="" type="checkbox" id="checkItem">
                        </label>
                        <h1 class="text-2xl text-slate-900 max-sm:text-lg"> ${data.title} </h1>
                    </div>
                    <p class="max-sm:text-xs">by: ${data.artist} </p>
                    <p class="max-sm:text-xs">Medium: ${data.madeOf} </p>
                    <p class="max-sm:text-xs">Size: ${data.dimension}</p>
                    <p class="max-sm:text-xs">From: ${data.location}</p>
                </div>
                <div class="flex justify-between items-center ">
                    <p class="text-4xl max-sm:text-2xl text-[hsl(158,36%,37%)]"> ${data.price} </p>
                    <i class="fa-solid fa-trash text-red-500 max-sm:mr-5 mr-20"></i>
                </div>
            </div>
          </div>
          `
    })
    
    a.innerHTML += html;
    let runningTotalPrice = 0;
    let selectedItemCount = 0;
    const total_price = document.getElementById("total-price")
    const total_item = document.getElementById("total-item")
    const cart = document.querySelectorAll('.cart-item')
    cart.forEach(element => {
        element.addEventListener('click', () => {
        const itemPrice = parseFloat(element.dataset.price);
    
        element.classList.toggle('border-4');
        const isSelected = element.classList.contains("border-4");

        if (isSelected) {
          runningTotalPrice += itemPrice;
          selectedItemCount++;
        } else {
          runningTotalPrice -= itemPrice;
          selectedItemCount--;
        }

        total_price.innerText = `$ ${runningTotalPrice.toFixed(0)}`; // or toFixed(2) if needed
        total_item.innerText = `${selectedItemCount} Items`;
      })
    }
    );

    const checkout = document.getElementById('checkout');
const success_message = document.querySelectorAll('.success-message'); // Assuming this is your modal container(s)
const dismiss_btn = document.querySelectorAll('.dismiss-btn'); // Assuming these buttons are inside the modal

checkout.addEventListener('click', () => {
    // 1. Show the success message modal
    let text = "Are you sure you want to purchase this? "
    if(confirm(text) === true) {
      success_message.forEach(element => {
          element.classList.remove('hidden'); // REMOVE 'hidden' to show the modal
      });

      // 2. Find and remove selected cart items from the DOM
      // Re-query specifically for selected items (those with border-4 class)
      const selectedItems = document.querySelectorAll('.cart-item.border-4');

      selectedItems.forEach(selectedItem => {
          selectedItem.remove(); // Remove the element from the HTML
      });

      // 3. Reset totals and update display
      runningTotalPrice = 0; // 
      selectedItemCount = 0; // 
      total_price.innerText = `$ 0`; 
      total_item.innerText = `0 Items`; 
    }
    

});

  dismiss_btn.forEach(button => {
    button.addEventListener('click', () => {
        success_message.forEach(modalElement => {
            modalElement.classList.add('hidden'); 
        });
    });
  });

  }

  

  cartItem()

 }


if (window.location.pathname === '/login.html') {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "index.html"; 
  }
  const user = document.getElementById('user-lbl')
  const pass = document.getElementById('pass-lbl')
  const login_form = document.getElementById('login-form')
  login_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if(data.user == "rosales" && data.password == "12345") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "./index.html"
    } else {
      user.classList.add('border-red-500', 'bg-red-200')    
      pass.classList.add('border-red-500', 'bg-red-200') 
    }
  })
}







