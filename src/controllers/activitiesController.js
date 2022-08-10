import { openDataBase } from "./database.js";

/* Função para a adicionar um check-in dos veiculos cadastrados */
export const activityCheckIn = async (request, response) => { 

    const { label } = request.body;
    const db = await openDataBase();
    // Verificando se o veiculo está cadastrado 
   
     const vehicle = await db.get(  // o .get retorna apenas um registro
        `SELECT * FROM vehicles WHERE label = ?    
        `,[label]);
    if (vehicle) {

        const checkinAT = (new Date()).getTime();
        const data = await db.run(`
        INSERT INTO activities (vehicle_id, checkin_at)    
        VALUES (?,?)
        `,[vehicle.id, checkinAT]);
        
        db.close;
        // retornando os dados inseridos 
        response.send({
            vehicle_id: vehicle.id,
            checkin_at: checkinAT,
            mensagem: `Veiculo [${vehicle.label}] entrou no estacionamento`
         });
         return;
    }
    db.close;
    response.status(400).send({
        mensagem: `Veiculo [${label}] não cadastrado`
    });
};

/* Função para a adicionar o check-out do veiculo cadastrado */
export const activityCheckOut = async (request, response) => { 

    const { label, price } = request.body;
    const db = await openDataBase();

    const vehicle = await db.get(  // o .get retorna apenas um registro
        `SELECT * FROM vehicles WHERE label = ?    
        `,[label]);
    
    if (vehicle) { 
    
        const activity = await db.get(  // o .get retorna apenas um registro
        `SELECT * FROM activities 
            WHERE  vehicle_id = ?
                AND checkout_at IS NULL    
        `,[vehicle.id]);

        if (activity) {

            const checkoutAT = (new Date()).getTime();
            const data = await db.run(`
            UPDATE activities 
                SET checkout_at = ?,
                    price = ?    
                WHERE id = ?
            `,[checkoutAT, price, activity.id]);
            
            db.close;
            // retornando os dados inseridos 
            response.send({
                vehicle_id: vehicle.id,
                checkout_at: checkoutAT,
                price: price,
                mensagem: `Veiculo [${vehicle.label}] saiu do estacionamento`
            });
            return;
        }; 
        
        db.close;
        response.status(400).send({
            mensagem: `Veiculo [${label}] não realizou nenhum check-in`
        });
        return;
    };
    db.close;
        response.status(400).send({
            mensagem: `Veiculo [${label}] não cadastrado`
        });
};

/* Função para a deletar uma atividade */
export const deleteActivity = async (request, response) => { 
    const { id } = request.params
    const db = await openDataBase();
    
    const data = await db.run(
        `DELETE FROM activities 
            WHERE id = ? 
        `,[id]);

    db.close;
    // retornando os dados inseridos 
    response.send({
        id,
        mensagem: `Atividade [${id}] removido com sucesso`
    });
};

/* Função para a listar as atividades */
export const listActivities = async (request, response) => { 

    const db = await openDataBase();

    const activities = await db.all(
        'SELECT * FROM activities'
        );

    db.close;
    response.send(activities)

};