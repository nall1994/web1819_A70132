$(() => {

    $("#listar").click(e => {
        e.preventDefault()
        $.ajax({
            type:"GET",
            contentType:"application/json",
            url:"http://localhost:4009/utilizadores",
            success: resultado => $("#infoSection").append('<p> Listagem de Utilizadores: </p> <br/> <p>' + JSON.stringify(resultado,null,2) + '</p>'),
            error: e => console.log(e)
        })
    })

    $("#consultar").click(e => {
        var user_email = $('#campo').val()
        $('#campo').val('')
        e.preventDefault()
        $.ajax({
            type:"GET",
            contentType:"application/json",
            url:"http://localhost:4009/utilizadores/" + user_email,
            success: resultado => $("#infoSection").append('<p> Utilizador: </p> <br/> <p>' + JSON.stringify(resultado) + '</p>'),
            error: e => alert(JSON.stringify(e))
        })
    })

    $("#inserir").click(e => {
        var form = document.getElementById('userForm')
        var formData = new FormData(form)
        e.preventDefault()
        $.ajax({
            type:"POST",
            contentType:false,
            url:"http://localhost:4009/utilizadores",
            data: formData,
            processData: false,
            success: f => alert(f.estado),
            error: e => alert('Erro')
        })
        $('#foto').val('')
        $('#email').val('')
        $('#nome').val('')
        $('#nivelAcesso').val('')
        $('#password').val('')
    })

    $("#atualizar").click(e => {
        var user_email = $('#updateEmail').val()
        e.preventDefault()
        $.ajax({
            type:"GET",
            contentType:"application/json",
            url:"http://localhost:4009/utilizadores/" + user_email,
            success: resultado => {
                var obj = JSON.parse(JSON.stringify(resultado))
                var secondobj = obj[0]
                document.getElementById('updateForm').style.display = "block"
                $('#updateNome').val(secondobj.nome)
                $('#updateNivelAcesso').val(secondobj.nivelAcesso)
                $('#updatePassword').val(secondobj.password)
            },
            error: e => alert('Erro')
        })
    })

    $('#atualizarButton').click(e => {
        var form = document.getElementById('updateForm')
        var formData = new FormData(form)
        e.preventDefault()
        $.ajax({
            type:"PUT",
            contentType:false,
            url:"http://localhost:4009/utilizadores/" + $('#updateEmail').val(),
            data: formData,
            processData: false,
            success: f => alert(JSON.stringify(f)),
            error: e => alert('Erro')
        })
        $('#updateEmail').val('')
        $('#updateNome').val('')
        $('#updateNivelAcesso').val('')
        $('#updatePassword').val('')
        document.getElementById('updateForm').style.display = "none"
    })
})