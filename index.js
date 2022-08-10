import { cadastroCompoment } from "./Controller/cadastro.js";
import { listaClienteCompoment } from "./Controller/listaCliente.js";
import { FaturamentoComponent } from "./Controller/faturamento.js";

const link = document.getElementById('link');

link.addEventListener('click', (event) => {

  const option = event.path[0].innerText

  switch(option)  {
    case "Cadastro":
        cadastroCompoment();
        break;
    case "Clientes":
        listaClienteCompoment();
        break;
    case "Checkin":{
      window.location.href = "./checkin.html "
      break;
      };
    case "Faturamento": {
      FaturamentoComponent();
      break;
    }
  }
})
