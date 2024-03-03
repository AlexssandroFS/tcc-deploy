function save() {
    if (confirm("Você realmente deseja SALVAR os dados?") == true) {
        alert('Ok, retornando para a listagem!');
    } else {
        alert('Salvar Dados Cancelado!');
        return false;
    }
}


function edit() {
    if (confirm("Você realmente deseja EDITAR os dados?") == true) {
        alert('Ok, retornando para a listagem!');
    } else {
        alert('Edição Cancelada!');
        return false;
    }
}

function del() {
    if (confirm("Você realmente deseja EXCLUIR os dados?") == true) {
        alert('Ok, retornando para a listagem!');
    } else {
        alert('Exclusão Cancelada!');
        return false;
    }
}