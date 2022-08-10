import { resolveObjectURL } from "buffer";
import { Console } from "console";
import express, { application, response } from "express";
import { request } from "http";
import { activityCheckIn, 
        activityCheckOut, 
        deleteActivity, 
        listActivities } from "./controllers/activitiesController.js";
import { deleteVehicle, 
        insertVehicle, 
        listVehicles, 
        updateVehicle } from "./controllers/vehiclesController.js";
import { openDataBase } from "./controllers/database.js";
const app = express();

/*liberando uso da api no front*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");// dentro do '*' poderia ser qual site poderia fazer a requisiçao.
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    next();
});

app.use(express.json());

// Verificação simples da api
app.get('/api/ping', (request, response) => {
response.send({
    message: "pong"
})
});

//Endpoints Vehicles do projeto 

app.get('/api/vehicles', listVehicles);
app.post('/api/vehicles', insertVehicle);
app.put('/api/vehicles/:id',updateVehicle);
app.delete('/api/vehicles/:id', deleteVehicle);

//Endpoints activities do projeto 
app.post('/api/activities/checkin', activityCheckIn);
app.put('/api/activities/checkout',activityCheckOut);
app.delete('/api/activities/:id', deleteActivity);
app.get('/api/activities', listActivities);

// Subindo para o servidor e messagem de sucesso
app.listen(8080, () => {
    console.log("Servidor Rodando na porta 8080")
});