let tb_user;
let tb_pass;
let bt_login;

$(() => {
    tb_user = $("#user");
    tb_pass = $("#pass");
    bt_login = $("#login");
    
    bt_login.click(function(e) {
        e.preventDefault();
        if (tb_user.val() != "" && tb_pass.val() != "") {
            $.ajax({
                url: "/sign-in",
                method: "POST",
                data: {
                    username: tb_user.val(),
                    password: tb_pass.val()
                },
                success: (result) => {
                    localStorage.userData = JSON.stringify({
                        user: result.user.user
                    });
                    document.location.href = "/home";
                },
                fail: (err) => {
                    console.log(err);
                    alert("Error, wacha la consola");
                }
            })
        }
    });
});