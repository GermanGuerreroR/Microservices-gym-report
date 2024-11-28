import express from "express";
import { router } from "./infraestructure/api/index-routes";

const main = () => {
    const app = express()
    app.use(router);
    const PORT = process.env.PORT || 3002;

    app.get("/api", (req, res) => {
        res.send({ msg: "Welcome to Gym REPORT micro services 📚" });
    });


    app.listen(PORT, () => {
        console.log(`Microservices running at port ${PORT}`);
    })
};

main();