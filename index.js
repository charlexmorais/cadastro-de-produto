// *
// 1 - Validar se todos os campos do formulário estão preenchidos
// 4 - Criar um objeto produto com as propriedades descritas no form
// 5 - Ao clicar no cadastrar, preencher uma posição no array com o objeto produto
//  e exibir uma mensagem de produto cadastrado com sucesso
// 6 - Limpar o formulário após a inserção do dado no array
// 7 - Ao clicar no concluir cadastramento, escoder o form e exibir a lista
// 8 - Percorrer o array e injetar todos os registros no HTML

// Atividade secundária
// 1 - Limitar quantidade de caracteres do nome e descrição (maxlength)  ok
// 2 - Realmente quer concluir o cadastramento
// 3 - Validar se o código digitado já existe
// */

/* Identificar os elementos no html através do ID */
let inputCode = document.getElementById("product-code");
let inputNameproduct = document.getElementById("productname");
let inputdescription = document.getElementById("description-product");
let inputPrice = document.getElementById("price");
let buttonSave = document.getElementById("button-save");
let buttonFinish = document.getElementById("button-finish");
let buttonBack = document.getElementById("button-back");
let buttonDelete = document.getElementById("button-delete");
let sectionForm = document.getElementById("product-registration");
let tableList = document.getElementById("product-list tbody");
let sectionListproducts = document.getElementById("product-listing");
let fistSection = document.getElementById("primeira-section");
let firstFooter = document.getElementById("footer");
let alertSucess = document.getElementById("alert-success");
//objeto
let product = {
  code: 0,
  name: "",
  description: "",
  price: 0,
};

// lista de armazenamento de produtos array
let listaProducts = [];

function saveProduct() {
  // produto entre chaves , spread operator
  let createProduct = { ...product };
  createProduct.code = inputCode.value;
  createProduct.name = inputNameproduct.value;
  createProduct.description = inputdescription.value;
  createProduct.price = inputPrice.value;

  listaProducts.push(createProduct);
  console.log(listaProducts);
}

// limpando formulario
function clearForm() {
  inputCode.value = "";
  inputNameproduct.value = "";
  inputdescription.value = "";
  inputPrice.value = "";
}

/* Verificando se todos os campos do form estão preenchidos */
function checkCode(code) {
  // Suponha que o array products contém todos os produtos salvos
  const foundProduct = listaProducts.find((product) => product.code === code);
  if (foundProduct) {
    throw new Error("Já existe um produto com esse código.");
  }
}

function validarFormulario() {
  if (
    inputCode.value === "" ||
    inputCode.value.length > 4 ||
    inputNameproduct.value === "" ||
    inputdescription.value === "" ||
    inputPrice.value === ""
  ) {
    mensagem("erro", "Por favor, preencha todos os campos.");
    clearForm(); // limpa formulario
  } else {
    try {
      checkCode(inputCode.value); // checa se o codigo do produto repetiu 
      saveProduct();
      mensagem("sucesso", "Salvo com sucesso");
      clearForm();
    } catch (error) {
      mensagem("erro", error.message);
      clearForm();
    }
  }
}

// funcoes alerta de mensagens

function mensagem(tipo, mensagem) {
  // argumentos tipo e mensagem
  const alertaMensagem = document.createElement("div");
  alertaMensagem.textContent = mensagem;
  alertaMensagem.classList.add(tipo); // argumento tipo
  document.body.appendChild(alertaMensagem); // adiciona elemento na pagina
  setTimeout(function () {
    // adicionado tempo e removendo
    alertaMensagem.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(alertaMensagem);
    }, 2000);
  }, 1000);
}

// validando codigo do produto
function validateCode() {
  let checkCode = false;
  let productCode = document.getElementById("product-code").value;

  if (listaProducts.length === 0) {
    mensagem("sucesso", "Produto salvo com sucesso.");

    fistSection.setAttribute("hidden", "");
    firstFooter.setAttribute("hidden", "");
    alert("clique em concluir ou adicione mais produtos!");
  } else {
    for (let i = 0; i < listaProducts.length; i++) {
      if (listaProducts[i].code == productCode) {
        checkCode = true;

        break;
      }
    }

    if (checkCode) {
      mensagem("erro", "O código digitado é igual a um código anterior.");

      if (confirm("Deseja continuar? Não")) {
        mensagem("sucesso", "Produto salvo com sucesso.");
      } else {
        location.reload(); // atualizando a pagina
      }
    }
  }
}

function completeRegistration() {
  if (listaProducts.length === 0) {
    clearForm();
    mensagem("erro", " Voce nao possui produtos na sua lista");
  } else {
    const confirmed = confirm("Realmente quer concluir o cadastramento?");
    if (confirmed) {
      finalizeRegistration();
    } else {
      removeLastItem();
      // funcao que remove ultimo item da lista de produtos
    }
  }
}

// finaliazndo cadastro  e exibindo lista de produtos
function finalizeRegistration() {
  tableList.innerHTML = "";
  let isFirstProduct = true;
  for (let product of listaProducts) {
    tableList.innerHTML += `
      ${
        isFirstProduct
          ? "<tr><th>Código</th><th>Produto</th><th>Descrição</th><th>Preço</th></tr>"
          : ""
      }
      <tr>
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
      </tr>
    `;
    isFirstProduct = false;
  }

  tableListproducts();
  buttonDelete.disabled = listaProducts.length === 0;
}

// formatando moeda

inputPrice.addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");
  valor = (valor / 100)
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  this.value = `R$ ${valor}`;
});

function removeLastItem() {
  listaProducts.pop(); // removendo o ultimo item do array
  console.log(listaProducts);
}

function tableListproducts() {
  sectionForm.style.display = "none"; //ocultar o form
  sectionListproducts.style.display = "block"; //mostrando a lista
}

function formFields() {
  sectionForm.style.display = "block"; //mostrando o form
  sectionListproducts.style.display = "none"; //ocultando  a lista
}
function deleteList() {
  sectionListproducts.remove(); //removendo lista de produtos
  // location.reload(); // voltando ao formulario
  mensagem("sucesso", "A sua lista foi excluida");
  formFields();
}
// botoes de eventos
buttonSave.onclick = () => {
  validarFormulario();
};

buttonFinish.onclick = () => {
  clearForm();
  completeRegistration(); // concluindo cadastro
  finalizeRegistration();
};
buttonBack.onclick = () => {
  formFields(); // mostrando formulario
};
buttonDelete.onclick = () => {
  deleteList(); //  deletando produtos e voltando ao formulario
  location.reload(); // voltando ao formulario
};
