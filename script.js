const valorFrete = {
    sul: 18,
    nordeste: 26,
    norte: 30,
    centroOeste: 20,
    sudeste: 12
};

const estadosRegiao = {
        "AC": valorFrete.norte,
        "AP": valorFrete.norte,
        "AM": valorFrete.norte,
        "PA": valorFrete.norte,
        "TO": valorFrete.norte,
        "RO": valorFrete.norte,
        "RR": valorFrete.norte,
        "BA": valorFrete.nordeste,
        "CE": valorFrete.nordeste,
        "AL": valorFrete.nordeste,
        "MA": valorFrete.nordeste,
        "PB": valorFrete.nordeste,
        "PE": valorFrete.nordeste,
        "PI": valorFrete.nordeste,
        "RN": valorFrete.nordeste,
        "SE": valorFrete.nordeste,
        "GO": valorFrete.centroOeste,
        "MT": valorFrete.centroOeste,
        "MS": valorFrete.centroOeste,
        "DF": valorFrete.centroOeste,
        "MG": valorFrete.sudeste,
        "ES": valorFrete.sudeste,
        "RJ": valorFrete.sudeste,
        "SP": valorFrete.sudeste,
        "PR": valorFrete.sul,
        "RS": valorFrete.sul,
        "SC": valorFrete.sul,

}

function pegarCep(){
    const frete = document.getElementById("frete")
    const cep = document.getElementById("inputCEP").value

    if(cep.length < 8){
        return alert("Precisa ter 8 números")
    }

    fetch(`https://cep.awesomeapi.com.br/json/${cep}`).then(response => response.json())
    .then(dados =>{
        let estado = dados.state
        console.log(estado)
        let valor = estadosRegiao[estado]
        let valorTexto = valor.toString().padEnd(2,0)
        frete.innerText = `R$${(valorTexto)}`
    })
}



function calcularDolar() {
    var container = document.getElementById('perfumes-container');

    fetch('https://economia.awesomeapi.com.br/json/last/USD')
        .then(response => response.json())
        .then(dados => {
            if (!dados.USDBRL) throw new Error("Dados do dólar inválidos");
            let dolar = parseFloat(dados.USDBRL.bid);
            console.log("Cotação do dólar:", dolar);

            return fetch('https://raw.githubusercontent.com/Bru008/api-perfume/refs/heads/main/perfumes.json')
                .then(response => response.json())
                .then(perfumes => {
                    console.log("Perfumes recebidos:", perfumes);


                    perfumes.perfumes.forEach((item, i) =>{
                        if(item.id == parseInt(localStorage.getItem('id'))){
                            var perfume = item;
                            console.log(perfume)
                            let html = `
                            <div class="card">
                                <div style="width: 100%;" class="card-title">${perfume.nome}</div>
                                <img class="card-img" src="${perfume.img}" alt="${perfume.nome}">
                                <div style="width: 100%;" class="card-text">Preço em Dólar: $ <span class="preco">${perfume.precoDolar.toFixed(2)}</span></div>
                                <div style="width: 100%;" class="card-price">Ou R$ <span class="preco">${(dolar * perfume.precoDolar).toFixed(2)}</span></div>
                                <div><button class="btnPerfume" onclick="carrinho()">Adicionar ao carrinho</button></div>
                            </div>
                        `;
                            container.innerHTML = html;

                        }
                    })
                    
                });
        })
}

calcularDolar();
setInterval(calcularDolar, 30000);


fetch(`https://cep.awesomeapi.com.br/json/08795150`).then(response => response.json())
.then(dados =>{
    console.log("cep: ",dados)
})

function carrinho(){

    Swal.fire({
        title: "Adicionado ao carrinho com sucesso!",
        icon: "success",
        draggable: true
      });
}