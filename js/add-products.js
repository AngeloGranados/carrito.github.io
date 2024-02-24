const btnaddproducts = document.getElementsByClassName("btn-agregar");
const productstorebody = document.getElementById("productstorebody");
const btncerrar = document.getElementsByClassName("btn-cerrar");

let allproducts = [];

Array.from(btnaddproducts).forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        let titleproduc = e.target.parentElement.querySelector("h3").innerText;
        let priceproduct = e.target.parentElement.querySelector("p").innerText;

        let product = {
            productcant : 1,
            titleproduct : titleproduc,
            priceproduct : priceproduct
        }

        if(allproducts.some(pro=>pro.titleproduct === titleproduc)){
            const newproduct = allproducts.map(product=>{
                if(product.titleproduct === titleproduc){
                    product.productcant++;

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

        subtotal = parseInt(product.priceproduct) * product.productcant;

        divproduct.innerHTML = `
            <div class='product-cant'>${product.productcant}</div>
            <p class='product-title'>${product.titleproduct}</p>
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
        allproducts = allproducts.filter(product => product.titleproduct !== e.target.parentElement.parentElement.querySelector("p").innerText);

        showhtml(allproducts);
    }
});

showhtml();








