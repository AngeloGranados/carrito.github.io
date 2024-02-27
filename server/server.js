import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4601217555622384-022714-e45485709db913d53139f5dc5f4aa41b-1703330054' });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("server");
});

app.post("/create_preferences", async (req,res)=>{
    console.log(req.body.allproducts);
    try{
        const body = {
            items : req.body.allproducts,
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