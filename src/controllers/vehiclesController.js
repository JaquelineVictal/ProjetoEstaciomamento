import { openDataBase } from "./database.js";



/* Função para a listar os veiculos cadastrados */
export const listVehicles = async (request, response) => {

    const db = await openDataBase();

    const vehicles = await db.all(
        'SELECT * FROM vehicles'
        );

    db.close;
    response.send(vehicles)
};

/* Função para cadastra veiculos */

export const insertVehicle = async (request, response) => { 

    const { model, label, type, owner, observation } = request.body
    const db = await openDataBase();

    // o .run executa o comando quando não é esperado nenhum dado de retono, 
    // mostrando apenas o que foi alterado
    const data = await db.run(
        `INSERT INTO vehicles (model, label, type, owner, observation)
         VALUES(?,?,?,?,?)   
        `,[model, label, type, owner, observation]);

    db.close;
    // retornando os dados inseridos 
    response.send({
        id: data.lastID,
        model, 
        label, 
        type, 
        owner, 
        observation
    })
};

/* Função atualizar dados de veiculos  cadastrados */

export const updateVehicle =  async (request, response) => { 
    
    const { id } = request.params;
    const { model, label, type, owner, observation } = request.body;
    const db = await openDataBase();

    // Verificando se o dado existe no banco de dados
     const vehicle = await db.get(  // o .get retorna apenas um registro
        `SELECT * FROM vehicles WHERE id = ?    
        `,[id]);
     if (vehicle) {

        const data = await db.run(
            `UPDATE vehicles 
                SET model = ?, 
                    label = ?, 
                    type = ?, 
                    owner = ?, 
                    observation = ?
                WHERE id = ?     
            `,[model, label, type, owner, observation,id]);
    
        db.close;
        // retornando os dados atualizados 
        response.send({
            id,
            model, 
            label, 
            type, 
            owner, 
            observation
        });
    };
    return;
    db.close;
    response.send(vehicle || {} );
};

/* Função deletar veiculos  cadastrados */

export const deleteVehicle = async (request, response) => { 
    const { id } = request.params
    const db = await openDataBase();
    
    const data = await db.run(
        `DELETE FROM vehicles 
            WHERE id = ? 
        `,[id]);

    db.close;
    // retornando os dados inseridos 
    response.send({
        id,
        mensagem: `Veiculo [${id}] removido com sucesso`
    });
};
