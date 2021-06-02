$(() => {
    let url =
        "https://halaphone.herokuapp.com"
        //"http://127.0.0.1:2777"
    let listAll = () => {
        $.get(url + "/listAll", (data) => {

            $('#hanan-tb').html('')
            $('#ayat-tb').html('')

            $(data).each((i, element) => {
                (element.name === "Hanan") ?

                $('#hanan-tb').prepend(`
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
                    $('#ayat-tb').prepend(`
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
        let today = new Date();
        let time = today.getHours() +
            ":" +
            today.getMinutes();

        let date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate()

        let enterData = {
            name: "Hanan",
            enterTime: time,
            exitTime: "",
            date: date
        }
        $.post(url + "/hananEnter", enterData).then(listAll);
    });


    $("#hananExit").on("click", () => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes()
        let exitData = {
            exitTime: time,
        }
        $.post(url + "/hananExit", exitData).then(listAll);
    });


    $("#ayatEnter").on("click", () => {
        let today = new Date();
        let time = today.getHours() +
            ":" +
            today.getMinutes();

        let date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate()

        let enterData = {
            name: "Ayat",
            enterTime: time,
            exitTime: "",
            date: date
        }
        $.post(url + "/ayatEnter", enterData).then(listAll);
    });


    $("#ayatExit").on("click", () => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes()
        let exitData = {
            exitTime: time,
        }
        $.post(url + "/ayatExit",
            exitData).then(listAll);
    });
    let validate = (pin) => {
        return pin === '1397'
    }
    $("#clear").on("click", async() => {
        var pin = $('#code-input').val()
        if (validate(pin)) {
            $("#clearModal").modal("hide");
            await $.post(url + "/clearAll", data => {

            }).then(() => {
                listAll()
                $('#code-input').val("")
            })

        } else {
            $('#code-input').val("")
            alert("Wrong code!")

        }
    });

    let loading = new ldBar(".loading", {
        "stroke": '#f00',
        "stroke-width": 10,
        "preset": "bubble",
        "value": 65
    })
    loading
    listAll();
});