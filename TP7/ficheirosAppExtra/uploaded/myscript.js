$(() => {
    $("p").click(() => {
        $(this).css("color","red");
    })
    $("#hide").click(()=> {
        $("p").hide()
    })

    $("#show").click(()=> {
        $("p").show()
    })
})