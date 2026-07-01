  const minRange = document.getElementById("minRange");
        const maxRange = document.getElementById("maxRange");
        const minValue = document.getElementById("minValue");
        const maxValue = document.getElementById("maxValue");
        const rangeTrack = document.getElementById("rangeTrack");
        const minGap = 10;

        function updateRange(event) {
            let min = parseInt(minRange.value);
            let max = parseInt(maxRange.value);

            // Ensure min & max have a gap of at least `minGap`
            if (max - min < minGap) {
                if (event.target === minRange) {
                    minRange.value = max - minGap;
                } else {
                    maxRange.value = min + minGap;
                }
            }

            minValue.innerText = minRange.value;
            maxValue.innerText = maxRange.value;

            let minPercent = (minRange.value / 3000) * 100;
            let maxPercent = (maxRange.value / 3000) * 100;
            rangeTrack.style.left = minPercent + "%";
            rangeTrack.style.right = 100 - maxPercent + "%";
        }

        // Event listeners for input changes
        minRange.addEventListener("input", updateRange);
        maxRange.addEventListener("input", updateRange);

        updateRange();

// rest of the code  

    const cardContainer = document.getElementById("cardContainer");
    let products = []; // Make products global

    async function fetchProducts() {
        try {
            const response = await fetch("./js/products.json");
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };  

    function renderProducts(products) {
       

        cardContainer.innerHTML = "";

        const productCards = products.map(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("mt-[20px]", "mx-[10px]", "bg-white", "rounded-3xl", "w-64", "shadow-lg", "overflow-hidden");

            productCard.innerHTML = `
                <div class="relative bg-[#EBF2EB] flex justify-center items-center h-48">
                    <span class="absolute top-3 left-3 bg-[#3a7d44] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        ${product.discount} off
                    </span>

                    <button class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                        <i class="fa-regular fa-heart text-gray-400 text-sm"></i>
                    </button>

                    <div class="text-8xl select-none"><img class="w-64 h-48" src="${product.image}" alt="${product.name}"></div>
                </div>

                <div class="p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-[#3a7d44] border border-[#3a7d44] rounded-full px-3 py-0.5 font-medium">
                            ${product.category}
                        </span>
                        <i class="fa-solid fa-circle-info text-gray-300 text-base"></i>
                    </div>

                    <div class="flex items-center gap-2 mb-1">
                        <h2 class="font-bold text-gray-800 text-lg leading-tight">${product.name}</h2>
                        <span class="text-gray-400 text-sm">|</span>
                        <span class="text-gray-400 text-sm">300 Kcal</span>
                    </div>

                    <div class="flex items-center gap-1 mb-3">
                        <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
                        <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
                        <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
                        <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
                        <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
                        <span class="text-gray-500 text-sm ml-1">5.0</span>
                    </div>

                    <div class="flex items-baseline gap-2 mb-4">
                        <span class="text-gray-800 font-bold text-xl">$${product.price.toFixed(2)}</span>
                        <span class="text-gray-400 text-sm line-through">$${product.originalPrice.toFixed(2)}</span>
                    </div>

                    <button onclick="addtocart(${product.id}),toggleSidebar()" class="w-full bg-[#EBF2EB] hover:bg-[#c8e6c9] text-[#3a7d44] font-semibold py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors duration-200" id="addToCartButton${product.id}">
                        Add to cart
                        <i class="fa-solid fa-bag-shopping text-base"></i>
                    </button>
                </div>`;



            return productCard;
        });

        cardContainer.append(...productCards);
    }
let count=0;
let total = 0;
const items = document.getElementById("items");
function addtocart(id) {
    const button = document.getElementById("addToCartButton" + id);
 
    
       products.forEach(product => {
        if (product.id === id) {
            count++;
            items.textContent = count;
            const cartItemsContainer = document.getElementById("cart-items");
            const cartItem = document.createElement("div");
            cartItem.classList.add("flex", "gap-[15px]", "py-[15px]",  );
            cartItem.innerHTML = `
                <div class="w-20 h-20 bg-[#f0ebe5]  flex items-center justify-center">
                            <img class="w-20 h-20  rounded-xl" src="${product.image}" alt="">
                        </div>
                        <div class="flex-1">
                            <h3 class="text-sm font-medium mb-[5px] text-black">${product.name}</h3>
                            <p class="text-sm text-black mb-[10px]">$${product.price}</p>
                            <div class="flex items-center gap-[10px]">
                                <button class=" minus-btn w-6 h-6 border-none bg-[#f0ebe5] cursor-pointer rounded text-base flex items-center justify-center">-</button>
                                <div class=" quantity  text-sm min-w-[20px] text-center text-black">1</div>
                                <button class="plus-btn w-6 h-6 border-none bg-[#f0ebe5] cursor-pointer rounded text-base flex items-center justify-center">+</button>
                            </div>
                        </div>
                        <button class="remove-btn bg-transparent border-none text-red-500 cursor-pointer text-[2rem] p-[5px]" id="${product.id}remove">&times;</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            button.disabled = true;
            button.innerHTML = "Added";
             const plusBtn = cartItem.querySelector(".plus-btn");
    const minusBtn = cartItem.querySelector(".minus-btn");
    const removeBtn = cartItem.querySelector(".remove-btn");
    const quantity = cartItem.querySelector(".quantity");
    
    let qty = 1;
  
  const totalPrice = document.getElementById("totalprice");
    total += product.price;
    totalPrice.textContent ="$"+total.toFixed(2);
   
    plusBtn.addEventListener("click", () => {
        qty++;
        quantity.textContent = qty;
         total += product.price;
         totalPrice.textContent = "$"+total.toFixed(2);
    });

    minusBtn.addEventListener("click", () => {
        if (qty > 1) {
            qty--;
            quantity.textContent = qty;
              total -= product.price;
             totalPrice.textContent = "$"+total.toFixed(2);
        }
    }); 
      removeBtn.addEventListener("click", () => {
         
   
        cartItem.remove();
        button.disabled = false;
         button.innerHTML = ` Add to cart
                        <i class="fa-solid fa-bag-shopping text-base"></i>`
        count--;
        items.textContent = count;
        total -= qty * product.price;
        totalPrice.textContent = "$"+total.toFixed(2);
    });
        }
    });
   
}

const sidebar = document.getElementById("sidebar");

function toggleSidebar(){
    sidebar.classList.add("open");
}



function remove(){
    sidebar.classList.remove("open");
}

    fetchProducts();