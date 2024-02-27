const btncompra = document.getElementById("btncompra");

const mp = new MercadoPago('APP_USR-962f8616-b5c9-4f28-91a1-bbb0c16c03ce', {
    location : "es-AR"
});


btncompra.addEventListener("click", async ()=>{

    try{
        const product = {
            title      : "VENTA",
            quantity   : 1,
            price : parseInt(document.getElementById("total").innerText.slice(1)),
        }
    
        let res = await fetch("http://localhost:3000/create_preferences", {
            method  : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body    : JSON.stringify(product)
        });
    
        const preferences = await res.json();
        
        CreateCheckoutButton(preferences.id); 

    }catch(error){
        console.log(error);
    }

});

const CreateCheckoutButton = (preference) => {

    const bricksBuilder = mp.bricks();

    const rendercomponent = async () =>{
        btncompra.remove();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preference,
            },
            customization: {
                texts: {
                    valueProp: 'smart_option'
                },
            },
        });
    }
 
    rendercomponent();
 
}