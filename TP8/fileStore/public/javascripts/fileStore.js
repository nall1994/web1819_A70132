$(() => {
    $('#ficheiros').load('http://localhost:4008/ficheiros')

    $('#adicionar').click(e => {
        e.preventDefault()
        var data = getDate()
        $('#ficheiros').append('<tr> <td> <a target="_blank" rel="noopener noreferrer" href="http://localhost:4008/uploaded/' + $('#ficheiro').val().split('\\').pop() + '">' + $('#ficheiro').val().split('\\').pop() + '</a>' + '</td> <td>' + $('#descricao').val() + '</td> <td>' + data + '</td> </tr>')
        ajaxPost(data)
    })

    function ajaxPost(data) {
        var form = document.getElementById('fileForm')
        var formData = new FormData(form)
        formData.append('dataSubmissao',data)
        $.ajax({
            type: 'POST',
            contentType: false,
            url: 'http://localhost:4008/ficheiros/guardar',
            data: formData,
            processData: false,
            success: f => alert(f.estado),
            error: e => {
                alert('Erro no post: ' + e)
                console.log('Erro no post: ' + e)
            }
        })
        $('#descricao').val('')
        $('#ficheiro').val('')
    }

    function getDate() {
        var today = new Date()
        var dia = today.getDate()
        var mes = today.getMonth()+1
        var ano = today.getFullYear()
        var hora = today.getHours()
        var minutos = today.getMinutes()
        var segundos = today.getSeconds()

        if(dia < 10)
            dia = '0' + dia
        if(mes < 10)
            mes = '0' + mes
        if(hora < 10)
            hora = '0' + hora
        if(minutos < 10)
            minutos = '0' + minutos
        if(segundos < 10)
            segundos = '0' + segundos

        today = 'data: ' + dia + '-' + mes + '-' + ano + '; hora: ' + hora + 'h:' + minutos + 'm:' + segundos + 's'
        return today
    }
})