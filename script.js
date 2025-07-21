const addItemForm = document.getElementById('addItemForm');
const addArray = JSON.parse(localStorage.getItem("newObj")) || [];

// Render initial product list
addArray.forEach(product => renderProductCard(product));

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productUrl = document.getElementById('productUrl').value;
    const category = document.getElementById('category').value;

    let id = Date.now(); // More reliable unique ID

    const obj = {
        id,
        productName,
        productPrice,
        productUrl,
        category
    };

    addArray.push(obj);
    localStorage.setItem("newObj", JSON.stringify(addArray));

    renderProductCard(obj);
    addItemForm.reset();
});

function renderProductCard(product) {
    const { id, productName, productPrice, productUrl, category } = product;

    const clutter = `
        <div class="card border-0 shadow mx-auto mt-5" style="width: 18rem;" id="product-${id}">
            <img src="${productUrl}" class="card-img-top" alt="Image Not Available" style="height: 200px;">
            <div class="card-body">
                <h4>Name: ${productName}</h4>
                <h4 class="card-title">Category: ${category}</h4>
                <h4 class="card-text">Price: ₹${productPrice}</h4>
                <button class="btn btn-primary" onclick="addToCart(${id})">Add to Cart</button>
                <button class="btn btn-danger" onclick="deleteItem(${id})">Delete Product</button>
            </div>
        </div>
    `;

    document.querySelector("#cardContainer").innerHTML += clutter;
}

function addToCart(id) {
    const singleProduct = addArray.find(product => product.id === id);
    let cartArray = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = cartArray.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.count += 1;
        alert("Product quantity increased in cart");
    } else {
        cartArray.push({ ...singleProduct, count: 1 });
        alert("Product added to cart");
    }

    localStorage.setItem("cartList", JSON.stringify(cartArray));
    document.querySelector("#cartCounter").innerHTML = cartArray.length;
}

function deleteItem(id) {
    // Remove from product list
    const updatedProductList = addArray.filter(product => product.id !== id);
    localStorage.setItem("newObj", JSON.stringify(updatedProductList));

    // Remove product card from DOM
    const card = document.getElementById(`product-${id}`);
    if (card) card.remove();
}
