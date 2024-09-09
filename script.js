const catalogElement = document.getElementById("catalog");
const cartCounter = document.getElementById("cart-counter");
const cartController = document.getElementById("cart-trigger");
const checkoutElement = document.getElementById("checkout");
const closeCheckoutBtn = document.getElementById("close-checkout-btn");
const cartElement = document.getElementById("cart");
const voidElement = document.getElementById("void");

window.addEventListener("DOMContentLoaded", async () => {
    if (!localStorage.getItem("cartStorage")) {
        localStorage.setItem("cartStorage", "[]");
    }
    // ATUALIZA A QUANTIDADE DE ITEMS NO CARRINHO
    updateCartCounter();
    // VERIFICA O ESTADO DO CARRINHO: COM PRODUTOS OU VAZIO
    updateCart();
    // ATUALIZA O PAGAMENTO TOTAL DO PEDIDO
    updateCartTotal();
    renderSkeletons();

    try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setTimeout(() => {
            data.forEach((product) => {
                mount(product);
            });
        }, 2000)

    } catch (error) {

    }
})

cartController.addEventListener("click", () => {
    checkoutElement.classList.add("active");
})

closeCheckoutBtn.addEventListener("click", () => {
    checkoutElement.classList.remove("active")
})

const updateCartCounter = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
    // USA O MÉTODO LENGHT PARA ADICIONAR A QUANTIDADE DE PRODUTOS DO CARRINHO
    cartCounter.innerText = cartStorage.length;
}

const renderSkeletons = () => {
    for (let i = 0; i < 8; i++) {
        const skeletonElement = document.createElement("div");
        skeletonElement.classList.add("skeleton");
        catalogElement.appendChild(skeletonElement);
    }
}

const mount = (product) => {
    const catalogItem = document.createElement("div");
    catalogItem.classList.add("catalog-item");

    const contentItem = document.createElement("div");
    contentItem.classList.add("content-item");

    const photoItem = document.createElement("img");
    photoItem.src = product.photo;
    photoItem.alt = product.name;

    const rowTitlePrice = document.createElement("div");
    rowTitlePrice.classList.add("row-title-price");

    const titleItem = document.createElement("h2");
    titleItem.innerText = product.name;

    const priceItem = document.createElement("span");
    priceItem.innerText = `R$ ${parseFloat(product.price)}`;

    rowTitlePrice.appendChild(titleItem);
    rowTitlePrice.appendChild(priceItem);

    const aboutItem = document.createElement("p");
    aboutItem.innerText = product.description;

    contentItem.appendChild(photoItem);
    contentItem.appendChild(rowTitlePrice);
    contentItem.appendChild(aboutItem);

    const buyItemBar = document.createElement("div");
    buyItemBar.classList.add("buy-item-bar");
    buyItemBar.addEventListener("click", () => {
        updateCartStorage(product);
        updateCart();
        updateCartTotal();
    })

    const buyItemIcon = document.createElement("img");
    buyItemIcon.src = "assets/shopping-bag.svg";
    buyItemIcon.alt = "Sacola de compras";

    const buyItemSpan = document.createElement("span");
    buyItemSpan.innerText = "Comprar";

    buyItemBar.appendChild(buyItemIcon);
    buyItemBar.appendChild(buyItemSpan);

    catalogItem.appendChild(contentItem);
    catalogItem.appendChild(buyItemBar);

    update(catalogItem);
}

const update = (element) => {
    const hasSkeletons = document.querySelectorAll(".skeleton");
    if (hasSkeletons) {
        hasSkeletons.forEach((skeleton) => {
            skeleton.remove();
        })
    }

    catalogElement.appendChild(element);
}

const updateCartStorage = (product) => {
    const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
    const hasId = cartStorage.some((current => current.id == product.id))
    if (!hasId) {
        cartStorage.push(
            {
                id: product.id,
                name: product.name,
                photo: product.photo,
                price: product.price,
                qtd: 1
            }
        );
        localStorage.setItem("cartStorage", JSON.stringify(cartStorage));
        updateCartCounter();
    }
}

const updateCart = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
    if (cartStorage.length > 0) {
        voidElement.classList.add("hidden");
        cartElement.classList.remove("hidden");
        cartElement.innerHTML = "";

        cartStorage.forEach((cartItem) => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");

            const photoElement = document.createElement("img");
            photoElement.src = cartItem.photo;
            photoElement.alt = cartItem.name;

            const title = document.createElement("h2");
            title.innerText = cartItem.name;

            const buttonRemove = document.createElement("button");
            buttonRemove.classList.add("remove-cart-item");
            buttonRemove.title = "Excluir";
            buttonRemove.innerHTML = "<span>x</span>";
            buttonRemove.addEventListener("click", () => {
                const index = cartStorage.findIndex(product => product.id == cartItem.id);
                cartStorage.splice(index, 1);
                // REMOVE DO LOCALSTORAGE
                localStorage.setItem("cartStorage", JSON.stringify(cartStorage));
                // REMOVE DA DIV #CART SEM NECESSITAR DO RELOAD PARA VIZUALIZAR
                const cartItemElement = buttonRemove.closest(".cart-item");
                cartItemElement.remove();
                updateCartCounter();
                updateCartTotal();
                updateCart();
            })

            const rowUnitPrice = document.createElement("div");
            rowUnitPrice.classList.add("row-unit-price");

            const unitController = document.createElement("div");
            unitController.classList.add("unit-controller");

            const lessButton = document.createElement("button");
            lessButton.classList.add("less");
            lessButton.innerText = "-";
            lessButton.addEventListener("click", () => {
                if (cartItem.qtd > 1) {
                    cartItem.qtd -= 1;
                }
                localStorage.setItem("cartStorage", JSON.stringify(cartStorage));
                unitValue.innerText = cartItem.qtd;
                updateCartTotal();
            })

            const unitValue = document.createElement("span");
            unitValue.classList.add("unit");
            unitValue.innerText = cartItem.qtd;

            const moreButton = document.createElement("button");
            moreButton.classList.add("more");
            moreButton.innerText = "+";
            moreButton.addEventListener("click", () => {
                cartItem.qtd += 1;
                localStorage.setItem("cartStorage", JSON.stringify(cartStorage));
                unitValue.innerText = cartItem.qtd;
                updateCartTotal();
            })

            unitController.appendChild(lessButton);
            unitController.appendChild(unitValue);
            unitController.appendChild(moreButton);

            const priceElement = document.createElement("span");
            priceElement.classList.add("price");
            priceElement.innerText = `R$ ${parseInt(cartItem.price).toFixed(0)}`;

            rowUnitPrice.appendChild(unitController);
            rowUnitPrice.appendChild(priceElement);

            cartItemElement.appendChild(photoElement);
            cartItemElement.appendChild(buttonRemove);
            cartItemElement.appendChild(title);
            cartItemElement.appendChild(rowUnitPrice);

            cartElement.appendChild(cartItemElement);
        })
    }else{
        voidElement.classList.remove("hidden");
        cartElement.classList.add("hidden");
    }
}

const updateCartTotal = () => {
    const spanTotal = document.querySelector(".result");
    const cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
    let total = 0;
    cartStorage.forEach((product) => {
        total += product.qtd * (parseInt(product.price).toFixed(0));
    })
    spanTotal.innerText = `R$ ${total}`;
}
