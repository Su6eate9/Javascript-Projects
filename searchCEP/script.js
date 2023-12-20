const submitButton = document.querySelector("#app form button");
const zipCodeField = document.querySelector("#app form input");
const main = document.querySelector("#app main");

const renderAddress = (data) => {
  const logradouro = document.createElement("p");
  const complemento = document.createElement("p");
  const bairro = document.createElement("p");
  const localidade = document.createElement("p");

  logradouro.innerText = `Logradouro: ${data.logradouro}`;
  complemento.innerText =
    data.complemento != ""
      ? `Complemento: ${data.complemento.replace("(", "").replace(")", "")}`
      : null;
  bairro.innerText = `Bairro: ${data.bairro}`;
  localidade.innerText = `Cidade: ${data.localidade}/${data.uf}`;

  main.appendChild(logradouro);
  main.appendChild(complemento);
  main.appendChild(bairro);
  main.appendChild(localidade);
};

const renderError = (text) => {
  const error = document.createElement("p");
  error.innerText = text;
  main.appendChild(error);
};

const run = (event) => {
  event.preventDefault();

  let zipCode = zipCodeField.value;

  zipCode = zipCode.replace(" ", "");
  zipCode = zipCode.replace(".", "");
  zipCode = zipCode.trim();

  axios
    .get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then((response) => {
      const data = response.data;

      main.innerHTML = "";

      if (data.erro) throw new Error("Cep inválido.");

      renderAddress(data);
    })
    .catch((error) => {
      main.innerHTML = "";
      renderError("Ops, algo deu errado!");
      return error;
    })
    .finally(() => {
      return;
    });
};

submitButton.addEventListener("click", run);
