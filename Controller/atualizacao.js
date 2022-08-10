import { service } from "../Service/index.js"
import { view } from "../View/index.js"
import { listaClienteCompoment } from "./listaCliente.js";

export const atualizacaoCompoment = (id) => {

    const label = []
    service.getVehicle().then((dados) => {
        dados.forEach(element => {
            if (element.label != null) {
                label.push(element.label)
            }
        });
    });


        view.getAtualizacaoCadastroHTML()
        service.getVehicle().then((dados) => {
            dados.forEach(element => {
                if(element.id == id){
                    AdicionaParametroNoInput(element);
                }
                
            });
        })        
        /* atualizando as informações com os dados do formulario formulario */
        const formularioAtualizacao = document.getElementById('formularioAtualizacao')
        formularioAtualizacao.addEventListener('submit', function(event){
            event.preventDefault();
    
            const atualizacaoCliente = {
                "owner": document.getElementById('owner').value,
                "model": document.getElementById('model').value,
                "label": document.getElementById('label').value,
                "type": parseInt(document.getElementById('type').value),
                "observation": document.getElementById('observation').value
            }
            /*if (label.includes(atualizacaoCliente.label)) {
                return alert(`Essa placa: ${atualizacaoCliente.label} já está cadastrada.`)
            } else {}*/
                service.putVehicle(atualizacaoCliente,id).then(() => {
                    cancelar();
                    listaClienteCompoment();
                })
            
        })
    }

const AdicionaParametroNoInput = (objeto) => {
    
       document.getElementById('owner').value = objeto.owner
       document.getElementById('model').value = objeto.model
       document.getElementById('label').value = objeto.label
       document.getElementById('type').value =  objeto.type
       document.getElementById('observation').value = objeto.observation
}


const cancelar = () => {
    const formularioAtualizacao = document.getElementById('formularioAtualizacao')
    formularioAtualizacao.reset();
}
