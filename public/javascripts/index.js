$(() => {
    let url = "http://127.0.0.1:2777";
    let listAll = () => {
        $.get(url + "/listAll", (data) => {

            $('#hanan-tb').html('')
            $('#ayat-tb').html('')

            $(data).each((i, element) => {
                (element.name === "Hanan") ?

                $('#hanan-tb').append(`
                <tr>
                            <td>
                                ${element.enterTime}
                            </td>
                            <td>
                                ${element.exitTime}
                            </td>
                            <td>
                                ${element.date}
                            </td>
                </tr>`):
                    $('#ayat-tb').append(`
                <tr>
                            <td>
                                ${element.enterTime}
                            </td>
                            <td>
                                ${element.exitTime}
                            </td>
                            <td>
                                ${element.date}
                            </td>
                </tr>`)


            })
        });
    };


    $("#hananEnter").on("click", () => {
        $.post(url + "/hananEnter", (data) => {
            console.log(data)
        }).then(listAll);
    });


    $("#hananExit").on("click", () => {
        $.post(url + "/hananExit", (data) => {
            console.log(data)
        }).then(listAll);
    });


    $("#ayatEnter").on("click", () => {
        $.post(url + "/ayatEnter", (data) => {
            console.log(data)
        }).then(listAll);
    });


    $("#ayatExit").on("click", () => {
        $.post(url + "/ayatExit", (data) => {
            console.log(data)
        }).then(listAll);
    });
    listAll();
});