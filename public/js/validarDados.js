
 // FUNCÃO PEGAR DATA DO DIA CORRENTE
 // Função para formatar 1 em 01
 const zeroFill = n => {
    return ('0' + n).slice(-2);
  }

  // Cria intervalo
  const interval = setInterval(() => {
    // Pega o horário atual
    const now = new Date();

    const data = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear();
    console.log(data);

    // Exibe na tela usando a div#data
    //document.getElementById('data').innerHTML = data;

    // Formata a data conforme dd/mm/aaaa hh:ii:ss
    const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());

    // Exibe na tela usando a div#data-hora
    document.getElementById('data-hora').innerHTML = dataHora;
    document.getElementById('data').innerHTML = data;

  }, 1000);


  //INICIO atualizar o ID do produto na edição na SAÍDA DE PRODUTOS
  function updateIDProd() {

    var select = document.getElementById('atualizarIDProd');
    var option = select.options[select.selectedIndex];
    //var select = document.getElementById('atualizarValor');
    //abaixo para atualizar o ID do produto para EDICAO
    document.getElementById('valueIDNomeProd').value = option.value;

    //abaixo pega valor unitario atual atraves do ID do PRODUTO ao fazer a troca valoru unitario produto
    document.getElementById('valueValor').value = option.value;
    // document.getElementById('valueCategoria').value = option.value;


    // var t1 = document.querySelector('input[name="valorunit"]');
    //// var t2 = document.querySelector('textarea[name="valorunit"]');
    // t2.value = t1.value;

}

updateIDProd(); //formulario recebe atraves do "id="update"
//FIM atualizar o ID do produto na edição na SAÍDA DE PRODUTO




//codigo javascript para BLOQUEAR inserção de números em determinado input
//fim da função que analisa as possibilidades condicionais para o status da validade do produto
// Declaring and initializing variables
// const validar = document.getElementById("validar");
//const statusvalidade = document.getElementById("statusvalidade");
let validar = document.getElementById("validar");
let statusvalidade = document.getElementById("statusvalidade");

validar.addEventListener("click", () => {
    //Create a Date object from input value
    // const date1 = dataatual;
    // const date2 = datavalidade;

    let dataatual = new Date(document.getElementById("date-1").value);
    let datavalidade = new Date(document.getElementById("date-2").value);

    //Check if the input dates are valid
    //If valid calculate the difference
    if (dataatual.getTime() && datavalidade.getTime()) {
        //Calculate difference in time using getTime function
        //getTime calculates number of years since January 1,1970
        let timeDifference = datavalidade.getTime() - dataatual.getTime();

        //Since this value is in milliseconds we need to convert it into days
        //We want the difference to be a non-negative number. Hence we use Math.abs()
        let dayDifference = Math.abs(timeDifference / (1000 * 3600 * 24));
        //difdias.innerHTML = `A diferenca entre as duas data e <span>${dayDifference}</span> dias`;

        if (datavalidade > dataatual && dayDifference > 2) {
            statusvalidade.innerHTML = "Produto com validade em dia! " + "Vencerá em " + dayDifference + " dia(s).";
        } else if (datavalidade > dataatual && dayDifference > 0) {
            statusvalidade.innerHTML = "Atenção: Produto com validade comprometida! Vencerá em " + dayDifference + " dia(s)!";
        } else if (datavalidade < dataatual || dayDifference < 0) {
            statusvalidade.innerHTML = "Urgente: Produto validade VENCIDA a " + dayDifference + " dia(s).";
        } else {
            statusvalidade.innerHTML = "Cuidado! Produto vence hoje!";
        }

        //abaixo server para ATUALIZAR O CAMPO QUE IRÁ SALVAR NO DB o resultado da função que aparece no HTML no EDIT/NEW
        let tot = statusvalidade.innerHTML;
        document.getElementById('updateStatusValidade').value = tot

        //inicio id demo
        // <p id="demo" id="statusvalidade" name="statusvalidade"></p>
        //  FAZ A CÓPIA DO RESULTADO DA FUNÇÃO AO REALIZAR O "VERIFICAR VALIDADE"
        let html = document.getElementById("statusvalidade").innerHTML;
        document.getElementById("demo").innerHTML = html;

        //fim id demo


    }
    //Else display that the input is valid
    else {
        statusvalidade.innerHTML = "Por favor, selecione uma data valida";
    }
    return validar;
    console.log(statusvalidade);
});
//fim da função que analisa as possibilidades condicionais para o status da validade do produto

