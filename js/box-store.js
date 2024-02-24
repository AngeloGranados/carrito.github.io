const boxstore = document.getElementById("boxstore");
const boxproductstore = document.getElementById("boxproductstore");

boxstore.addEventListener("click", ()=>{
    boxproductstore.classList.toggle("active");
});