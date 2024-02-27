import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("server");
});

app.post("/create_preferences", async (req,res)=>{
    try{
        const body = {
            items : [{
                    title : req.body.title,
                    quantity : Number(req.body.quantity),
                    unit_price : Number(req.body.price),
                    currency_price : "ARS"
                },
            ],
            back_urls : {
                success : "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=2782s",
                failure : "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=2782s",
                pending : "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=2782s",
            },
            auto_retun : 'approved'
        };

        const preference = new Preference(client);

        const result = await preference.create({body});
        res.json({
            id : result.id,
        });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            error : "error preferences"
        });
    }
});

app.listen(port, ()=>{
    console.log("El server esta corriendo");
});