
const url = "http://localhost:8080/api";

//--------------------POST-----------------------------
const PostVehicle = (objectCliente) => {
    console.log(objectCliente)
    return fetch(url + "/vehicles",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectCliente)
    }).then((response) => {
        if(response.status != 200){
            console.log("Erro no servidor: ${response.status}")
        }
        else {
            alert('Sucesso ao salvar ${response.status}')
        }
    });
};

const postCheckin = (label) => {
    return fetch(url + "/activities/checkin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({label}) 
    }).then((response) => {
       if(response.status != 200){
           console.log(`Erro no servidor: ${response.status}`)
       }else {
           return response.json()
       }
    })
};

//----------------GET----------------------------

const getVehicle = ()  => {
    return fetch(url + "/vehicles").then((response) => {
        if(response.status != 200){
            console.log("Erro no servidor: ${response.status}")
        }
        else {
            return response.json()
        }
    });

};

const getActivities = () => {
    return fetch(url + "/activities")
    .then((response) => {
        if(response.status != 200){
            console.log(`Erro no servidor: ${response.status}`)
        }else {
              return response.json()
        }
     })
};
//--------------------- PUT-----------------------------------

const putVehicle = (objectCliente,id) => {
    console.log(objectCliente)
    return fetch(`${url}/vehicles/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectCliente)
    }).then((response) => {
        if(response.status != 200){
            console.log("Erro no servidor: ${response.status}")
        }
        else {
            
            return response.json()
        }
    });
};

const putCheckout = (objeto) => {
    return fetch(url + "/activities/checkout", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto) 
    }).then((response) => {
       if(response.status != 200){
           console.log(`Erro no servidor: ${response.status}`)
       }else {
           return response.json()
       }
    })
};

//-----------------------------DELETE-----------------------

const deleteVehicle =  (id) => {
    return fetch(`${url}/vehicles/${id}`,{
        method: "DELETE"
    }).then((response) => {
        if(response.status != 200){
            console.log("Erro no servidor: ${response.status}")
        }
        else {
            return response.json()
        }
    });
};  


export const service = {
    PostVehicle,
    getVehicle,
    putVehicle,
    deleteVehicle,
    getActivities,
    postCheckin,
    putCheckout
}