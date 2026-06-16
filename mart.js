let discount = 0;
let totalRevenue = 0;
let totalOrders = 0;
let totalProducts =
document.querySelectorAll(".card").length;

window.onload = function(){

    let productCounter =
    document.getElementById("productCount");

    if(productCounter){
        productCounter.innerHTML =
        totalProducts;
    }

    loadPayments();

    addNotification(
    "🌾 Kisan Mart System Started"
    );
};

// NOTIFICATIONS
function addNotification(msg){

    const container =
    document.getElementById("notifications");

    if(!container) return;

    let div =
    document.createElement("div");

    div.className = "notice";

    div.innerHTML =
    new Date().toLocaleTimeString() +
    " - " + msg;

    container.prepend(div);
}

// ADD PRODUCT
function addProduct(){

    let farmer =
    document.getElementById("farmerName").value;

    let product =
    document.getElementById("productTitle").value;

    let price =
    document.getElementById("price").value;

    if(
        farmer === "" ||
        product === "" ||
        price === ""
    ){
        alert("Please fill all fields");
        return;
    }

    totalProducts++;

    document.getElementById(
    "productCount"
    ).innerHTML =
    totalProducts;

    let container =
    document.querySelector(
    ".products"
    );

    let card =
    document.createElement("div");

    card.className =
    "card";

    card.innerHTML = `
    <img src="https://via.placeholder.com/300x180?text=${product}">
    <h3>${product}</h3>
    <p>Farmer : ${farmer}</p>
    <div class="price">
    ₹${price}/KG
    </div>
    <button onclick="selectProduct('${product}')">
    Buy Now
    </button>
    `;

    container.appendChild(card);

    document.getElementById(
    "status"
    ).innerHTML =
    "✅ Product Added Successfully";

    addNotification(
    product + " added successfully"
    );

    document.getElementById(
    "farmerName"
    ).value = "";

    document.getElementById(
    "productTitle"
    ).value = "";

    document.getElementById(
    "price"
    ).value = "";
}

// SELECT PRODUCT
function selectProduct(name){

    let selected =
    document.getElementById(
    "selectedProduct"
    );

    if(selected){
        selected.innerHTML =
        name;
    }
}

// PLACE ORDER
function placeOrder(){

    let product =
    document.getElementById(
    "product"
    ).value;

    alert(
    "🌾 Order placed for " +
    product
    );

    totalOrders++;

    let counter =
    document.getElementById(
    "orderCount"
    );

    if(counter){
        counter.innerHTML =
        totalOrders;
    }

    addNotification(
    product + " ordered"
    );
}

// COUPON
function applyCoupon(){

    let coupon =
    document.getElementById(
    "coupon"
    );

    if(!coupon) return;

    let code =
    coupon.value;

    if(code === "AGRI10"){

        discount = 10;

        alert(
        "10% Discount Applied"
        );
    }

    else if(code === "AGRI20"){

        discount = 20;

        alert(
        "20% Discount Applied"
        );
    }

    else{

        alert(
        "Invalid Coupon"
        );
    }
}

// DELIVERY TRACKING
function startDelivery(){

    let progress = 0;

    let interval =
    setInterval(function(){

        progress += 10;

        let bar =
        document.getElementById(
        "progressBar"
        );

        if(bar){
            bar.value =
            progress;
        }

        if(progress >= 100){

            clearInterval(
            interval
            );

            addNotification(
            "Delivery Completed"
            );
        }

    },500);
}

function completeDelivery(){

    let bar =
    document.getElementById(
    "progressBar"
    );

    if(bar){
        bar.value = 100;
    }

    alert(
    "🚚 Order Delivered Successfully"
    );
}

// PAYMENT SYSTEM
let paymentRecords = [];

function processPayment(
product,
amount,
method
){

    let payment = {

        id:
        "TXN" +
        Date.now(),

        product:
        product,

        amount:
        amount,

        method:
        method,

        status:
        "Success",

        date:
        new Date()
        .toLocaleString()
    };

    paymentRecords.push(
    payment
    );

    savePayments();

    updatePaymentHistory();
}

function savePayments(){

    localStorage.setItem(
    "payments",
    JSON.stringify(
    paymentRecords
    )
    );
}

function loadPayments(){

    let data =
    localStorage.getItem(
    "payments"
    );

    if(data){

        paymentRecords =
        JSON.parse(data);

        updatePaymentHistory();
    }
}

function updatePaymentHistory(){

    let history =
    document.getElementById(
    "paymentHistory"
    );

    if(!history) return;

    history.innerHTML = "";

    paymentRecords
    .slice()
    .reverse()
    .forEach(function(payment){

        history.innerHTML += `
        <div class="card">
        <p>
        <b>${payment.id}</b>
        </p>
        <p>
        ${payment.product}
        </p>
        <p>
        ₹${payment.amount}
        </p>
        <p>
        ${payment.method}
        </p>
        </div>
        `;
    });
}

// REVIEW SYSTEM
function submitReview(){

    let name =
    document.getElementById(
    "reviewName"
    );

    let rating =
    document.getElementById(
    "reviewRating"
    );

    let review =
    document.getElementById(
    "reviewText"
    );

    if(
        !name ||
        !rating ||
        !review
    ) return;

    let box =
    document.getElementById(
    "reviews"
    );

    if(!box) return;

    box.innerHTML += `
    <div class="card">
    <h4>${name.value}</h4>
    <p>⭐ ${rating.value}</p>
    <p>${review.value}</p>
    </div>
    `;

    addNotification(
    "New Review Added"
    );

    alert(
    "Review Submitted"
    );
}

// CONTACT FORM
function sendMessage(){

    let name =
    document.getElementById(
    "contactName"
    );

    if(
        !name ||
        name.value === ""
    ){

        alert(
        "Enter Name"
        );

        return;
    }

    alert(
    "Message Sent Successfully"
    );

    addNotification(
    "New Contact Message"
    );
}