///////////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function() { // aguarda o DOM carregar

    var sel = document.querySelector("select[name='papel']"); // seleciona o SELECT
    var qtd = document.querySelector("input[name='quantidade']"); // seleciona o INPUT quantidade
    sel.onchange = multi; // evento change do SELECT
    qtd.oninput = multi; // evento oninput do INPUT quantidade

    // função para realizar a multiplicação
    function multi() {
        // converte o valor do SELECT em float e troca a vírgula da decimal por ponto, se houver
        var papel = parseFloat(sel.value.replace(",", "."));
        var quant = qtd.value; // valor do INPUT quantidade
        var res = papel * quant; // faz a multiplicação

        // insere no INPUT valor se não for NaN. Se for NaN insere 0
        // toFixed(2) seta 2 casas decimais e o replace troca o ponto decimal pela vírgula
        document.querySelector("input[name='valor']").value = !isNaN(res) ? res.toFixed(2).replace(".", ",") : 0;
    }

});



//inicio função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD
function Mult() {
    var valorItem = document.getElementById('valueIDNomeProd');
    var mult = 1;
    var ipts = document.querySelectorAll('input[oninput="Mult()"]');
    for (var x = 0; x < ipts.length; x++) {
        var valorItem = parseFloat(ipts[x].value);
        if (mult > 0 && mult === 0)
            mult = valorItem;
        else {
            !isNaN(valorItem) ? mult *= parseFloat(valorItem) : null;
            console.log(mult);
        }
    }
    document.querySelector('#valortotal').value = mult.toFixed(2);
}
///////////////////////////////////////////////////////////////////////


//inicio função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD
function MultSaida() {
    var valorItem = document.getElementById('valueIDNomeProd');
    var mult = 1;
    var ipts = document.querySelectorAll('input[oninput="MultSaida()"]');
    for (var x = 0; x < ipts.length; x++) {
        var valorItem = parseFloat(ipts[x].value);
        if (mult > 0 && mult === 0)
            mult = valorItem;
        else {
            !isNaN(valorItem) ? mult *= parseFloat(valorItem) : null;
            console.log(mult);
        }
    }
    //document.querySelector('#valortotal').value = mult.toFixed(2);
    document.querySelector('#valortotalsaida').value = mult.toFixed(2);



}
//fim função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD



//inicio função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD
function Estoquesubtrair() {
    var subtrair = 0;
    var ipts = document.querySelectorAll('input[onclick="Estoquesubtrair()"]');
    for (var x = 0; x < ipts.length; x++) {
        var valorItem = parseFloat(ipts[x].value);
        if (subtrair === 0)
            subtrair = valorItem;
        else {
            !isNaN(valorItem) ? subtrair -= parseFloat(valorItem) : null;
            console.log(subtrair);
        }
    }
    document.querySelector('#subtraitvalortotal').value = subtrair.toFixed(2);

}
//fim função para MULTIPLICAR a qtde comprada pelo valor unitario para salvar no BD



var items = [{
        name: 'Batata',
        points: 23,
    },
    {
        name: 'Pizza',
        points: 50,
    },
    {
        name: 'Tacos',
        points: 60,
    },
];

const i = items
    .map(x => x.points)
    .reduce((a, b) => a + b, 0);
console.log(i);


//tentando usar em usuarios/new
const inputName = document.querySelector("#nome");
inputName.addEventListener("keypress", function(e) { //function(e) é uma VARIAVEL ANONIMA 
    const keyCode = (e.keyCode ? e.keyCode : e.wich);

    //47 a 58 são números
    if (keyCode > 47 && keyCode < 58) {
        e.preventDefault();
    }
});