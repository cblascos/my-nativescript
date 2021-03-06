var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var email;
var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel();
var config = require("../../shared/config");
var dialogsModule = require("ui/dialogs");

exports.loaded = function (args) {
    var page = args.object;
    if (page.ios) {
        var navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    page.bindingContext = user;
};

exports.signIn = function () {
    user.login()
            .then(function () {
            frameModule.topmost().navigate("views/list/list");
        })
        .catch(function (error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
        })
;

};

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};