
const products = [
    {
        image: {
            thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
            mobile: "./assets/images/image-waffle-mobile.jpg",
            tablet: "./assets/images/image-waffle-tablet.jpg",
            desktop: "./assets/images/image-waffle-desktop.jpg"
        },
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
            mobile: "./assets/images/image-creme-brulee-mobile.jpg",
            tablet: "./assets/images/image-creme-brulee-tablet.jpg",
            desktop: "./assets/images/image-creme-brulee-desktop.jpg"
        },
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
            mobile: "./assets/images/image-macaron-mobile.jpg",
            tablet: "./assets/images/image-macaron-tablet.jpg",
            desktop: "./assets/images/image-macaron-desktop.jpg"
        },
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
            mobile: "./assets/images/image-tiramisu-mobile.jpg",
            tablet: "./assets/images/image-tiramisu-tablet.jpg",
            desktop: "./assets/images/image-tiramisu-desktop.jpg"
        },
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
            mobile: "./assets/images/image-baklava-mobile.jpg",
            tablet: "./assets/images/image-baklava-tablet.jpg",
            desktop: "./assets/images/image-baklava-desktop.jpg"
        },
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
            mobile: "./assets/images/image-meringue-mobile.jpg",
            tablet: "./assets/images/image-meringue-tablet.jpg",
            desktop: "./assets/images/image-meringue-desktop.jpg"
        },
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00
    },
    {
        image: {
            thumbnail: "./assets/images/image-cake-thumbnail.jpg",
            mobile: "./assets/images/image-cake-mobile.jpg",
            tablet: "./assets/images/image-cake-tablet.jpg",
            desktop: "./assets/images/image-cake-desktop.jpg"
        },
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
            mobile: "./assets/images/image-brownie-mobile.jpg",
            tablet: "./assets/images/image-brownie-tablet.jpg",
            desktop: "./assets/images/image-brownie-desktop.jpg"
        },
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.50
    },
    {
        image: {
            thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
            mobile: "./assets/images/image-panna-cotta-mobile.jpg",
            tablet: "./assets/images/image-panna-cotta-tablet.jpg",
            desktop: "./assets/images/image-panna-cotta-desktop.jpg"
        },
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("container-flex");
    let cart = [];

    function renderProducts() {
        const productContainer = document.createElement("div");
        productContainer.classList.add("container-menu");

        products.forEach(product => {
            const item = document.createElement("div");
            item.classList.add("item");

            // Criando o container da imagem e botão
            const imagemContainer = document.createElement("div");
            imagemContainer.classList.add("imagem");

            // Criando a tag <picture> para imagens responsivas
            const picture = document.createElement("picture");
                const sourceMobile = document.createElement("source");
                sourceMobile.media = "(max-width: 768px)";
                sourceMobile.srcset = product.image.mobile;

                const sourceTablet = document.createElement("source");
                sourceTablet.media = "(max-width: 992px)";
                sourceTablet.srcset = product.image.tablet;

                const img = document.createElement("img");
                img.src = product.image.desktop;
                img.alt = product.name;

            picture.appendChild(sourceMobile);
            picture.appendChild(sourceTablet);
            picture.appendChild(img);

            // Criando o botão "Add to Cart"
            const btnAdd = document.createElement("button");
            btnAdd.classList.add("btn_addCart");
            btnAdd.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart">Add to Cart`;

            // Evento de clique para adicionar ao carrinho
            btnAdd.addEventListener("click", () => {
                addToCart(product.name);
                updateCartUI();
            });

            imagemContainer.appendChild(picture);
            imagemContainer.appendChild(btnAdd);

            // Criando a descrição do produto
            const descriptionMenu = document.createElement("div");
            descriptionMenu.classList.add("description-menu");

            const category = document.createElement("p");
            category.classList.add("category-dessert");
            category.textContent = product.category;

            const name = document.createElement("p");
            name.classList.add("name-dessert");
            name.textContent = product.name;

            const price = document.createElement("span");
            price.classList.add("price-dessert");
            price.textContent = `$${product.price.toFixed(2)}`;

            descriptionMenu.appendChild(category);
            descriptionMenu.appendChild(name);
            descriptionMenu.appendChild(price);

            // Montando o item final
            item.appendChild(imagemContainer);
            item.appendChild(descriptionMenu);
            productContainer.appendChild(item);
        });

        main.appendChild(productContainer);
    }

    function addToCart(productName) {
        const product = products.find(p => p.name === productName);
        if (!product) return;

        const existingProduct = cart.find(p => p.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    }

    function updateCartUI() {
        let existingContainerCart = document.querySelector(".container-cart");
        
        if (existingContainerCart) {
            existingContainerCart.remove();
        }

        const containerCart = document.createElement("div");
        containerCart.classList.add("container-cart");
        main.appendChild(containerCart);

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const titleCart = document.createElement("h1");
        titleCart.classList.add("title-cart");
        titleCart.innerText = `Your Cart (${totalItems})`;
        containerCart.appendChild(titleCart);

        const orderListContainer = document.createElement("div");
        orderListContainer.classList.add("order-list");
        containerCart.appendChild(orderListContainer);

        cart.forEach(product => {
            const itemDessert = document.createElement("div");
            itemDessert.classList.add("dessert");

            const dessertInfo = document.createElement("div");
            dessertInfo.classList.add("dessert-info");

            const quantDessert = document.createElement("p");
            quantDessert.classList.add("quant-dessert");
            quantDessert.textContent = `${product.quantity}x`;

            const nameDessert = document.createElement("p");
            nameDessert.classList.add("name-dessert");
            nameDessert.textContent = product.name;

            const unitValue = document.createElement("p");
            unitValue.classList.add("unit-value");
            unitValue.textContent = `$${product.price.toFixed(2)}`;

            const totalValue = document.createElement("p");
            totalValue.classList.add("total-value");
            totalValue.textContent = `$${(product.price * product.quantity).toFixed(2)}`;

            dessertInfo.appendChild(quantDessert);
            dessertInfo.appendChild(nameDessert);
            dessertInfo.appendChild(unitValue);
            dessertInfo.appendChild(totalValue);

            itemDessert.appendChild(dessertInfo);
            orderListContainer.appendChild(itemDessert);
        });

        const orderTotalContainer = document.createElement("div");
        orderTotalContainer.classList.add("order-total");
        containerCart.appendChild(orderTotalContainer);

        const orderTotalLabel = document.createElement("p");
        orderTotalLabel.textContent = "Order Total";
        orderTotalContainer.appendChild(orderTotalLabel);

        const orderTotalValue = document.createElement("p");
        orderTotalValue.innerHTML = `<strong>$${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</strong>`;
        orderTotalContainer.appendChild(orderTotalValue);

        const confirmOrderContainer = document.createElement("div");
        confirmOrderContainer.classList.add("confirm-order");
        containerCart.appendChild(confirmOrderContainer);

        const confirmButton = document.createElement("button");
        confirmButton.id = "btn_confirmOrder";
        confirmButton.classList.add("btn_confirmOrder");
        confirmButton.textContent = "Confirm Order";
        confirmOrderContainer.appendChild(confirmButton);
    }

    renderProducts();
});
