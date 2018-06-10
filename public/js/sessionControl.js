let userData = JSON.parse(localStorage.userData);
let bt_logout;

$(() => {
    bt_logout = $("#logout");

    bt_logout.click(function(e) {
        e.preventDefault();
        localStorage.removeItem("userData");
        document.location.href = "/logout";
    });
});