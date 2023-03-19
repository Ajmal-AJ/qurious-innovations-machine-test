
//  add member  (create)

$( "#AddmemberForm" ).submit(function(e){
    e.preventDefault();
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
        type: "POST",
        url: "/members/add-member/",
        data: {
            'first_name': $("#first_name").val(),
            'last_name': $("#last_name").val(),
            'email': $("#email").val(),
            'phone': $("#phone").val(),
            'address': $("#address").val(),
            'city': $("#city").val(),
            'dob': $("#dob").val(),
            'passport_number': $("#passportNumber").val(),
            'expire_date': $("#expireDate").val(),
            'country_code' : $("#code").find(":selected").val(),
            'csrfmiddlewaretoken': csrftoken
        },
        success: function (response) {
            // $('#exampleModal').modal('hide');
            // $('#AddmemerForm')[0].reset();

            location.reload()

        }
    })
})

// edit member (update)

function editMember(id) {
    $.ajax({
        type: "GET",
        url: '/members/edit-member/' + id,
        success: function (response) {
            $('#uniqId').val(id)
            $('#memderId').html(response.data.member_id)
            $('#updateFirstName').val(response.data.first_name)
            $('#updateLastName').val(response.data.last_name)
            $('#updateEmail').val(response.data.email)
            $('#updatePhone').val(response.data.phone)
            $('#updateAddress').val(response.data.address)
            $('#udpateCity').val(response.data.city)
            $('#updateDob').val(response.data.date_of_birth)
            $('#updatePassportNumber').val(response.data.passport_number)
            $('#updateExpireDate').val(response.data.passport_expiry_date)
            $("#updateCode").find(":selected").val(response.data.country_code)
            $("#updateCode").find(":selected").html("+"+response.data.country_code)

        }
    })

    $( "#editMemberForm" ).submit(function(e) {
        e.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        id = $("#uniqId").val(),
            $.ajax({
                type: "POST",
                url: '/members/edit-member/' + id + "/",
                data: {
                    'first_name': $("#updateFirstName ").val(),
                    'last_name': $("#updateLastName").val(),
                    'email': $("#updateEmail").val(),
                    'phone': $("#updatePhone").val(),
                    'address': $("#updateAddress").val(),
                    'city': $("#udpateCity").val(),
                    'dob': $("#updateDob").val(),
                    'passport_number': $("#updatePassportNumber").val(),
                    'expire_date': $("#updateExpireDate").val(),
                    'country_code' : $("#updateCode").find(":selected").val(),
                    'csrfmiddlewaretoken': csrftoken,
                },
                success: function (response) {
                    $('#editMember').modal('hide');
                    location.reload()
                }
            })
    });
}




// member active and deactivate 

$(document).ready(function () {
    $("#DeactivateBtn").hide()
    $("#ReactivateBtn").hide()
})

$cbs = $('input[name="memberselect"]').click(function () {
    $("#DeactivateBtn").toggle($cbs.is(":checked"));
    $("#ReactivateBtn").toggle($cbs.is(":checked"));
});
$("#selectAll").click(function () {
    $("input[type=checkbox]").prop("checked", $(this).prop("checked"));
    $("#DeactivateBtn").toggle($cbs.is(":checked"));
    $("#ReactivateBtn").toggle($cbs.is(":checked"));
});

function deactivate(id) {
    $.ajax({
        url: "/members/deactivate-member/" + id,
        type: "GET",
        success: function (response) {
            alert(response.msg)
            location.reload()

        }
    })
}

function reactivate(id) {
    $.ajax({
        url: "/members/reactivate-member/" + id,
        type: "GET",
        success: function (response) {
            alert(response.msg)
            location.reload()

        }
    })
}
//==========

$('#ReactivateBtn').click(function () {
    var val = [];
    $(':checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });
    selected_member_status_update('reactivate', val)
});

$('#DeactivateBtn').click(function () {
    var val = [];
    $(':checkbox:checked').each(function (i) {
        val[i] = $(this).val();
    });
    selected_member_status_update('deactivate', val)

});

function selected_member_status_update(status, ids) {

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    $.ajax({
        type: "POST",
        url: "/members/status-update/",
        data: {
            'ids': ids,
            'status': status,
            'csrfmiddlewaretoken': csrftoken
        },
        success: function (response) {
            alert(response.msg)
            location.reload()

        }
    })
}

















