document.addEventListener("DOMContentLoaded", function () {

    let serviceType = [];
    let services = [];

    let objeto = {
        'mecanico': "Mecânico",
        'eletricista': "Eletricista",
        'posto de gasolina': "Posto de Gasolina",
        'guincho': "Guincho",
        'borracheiro': "Borracheiro",
        'chaveiro': "Chaveiro",
    };

    let selectedService;

    const servicesList = document.querySelector('#service-list');
    const searchBar = document.querySelector('#searchBar');

    const items = document.querySelectorAll('.grid-item');

    searchBar.addEventListener('input', function () {
        const searchValue = searchBar.value.toLowerCase();

        const filteredServices = services.map(serv => {
            if (serv.cidade === searchValue)
                return { ...serv, cidade: searchValue };
            return serv;
        });

        displayServices(filteredServices);
    });

    //seta event listener nos icones
    items.forEach((item, index) => {
        serviceType.push(item.getAttribute('data-service'));

        item.addEventListener('click', () => displaySearchBar(index));
    });

    function displayServices(services) {

        servicesList.innerHTML = '';

        services.forEach(service => {
            const li = document.createElement('li');

            // Criando um contêiner para os elementos
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.gap = '20px';
            container.style.flexDirection = 'row'; // Adiciona a nova linha


            // Criando elementos separados para nome e serviço
            const nomeElement = document.createElement('span');
            nomeElement.textContent = service.nome;

            const servicoElement = document.createElement('span');
            servicoElement.textContent = objeto[service.servico];

            // Adicionando os elementos ao contêiner
            container.appendChild(nomeElement);
            container.appendChild(servicoElement);

            // Pulando uma linha e adicionando o novo elemento
            const cidadeElement = document.createElement('span');
            cidadeElement.textContent = service.cidade;
            container.appendChild(cidadeElement);

            // Adicionando o contêiner ao li
            li.appendChild(container);

            servicesList.appendChild(li);

            li.addEventListener('click', () => {
                selectedService = service;

                window.location.href = `details.html`;
            });
        });
    }

    //função que acessa a api e puxa os dados
    function displaySearchBar(value) {
        console.log(value);

        const url = `https://qap-token-auth.onrender.com/empresas?service=${serviceType[value]}`;

        searchBar.style.display = 'block';
        searchBar.focus();

        fetch(url)
            .then(response => response.json())
            .then(data => {
                services = data;
                //displayServices(services);
            })
            .catch(error => {
                console.error('Erro ao obter serviços:', error);
            });
    }

    //inicializa as particulas
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'particles.json', function () {
        console.log('particles.js loaded - callback');
    });

});
