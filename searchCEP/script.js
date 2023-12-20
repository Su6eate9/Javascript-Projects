const submitButton = document.querySelector("#app form button");
const zipCodeField = document.querySelector("#app form input");
const main = document.querySelector("#app main");

const renderAddress = (data) => {
  const publicPlace = document.createElement("p");
  const complement = document.createElement("p");
  const neighborhood = document.createElement("p");
  const locality = document.createElement("p");

  publicPlace.innerText = `Logradouro: ${data.logradouro}`;
  complement.innerText =
    data.complemento != ""
      ? `Complemento: ${data.complemento.replace("(", "").replace(")", "")}`
      : null;
  neighborhood.innerText = `Bairro: ${data.bairro}`;
  locality.innerText = `Cidade: ${data.localidade}/${data.uf}`;

  main.appendChild(publicPlace);
  main.appendChild(complement);
  main.appendChild(neighborhood);
  main.appendChild(locality);
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
