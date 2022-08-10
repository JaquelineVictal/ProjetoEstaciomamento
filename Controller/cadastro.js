
import { service } from "../Service/index.js";
import { view } from "../View/index.js";



export const cadastroCompoment = () => {

    view.getCadastroHTML();

    /* Pehando as informações do formulario */

    const label = []
    
    service.getVehicle().then((dados) => {
        dados.forEach(element => {
            if (element.label != null) {
                label.push(element.label)
                
            }
        });
    });
   
    const formularioCadastro = document.getElementById('formularioCadastro')
    formularioCadastro.addEventListener('submit', function(event){
        event.preventDefault();

        const cadastroCliente = {
            "owner": document.getElementById('owner').value,
            "model": document.getElementById('model').value,
            "label": document.getElementById('label').value,
            "type": parseInt(document.getElementById('type').value),
            "observation": document.getElementById('observation').value
        };
        
        if (label.includes(cadastroCliente.label)) {
            return alert(`Essa placa: ${cadastroCliente.label} já está cadastrada.`)
        } else {
            formularioCadastro.reset()
            service.PostVehicle(cadastroCliente)
        }
       
    // console.log(cadastroCliente);
    });
}