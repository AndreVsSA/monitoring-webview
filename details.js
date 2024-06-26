let objeto = {
    'mecanico': "Mecânico",
    'eletricista': "Eletricista",
    'posto de gasolina': "Posto de Gasolina",
    'guincho': "Guincho",
    'borracheiro': "Borracheiro",
    'chaveiro': "Chaveiro",
};

document.addEventListener("DOMContentLoaded", function () {

    let data = JSON.parse(localStorage.getItem("service"));

    console.log(data);

    displayServiceDetails(data);

});

function displayServiceDetails(service) {
    const detailsContainer = document.getElementById("service-details");
    detailsContainer.innerHTML = `
        <h2>${service.nome}</h2>
        <p>${service.estado}, ${service.cidade}, ${service.bairro}, ${service.rua}, ${service.numero}</p>
        <p>Telefone: ${service.telefone}</p>
        <p>Tipo de Serviço: ${objeto[service.servico]}</p>
    `;
}
particlesJS.load('particles-js', 'particles.json', function () {
    console.log('particles.js loaded - callback');
});
