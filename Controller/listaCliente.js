import { service } from "../Service/index.js";
import { view } from "../View/index.js";
import { atualizacaoCompoment } from "./atualizacao.js";
import { cadastroCompoment } from "./cadastro.js";


export const listaClienteCompoment = () => {

    view.getListaClienteHTML();
    service.getVehicle().then((dados) => {
        dados.forEach((element) => {
            if(element.owner != null && element.label != null){
                createdNewLine(element.owner,element.model,element.label,element.type,element.observation,element.id)
            }        
        });
     })

    const tableListVehicle = document.getElementById('tbody');
    tableListVehicle.addEventListener('click', (event) =>{
        const button= event.path[0].innerText
        const id =  event.path[0].id
        
        if(button == 'Editar'){
            atualizacaoCompoment(id)
        }
        if(button == 'Excluir'){
            deletarCliente(id)
        }
        if(button == 'Novo'){
            cadastroCompoment();
        }
    })
};

const createdNewLine = (owner, model, label, type, observation,id) => {
    const tableListVehicle = document.getElementById('tbody');
    const NewLine = document.createElement('tr');

    const dadosHTML = `
        <td class="nome">${owner}</td>
        <td>${model}</td>
        <td>${label}</td>
        <td class="nome">${type}</td>
        <td class="nome">${observation}</td>
        <td>
        <div class="lista-cliente__container__button">
            <a id="${id}" class="lista-cliente__table__button">Editar</a>
            <a id="${id}" class="lista-cliente__table__button">Excluir</a>
        </div>
    </td>
    `      
    NewLine.innerHTML = dadosHTML
    return tableListVehicle.appendChild(NewLine)

}

const deletarCliente = (id) => {
    service.deleteVehicle(id).then(()=>{
        listaClienteCompoment();
    })

}