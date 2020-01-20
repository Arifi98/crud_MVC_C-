$(document).ready(function () {
    _getAll();
});

function _getAll() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';

            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Firstname + '</td>';
                html += '<td>' + item.Middlename + '</td>';
                html += '<td>' + item.Surname + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td><a href="#AddUser" data-target="#AddUser" onclick="return _UpdgetById(' + item.UserID + ')" class="btn btn-success btn-sm"><i class="fa fa-edit"></i><a> <a href="#RemoveUser" data-target="#RemoveUser" onclick="return _DelgetById(' + item.UserID + ')" class="btn btn-danger btn-sm"><i class="fa fa-times"></i><a></td>';
                html += '</tr>';
                html += '<tr>';
            });

            $('#list').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    return false;
}

function _DelgetById(id) {
    $.ajax({
        url: '/Home/Get/' + id,
        //data: JSON.stringify(dto),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#Firstname').val(result.Firstname);
            $('#UserID').val(result.UserID);
            $('#RemoveUser').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false
}

function _UpdgetById(id) {
    $.ajax({
        url: '/Home/Get/' + id,
        //data: JSON.stringify(dto),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#EFirstname').val(result.Firstname);
            $('#EMiddlename').val(result.Middlename);
            $('#ESurname').val(result.Surname);
            $('#EEmail').val(result.Email);
            $('#EUserID').val(result.UserID);
            $('#EditUser').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false
}

function _add() {
    $("#LoadingImage").show(); //show loading image

    //Validate fields
    if ($('#Firstname').val() == "") {
        $('#ErrFirstname').text("Firstname is required");
    }
    else if ($('#Middlename').val() == "") {
        $('#ErrMiddlename').text("Middlename is required");
    }
    else if ($('#Surname').val() == "") {
        $('#ErrSurname').text("Surname is required");
    }
    else if ($('#Email').val() == "") {
        $('#ErrEmail').text("Email Password is required");
    }
    else {
        //Get Values from fields
        var obj = {
            Firstname: $('#Firstname').val(),
            Middlename: $('#Middlename').val(),
            Surname: $('#Surname').val(),
            Email: $('#Email').val(),
        }
        $.ajax({
            url: '/Home/CreateUser',
            data: JSON.stringify(obj),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                _getAll();//Reload the table
                $("#LoadingImage").hide(); //show loading image
                $('#AddUser').modal('hide'); //Hide the modal

                //Clear the form
                var FormUser = document.getElementById("FormUser");
                FormUser.reset();

                //Return Success Message
                $.iaoAlert({
                    msg: "Success! Saved Successfully",
                    type: "notification",
                    mode: "dark",
                });

            },
            //Throw error
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    }
}

function _edit() {
    $("#LoadingImage2").show(); //show loading image

    //Validate fields
    if ($('#EFirstname').val() == "") {
        $('#EErrFirstname').text("Firstname is required");
    }
    else if ($('#EMiddlename').val() == "") {
        $('#EErrMiddlename').text("Middlename is required");
    }
    else if ($('#ESurname').val() == "") {
        $('#EErrSurname').text("Surname is required");
    }
    else if ($('#EEmail').val() == "") {
        $('#EErrEmail').text("Email Password is required");
    }
    else {
        //Get Values from fields
        var obj = {
            UserID: $('#EUserID').val(),
            Firstname: $('#EFirstname').val(),
            Middlename: $('#EMiddlename').val(),
            Surname: $('#ESurname').val(),
            Email: $('#EEmail').val(),
        }
        $.ajax({
            url: '/Home/UpdateUser',
            data: JSON.stringify(obj),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                _getAll();//Reload the table
                $("#LoadingImage2").hide(); //show loading image
                $('#EditUser').modal('hide'); //Hide the modal

                //Clear the form
                var FormUser = document.getElementById("FormUser");
                FormUser.reset();

                //Return Success Message
                $.iaoAlert({
                    msg: "Success! Saved Successfully",
                    type: "notification",
                    mode: "dark",
                });

            },
            //Throw error
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });

    }
}

function _delete() {
    //Get Values from fields
    var obj = {
        UserId: $('#UserID').val(),
    }
    $.ajax({
        url: '/Home/DeleteUser',
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            _getAll();//Reload the table
            $('#RemoveUser').modal('hide'); //Hide the modal

            //Clear the form
            var FormUserDelete = document.getElementById("FormUserDelete");
            FormUserDelete.reset();

            //Return Success Message
            $.iaoAlert({
                msg: "Success! Deleted Successfully",
                type: "warning",
                mode: "dark",
            });

        },
        //Throw error
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}
