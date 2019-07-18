$('#tweetsSearch').on('submit', function (event) {
    event.preventDefault();
    // let formData = $('#tweetsSearch').serializeArray();

    $.ajax({
        url: this.action,
        type: 'post',
        data: $(this).serialize(),
        success: function (data, textStatus) {
            console.log(data);
        },
        error: function (data) {
            alert(data.error);
        }
    })
});