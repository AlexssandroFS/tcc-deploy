function save() {
    if (confirm("Você realmente deseja SALVAR os dados?") == true) {
        alert('Ok, dados serão SALVOS com sucesso no Banco de Dados!');
    } else {
        alert('Salvar Dados Cancelado!');
        return false;
    }
}


function edit() {
    if (confirm("Você realmente deseja EDITAR os dados?") == true) {
        alert('Ok, dados serão SALVOS com sucesso no Banco de Dados!');
    } else {
        alert('Edição Cancelada!');
        return false;
    }
}

function del() {
    if (confirm("Você realmente deseja EXCLUIR os dados?") == true) {
        alert('Ok, dados serão EXCLUÍDOS com sucesso no Banco de Dados!');
    } else {
        alert('Exclusão Cancelada!');
        return false;
    }
}