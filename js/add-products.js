const btnaddproducts = document.getElementsByClassName("btn-agregar");
const productstorebody = document.getElementById("productstorebody");
const btncerrar = document.getElementsByClassName("btn-cerrar");

let allproducts = [];

Array.from(btnaddproducts).forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        let title = e.target.parentElement.querySelector("h3").innerText;
        let unit_price = e.target.parentElement.querySelector("p").innerText;

        let product = {
            title : title,
            quantity : 1,
            unit_price : parseInt(unit_price),
            currency_price : "ARS"
        }

        if(allproducts.some(pro=>pro.title === title)){
            const newproduct = allproducts.map(product=>{
                if(product.title === title){
                    product.quantity++;

                    return product;
                }else{
                    return product;
                }
            });

            allproducts = [...newproduct];
        }else{
            allproducts = [...allproducts, product];     
        } 

        showhtml(allproducts);
        boxproductstore.classList.add("active");
  
    }
    
});

const showhtml = (allproducts = []) => {
    total = 0;
    subtotal = 0;

    let cantproductsstore = document.getElementById("cantproductsstore");
    cantproductsstore.innerHTML = allproducts.length;

    productstorebody.innerHTML = '';

    if(!allproducts.length){
        productstorebody.innerHTML = `
            <span>aun no se agrega un producto</span>
            `;
    }

    allproducts.map((product)=>{
        let divproduct = document.createElement("div");
        divproduct.className = "product";

        subtotal = parseInt(product.unit_price) * product.quantity;

        divproduct.innerHTML = `
            <div class='product-cant'>${product.quantity}</div>
            <p class='product-title'>${product.title}</p>
            <div class='product-price'>$${subtotal}</div>
            <button class="btn-cerrar"><i class="fa-solid fa-x"></i></button>
            `;

            total = total + subtotal;

        productstorebody.appendChild(divproduct);
    });

    const texttotal = document.getElementById("total");
    texttotal.innerHTML = `$${total}`;

}

productstorebody.addEventListener("click", (e)=>{

    if(e.target.parentElement.classList.contains("btn-cerrar")){
        allproducts = allproducts.filter(product => product.title !== e.target.parentElement.parentElement.querySelector("p").innerText);

        showhtml(allproducts);
    }
});

showhtml();








