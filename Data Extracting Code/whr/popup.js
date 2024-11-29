function submitNewsetter(t) {
    var a = "spnNews";
    return $("#" + a).html('<img src="images/ajax-loader.gif" />'), $.post("submit_newsletter.php", {
        user_email: $("#txtEmail").val(),
        action: "ajax"
    }, function(t) {
        $("#" + a).html(unescape(t)), $("#" + a).show(), document.getElementById("txtEmail").value = ""
    }), !1
}

function getCityList(t) {
    var a = "ajax_city_list.php?",
        e = a + "stateID=" + encodeURIComponent(t) + "&b=1";
    jQuery.get(e, function(t) {
        document.getElementById("divCity").innerHTML = t, $("#slState").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slCity").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function getCityListDealer(t) {
    var a = "ajax_city_list.php?",
        e = a + "stateID=" + encodeURIComponent(t) + "&b=1";
    jQuery.get(e, function(t) {
        document.getElementById("divCity").innerHTML = t, $("#slStateDealer").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slCity").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function getCityList1(t) {
    var a = "ajax_city_list.php?",
        e = jQuery("#category").val();
    if (10 == e) var o = a + "stateID=" + encodeURIComponent(t) + "&b=2&catID=" + e;
    else var o = a + "stateID=" + encodeURIComponent(t) + "&b=2";
    jQuery.get(o, function(t) {
        document.getElementById("divCity1").innerHTML = t, $("#slState1").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slCity1").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function getCityListState(t) {
    var a = "ajax_city_list.php?",
        e = a + "stateID=" + encodeURIComponent(t) + "&b=11";
    jQuery.get(e, function(t) {
        document.getElementById("divCity1").innerHTML = t, $("#slState").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#txtCity").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function getPinCodeList(t) {
    var a = "ajax_city_list.php?",
        e = a + "cityID=" + encodeURIComponent(t) + "&b=12";
    jQuery.get(e, function(t) {
        document.getElementById("divPin").innerHTML = t
    })
}

function getLocationList(t) {
    var a = "ajax_city_list.php?",
        e = a + "cityID=" + encodeURIComponent(t) + "&b=5";
    jQuery.get(e, function(t) {
        document.getElementById("divLocation").innerHTML = t, $("#slCity").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slLocation").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slLocation").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function getCityLocationList(t) {
    var a = "ajax_city_list.php?",
        e = a + "cityID=" + encodeURIComponent(t) + "&b=13";
    jQuery.get(e, function(a) {
        document.getElementById("divLocation").innerHTML = a, $("#txtCity").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), "266" == t ? (console.log($("#divLocation").find("#txtLocation").text()), $("#slLocation").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#locationinput").val(""), $("#locationinput").hide(), $("#divLocation").children().show(), $("#txtLocation").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>")
        }), $("#txtLocation").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")) : ($("#divLocation").children().hide(), $("#locationinput").show())
    })
}

function getLocationList1(t) {
    var a = "ajax_city_list.php?",
        e = jQuery("#category").val();
    if (10 == e) var o = a + "cityID=" + encodeURIComponent(t) + "&b=4&catID=" + e;
    else var o = a + "cityID=" + encodeURIComponent(t) + "&b=4";
    jQuery.get(o, function(t) {
        document.getElementById("divLocation1").innerHTML = t, $("#slCity1").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slLocation1").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slLocation1").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function getCityListBuiltin(t) {
    var a = "ajax_city_list.php?",
        e = a + "stateID=" + encodeURIComponent(t) + "&b=3";
    jQuery.get(e, function(t) {
        document.getElementById("divCity1").innerHTML = t, $("#slState1").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slCity1").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function getStates(t) {
    var a = "ajax_city_list.php?",
        e = a + "catID=" + encodeURIComponent(t) + "&b=007";
    jQuery.get(e, function(t) {
        document.getElementById("divState1").innerHTML = t, $("#slCity1").empty().append("<option value='0'>Select</option>"), $("#slLocation1").empty().append("<option value='0'>Select</option>"), $("#category").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slState1").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function getLocationListBuiltin(t) {
    var a = "ajax_city_list.php?",
        e = a + "cityID=" + encodeURIComponent(t) + "&b=6";
    jQuery.get(e, function(t) {
        document.getElementById("divLocation1").innerHTML = t, $("#slCity1").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slLocation1").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#slLocation1").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function eventfire(t, a) {
    $("#big_img").attr("src", t), $("#price").html("<h4>" + a + "</h4>")
}

function load_url(t, a) {
    return $.post(t, {
        email: ""
    }, function(t) {
        setTimeout("LoadContent('" + a + "', '" + escape(t) + "')", 100)
    }), !1
}

function LoadContent(t, a) {
    $("#" + t).html(unescape(a))
}

function load_Media(t, a) {
    return $.post(t, {
        email: ""
    }, function(t) {
        $("#" + a).html(unescape(t))
    }), !1
}

function findSubCatPtd(t) {
    var a = "ajax_ptd_subcat.php?",
        e = a + "subCatId=" + encodeURIComponent(t) + "&t=ptd";
    jQuery.get(e, function(t) {
        document.getElementById("durationDiv").innerHTML = t;
        var a = document.getElementById("priceHidden").value;
        document.getElementById("price").value = a, $("#sub_cat").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#duration").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function findSubCatPtdPrice(t) {
    var a = "ajax_ptd_subcat.php?",
        e = a + "durationId=" + encodeURIComponent(t) + "&t=ptd";
    jQuery.get(e, function(t) {
        document.getElementById("price").value = t
    })
}

function findSubCatGnp(t) {
    var a = "ajax_ptd_subcat.php?",
        e = a + "subCatId=" + encodeURIComponent(t) + "&t=gnp";
    jQuery.get(e, function(t) {
        $("#durationDiv").html(t), document.getElementById("durationDiv").innerHTML = t;
        var a = document.getElementById("durationHidden").value;
        document.getElementById("duration").value = a;
        var e = document.getElementById("priceHidden").value;
        document.getElementById("price").value = e, $("#sub_cat").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#durationDiv").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        })
    })
}

function findSubCatGnpPrice(t) {
    var a = "ajax_ptd_subcat.php?",
        e = a + "durationId=" + encodeURIComponent(t) + "&t=gnp";
    jQuery.ajax({
        type: "POST",
        url: e,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(t) {
            document.getElementById("price").value = t.price, document.getElementById("duration").value = t.year, $("#model").each(function() {
                var t = $(this).find(":selected").text();
                $(this).next(".holder").text(t)
            })
        }
    })
}

function Validate360() {
    var t = "",
        a = ($("#contact_name").val(), $("#contact_email").val(), /^[\s]+$/),
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#contact_name").val() || a.test($("#contact_name").val()) || !isNaN($("#contact_name").val())) && ($("#contact_name").addClass("loginFormError"), t = 1), ("" == $("#contact_email").val() || a.test($("#contact_email").val()) || !e.test($("#contact_email").val())) && ($("#contact_email").addClass("loginFormError"), t = 1), ("" == $("#contact_no").val() || a.test($("#contact_no").val()) || !o.test($("#contact_no").val())) && ($("#contact_no").addClass("loginFormError"), t = 1), ("" == $("#slState").val() || a.test($("#slState").val())) && ($("#slState").addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").addClass("loginFormError"), t = 1), $("#txtLocation").is(":visible") && ("" == $("#txtLocation").val() || a.test($("#txtLocation").val())) && ($("#txtLocation").addClass("loginFormError"), t = 1), $("#locationinput").is(":visible") && ("" == $("#locationinput").val() || a.test($("#locationinput").val())) && ($("#locationinput").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function removeError(t) {
    $("#" + t).removeClass("loginFormError"), $("#" + t).parent().hasClass("select-wrapper") && $("#" + t).parent().removeClass("loginFormError")
}

function removeErr(t) {
    $("#" + t).removeClass("loginFormError"), console.log("sdsdsd"), $("#" + t).parent().hasClass("select-wrapper") && $("#" + t).parent().removeClass("loginFormError")
}

function removeError1(t) {
    $("#" + t).removeClass("loginFormError1")
}

function validateAccessory() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtfName").val() || a.test($("#txtfName").val()) || !isNaN($("#txtfName").val())) && ($("#txtfName").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtAddress1").val() || a.test($("#txtAddress1").val())) && ($("#txtAddress1").addClass("loginFormError"), t = 1), ("" == $("#slState").val() || a.test($("#slState").val()) || "0" == $("#slState").val()) && ($("#slState").addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").addClass("loginFormError"), t = 1), ("" == $("#txtLocation").val() || a.test($("#txtLocation").val())) && ($("#txtLocation").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function findSubCat(t) {
    var a = "ajax_subcat.php?",
        e = a + "CatId=" + encodeURIComponent(t);
    jQuery.get(e, function(t) {
        document.getElementById("durationDiv").innerHTML = t, $("#subcat").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>")
        }), $("#subcat").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function findSubCatcontact(t) {
    var a = "ajax_subcat.php?",
        e = a + "CatId=" + encodeURIComponent(t);
    jQuery.get(e, function(t) {
        document.getElementById("durationDiv").innerHTML = t, $("#category").each(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#subcat").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>");
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }), $("#subcat").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function findSubCatSub(t) {
    var a = "ajax_subcatsub.php?",
        e = a + "CatId=" + encodeURIComponent(t);
    jQuery.get(e, function(t) {
        document.getElementById("durationDiv").innerHTML = t, $("#subcat").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>")
        }), $("#subcat").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function findSubCatProblem(t) {
    var a = "ajax_subcatproblem.php?",
        e = a + "id=" + encodeURIComponent(t);
    jQuery.get(e, function(t) {
        document.getElementById("subprobid").innerHTML = t, $("#subcatproblem").each(function() {
            $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>")
        }), $("#subcatproblem").change(function() {
            var t = $(this).find(":selected").text();
            $(this).next(".holder").text(t)
        }).trigger("change")
    })
}

function validateExportContact() {
    var t = 0,
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return "" == $("#txtName").val() || a.test($("#txtName").val()) || !isNaN($("#txtName").val()) ? ($("#txtName").addClass("loginFormError"), t = 1) : $("#txtName").removeClass("loginFormError"), "" == $("#txtComment").val() || a.test($("#txtComment").val()) ? ($("#txtComment").addClass("loginFormError"), t = 1) : $("#txtComment").removeClass("loginFormError"), "" == $("#sl-type").val() || a.test($("#sl-type").val()) || "" == $("#sl-type").val() ? ($("#sl-type").parent().addClass("loginFormError"), $("#sl-type").addClass("loginFormError"), t = 1) : $("#sl-type").removeClass("loginFormError"), "" == $("#txtPhone").val() || o.test($("#txtPhone").val()) ? $("#txtPhone").removeClass("loginFormError") : ($("#txtPhone").addClass("loginFormError"), t = 1), "" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val()) ? ($("#txtEmail").addClass("loginFormError"), t = 1) : $("#txtEmail").removeClass("loginFormError"), 1 == t ? !1 : !0
}

function validateContact() {
    var t = 0,
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtName").val() || a.test($("#txtName").val()) || !isNaN($("#txtName").val())) && ($("#txtName").addClass("loginFormError"), t = 1), ("" == $("#txtComment").val() || a.test($("#txtComment").val())) && ($("#txtComment").addClass("loginFormError"), t = 1), ("" == $("#sltype").val() || a.test($("#sltype").val()) || "0" == $("#sltype").val()) && ($("#sltype").parent().addClass("loginFormError"), t = 1), "" == $("#sltype").val() || "Feedback1" != $("#sltype").val() && "Know More" != $("#sltype").val() || (("" == $("#category").val() || a.test($("#category").val())) && ($("#category").parent().addClass("loginFormError"), t = 1), ("" == $("#subcat").val() || a.test($("#subcat").val())) && ($("#subcat").parent().addClass("loginFormError"), t = 1)), ("" == $("#slState").val() || a.test($("#slState").val()) || "0" == $("#slState").val()) && ($("#slState").parent().addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").parent().addClass("loginFormError"), t = 1), $("#txtLocation").is(":visible") && ("" == $("#txtLocation").val() || a.test($("#txtLocation").val())) && ($("#txtLocation").parent().addClass("loginFormError"), t = 1), $("#locationinput").is(":visible") && ("" == $("#locationinput").val() || a.test($("#locationinput").val())) && ($("#locationinput").addClass("loginFormError"), t = 1), "Phone" == $("#phoneid:checked").val() && ("" != $("#txtPhone").val() && o.test($("#txtPhone").val()) || ($("#txtPhone").addClass("loginFormError"), t = 1)), "" == $("#txtPhone").val() || o.test($("#txtPhone").val()) || ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateNewComplaint() {
    var t = 0,
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/,
        r = /^[A-Za-z]{3}[0-9]{9}$/,
        s = $("#serial_no").val(),
        n = (s.substring(2, 4), s.substring(4, 6), $("#purchase_date").val());
    n.substring(2, 4), n.substring(5, 7);
    return "" == $("#txtName").val() || a.test($("#txtName").val()) || !isNaN($("#txtName").val()) ? ($("#txtName").addClass("loginFormError"), t = 1) : $("#txtName").removeClass("loginFormError"), "" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val()) ? ($("#txtEmail").addClass("loginFormError"), t = 1) : $("#txtEmail").removeClass("loginFormError"), "" == $("#txtAddress").val() || a.test($("#txtAddress").val()) ? ($("#txtAddress").addClass("loginFormError"), t = 1) : $("#txtAddress").removeClass("loginFormError"), "" != $("#txtPhone").val() && o.test($("#txtPhone").val()) && ("" == $("#txtPhone").val() || o.test($("#txtPhone").val())) ? $("#txtPhone").removeClass("loginFormError") : ($("#txtPhone").addClass("loginFormError"), t = 1), "" == $("#categoryx").val() || a.test($("#categoryx").val()) ? ($("#categoryx").parent().addClass("loginFormError"), t = 1) : $("#categoryx").parent().removeClass("loginFormError"), "" == $("#serial_no").val() || "INA051212345" == $("#serial_no").val() || a.test($("#serial_no").val()) || !r.test($("#serial_no").val()) ? ($("#serial_no").addClass("loginFormError"), t = 1) : $("#serial_no").removeClass("loginFormError"), "" == $("#request_for").val() || a.test($("#request_for").val()) ? ($("#request_for").parent().addClass("loginFormError"), t = 1) : $("#request_for").removeClass("loginFormError"), "" != $("#request_for").val() && "complaint" == $("#request_for").val() && ("" == $("#subcatproblem").val() || a.test($("#subcatproblem").val()) ? ($("#subcatproblem").parent().addClass("loginFormError"), t = 1) : $("#subcatproblem").parent().removeClass("loginFormError")), "" != $("#second_appoint").val() && ("" == $("#time_slot2").val() || a.test($("#time_slot2").val()) ? ($("#time_slot2").parent().addClass("loginFormError"), t = 1) : $("#time_slot2").parent().removeClass("loginFormError")), "" != $("#third_appoint").val() && ("" == $("#time_slot3").val() || a.test($("#time_slot3").val()) ? ($("#time_slot3").parent().addClass("loginFormError"), t = 1) : $("#time_slot3").parent().removeClass("loginFormError")), 1 == t ? !1 : !0
}

function validateCustomerCare() {
    var t = 0,
        a = /^[\s]+$/;
    return ("" == $("#slStatenew").val() || a.test($("#slStatenew").val()) || "0" == $("#slStatenew").val()) && ($("#slStatenew").parent().addClass("loginFormError"), t = 1), ("" == $("#slCitynew").val() || a.test($("#slCitynew").val()) || "0" == $("#slCitynew").val()) && ($("#slCitynew").parent().addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateBrandShop() {
    var t = 0,
        a = /^[\s]+$/;
    return ("" == $("#slState").val() || a.test($("#slState").val()) || "0" == $("#slState").val()) && ($("#slState").parent().addClass("loginFormError"), t = 1), ("" == $("#slCity").val() || a.test($("#slCity").val()) || "0" == $("#slCity").val()) && ($("#slCity").parent().addClass("loginFormError"), t = 1), ("" == $("#slLocation").val() || a.test($("#slLocation").val()) || "0" == $("#slLocation").val()) && ($("#slLocation").parent().addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateDealerNetwork() {
    var t = 0,
        a = /^[\s]+$/;
    return ("" == $("#category").val() || a.test($("#category").val()) || "0" == $("#category").val()) && ($("#category").parent().addClass("loginFormError"), t = 1), ("" == $("#slState1").val() || a.test($("#slState1").val()) || "0" == $("#slState1").val()) && ($("#slState1").parent().addClass("loginFormError"), t = 1), ("" == $("#slCity1").val() || a.test($("#slCity1").val()) || "0" == $("#slCity1").val()) && ($("#slCity1").parent().addClass("loginFormError"), t = 1), ("" == $("#slLocation1").val() || a.test($("#slLocation1").val()) || "0" == $("#slLocation1").val()) && ($("#slLocation1").parent().addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function ValidateMultidoorCampaign() {
    var t = "",
        a = ($("#name").val(), $("#email").val(), /^[\s]+$/),
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    if (("" == $("#name").val() || "Name" == $("#name").val() || a.test($("#name").val()) || !isNaN($("#name").val())) && ($("#name").addClass("loginFormError1"), t = 1), ("" == $("#email").val() || "Email" == $("#email").val() || a.test($("#email").val()) || !e.test($("#email").val())) && ($("#email").addClass("loginFormError1"), t = 1), ("" == $("#contactno").val() || "Contact No" == $("#contactno").val() || a.test($("#contactno").val()) || !o.test($("#contactno").val())) && ($("#contactno").addClass("loginFormError1"), t = 1), ("" == $("#slState").val() || a.test($("#slState").val()) || "0" == $("#slState").val()) && ($("#slState").addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").addClass("loginFormError"), t = 1), $("#txtLocation").is(":visible") && ("" == $("#txtLocation").val() || a.test($("#txtLocation").val())) && ($("#txtLocation").addClass("loginFormError"), t = 1), $("#locationinput").is(":visible") && ("" == $("#locationinput").val() || a.test($("#locationinput").val())) && ($("#locationinput").addClass("loginFormError"), t = 1), ("" == $("#message").val() || a.test($("#message").val())) && ($("#message").addClass("loginFormError1"), t = 1), 0 != t) return !1;
    var r = "multidoor_campaign.php";
    return $.ajax({
        url: r,
        type: "POST",
        data: $("#enq-frm-prt").serialize(),
        success: function(t) {
            "success" == t ? ($("#msg_show").html('<span style="color:red !important; display: block; font-size: 13px; padding: 10px">Your Request has been successfully submitted.</span>'), $("#enq-frm-prt")[0].reset(), $("#msg_show").fadeOut(2e4)) : "fail" == t && ($("#msg_show").html('<span style="color: #880000 !important; display: block; font-size: 13px; padding: 10px">There is something issue while submitting your Request. Please try again later.</span>'), $("#enq-frm-prt")[0].reset(), $("#msg_show").fadeOut(2e4))
        }
    }), !1
}

function validateDoorOffer() {
    var t = 0,
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtName").val() || a.test($("#txtName").val()) || !isNaN($("#txtName").val())) && ($("#txtName").addClass("loginFormError"), t = 1), ("" == $("#capacity_id").val() || a.test($("#capacity_id").val())) && ($("#capacity_id").addClass("loginFormError"), t = 1), ("" == $("#sltype").val() || a.test($("#sltype").val()) || "0" == $("#sltype").val()) && ($("#sltype").addClass("loginFormError"), t = 1), "" == $("#sltype").val() || "Feedback" != $("#sltype").val() && "Know More" != $("#sltype").val() || (("" == $("#category").val() || a.test($("#category").val())) && ($("#category").addClass("loginFormError"), t = 1), ("" == $("#subcat").val() || a.test($("#subcat").val())) && ($("#subcat").addClass("loginFormError"), t = 1)), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").addClass("loginFormError"), t = 1), ("" == $("#txtPin").val() || a.test($("#txtPin").val())) && ($("#txtPin").addClass("loginFormError"), t = 1), "" != $("#txtPin").val() && isNaN($("#txtPin").val()) && ($("#txtPin").addClass("loginFormError"), t = 1), ("" == $("#txtAddress").val() || a.test($("#txtAddress").val())) && ($("#txtAddress").addClass("loginFormError"), t = 1), "" != $("#txtPhone").val() && o.test($("#txtPhone").val()) || ($("#txtPhone").addClass("loginFormError"), t = 1), "" == $("#txtPhone").val() || o.test($("#txtPhone").val()) || ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validatePtd() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtfName").val() || a.test($("#txtfName").val()) || !isNaN($("#txtfName").val())) && ($("#txtfName").addClass("loginFormError"), t = 1), ("" == $("#sub_cat").val() || a.test($("#sub_cat").val())) && ($("#sub_cat").addClass("loginFormError"), t = 1), ("" == $("#duration").val() || a.test($("#duration").val())) && ($("#duration").addClass("loginFormError"), t = 1), ("" == $("#txtAddress1").val() || a.test($("#txtAddress1").val())) && ($("#txtAddress1").addClass("loginFormError"), t = 1), "" != $("#txtZip").val() && isNaN($("#txtZip").val()) && ($("#txtZip").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateGnp() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtfName").val() || a.test($("#txtfName").val()) || !isNaN($("#txtfName").val())) && ($("#txtfName").addClass("loginFormError"), t = 1), ("" == $("#sub_cat").val() || 0 == $("#sub_cat").val() || a.test($("#sub_cat").val())) && ($("#sub_cat").addClass("loginFormError"), $("#sub_cat").parent().addClass("loginFormError"), t = 1), ("" == $("#model").val() || a.test($("#model").val())) && ($("#model").addClass("loginFormError"), $("#model").parent().addClass("loginFormError"), t = 1), ("" == $("#txtAddress1").val() || a.test($("#txtAddress1").val())) && ($("#txtAddress1").addClass("loginFormError"), t = 1), "" != $("#txtZip").val() && isNaN($("#txtZip").val()) && ($("#txtZip").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateRO() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtfName").val() || a.test($("#txtfName").val()) || !isNaN($("#txtfName").val())) && ($("#txtfName").addClass("loginFormError"), t = 1), ("" == $("#txtAddress").val() || a.test($("#txtAddress").val())) && ($("#txtAddress").addClass("loginFormError"), t = 1), ("" == $("#slState").val() || a.test($("#slState").val()) || "0" == $("#slState").val()) && ($("#slState").parent().addClass("loginFormError"), $("#slState").addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").parent().addClass("loginFormError"), $("#txtCity").addClass("loginFormError"), t = 1), $("#txtLocation").is(":visible") && ("" == $("#txtLocation").val() || a.test($("#txtLocation").val())) && ($("#txtLocation").addClass("loginFormError"), $("#txtLocation").parent().addClass("loginFormError"), t = 1), $("#locationinput").is(":visible") && ("" == $("#locationinput").val() || a.test($("#locationinput").val())) && ($("#locationinput").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#demo_request").val() || a.test($("#demo_request").val())) && ($("#demo_request").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function postBasedCategory(t) {
    if ("" != t) {
        var a = "ajax_job_search.php?",
            e = a + "job_cat_id=" + encodeURIComponent(t);
        jQuery.ajax({
            type: "POST",
            url: e,
            success: function(t) {
                document.getElementById("job_main_div").innerHTML = t, ssb.scrollbar("main_content"), $(".details").click(function(t) {
                    return $(".details#" + $(this).attr("rel")).toggle(), !1
                })
            }
        })
    }
}

function postBasedCategorySearch(t) {
    if ("" != t && "Search by Function" != t) {
        var a = "ajax_job_search.php?",
            e = a + "job_cat_id=" + encodeURIComponent(t);
        jQuery.ajax({
            type: "POST",
            url: e,
            success: function(t) {
                document.getElementById("job_main_div").innerHTML = t, $("#sljobState").each(function() {
                    $(this).wrap("<span class='select-wrapper'></span>"), $(this).after("<span class='holder'></span>")
                }), $("#sljobState").change(function() {
                    var t = $(this).find(":selected").text();
                    $(this).next(".holder").text(t)
                }).trigger("change"), $(".details").click(function(t) {
                    return $(".details#" + $(this).attr("rel")).toggle(), !1
                })
            }
        })
    }
}

function appliedSelected(t, a, e) {
    "" != t && ($("#position_applied").val(t), $("#txtPostionName").val(a)), "" != e && $("#applicant_job_cat_applied").val(e)
}

function validateJobApply() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    ("" == $("#txtfName").val() || a.test($("#txtfName").val()) || !isNaN($("#txtfName").val())) && ($("#txtfName").addClass("loginFormError"), t = 1), ("" == $("#txtlName").val() || a.test($("#txtlName").val()) || !isNaN($("#txtlName").val())) && ($("#txtlName").addClass("loginFormError"), t = 1), ("" == $("#sljobState").val() || a.test($("#sljobState").val())) && ($("#sljobState").addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").addClass("loginFormError"), t = 1), ("" == $("#position_applied").val() || a.test($("#position_applied").val())) && ($("#position_applied").addClass("loginFormError"), t = 1), ("" == $("#txtCv").val() || a.test($("#txtCv").val())) && ($("#txtCv").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1);
    var r = $("#txtCv").val();
    if ("" != r) {
        var s = new Array;
        s = r.split("\\");
        var n = s.length,
            l = s[n - 1],
            i = l.substring(l.lastIndexOf(".") + 1);
        "pdf" == i || "rtf" == i || "txt" == i || "docx" == i ? $("#txtCv").src = r : (alert("Invalid CV.Please Upload only(docx,txt,pdf,rtf) types."), $("#txtCv").val(""), $("#txtCv").addClass("loginFormError"), t = 1)
    }
    return 1 == t ? !1 : !0
}

function validateAC() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtfName").val() || a.test($("#txtfName").val()) || !isNaN($("#txtfName").val())) && ($("#txtfName").addClass("loginFormError"), t = 1), ("" == $("#slState").val() || a.test($("#slState").val()) || "0" == $("#slState").val()) && ($("#slState").parent().addClass("loginFormError"), t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val())) && ($("#txtCity").parent().addClass("loginFormError"), t = 1), $("#txtLocation").is(":visible") && ("" == $("#txtLocation").val() || a.test($("#txtLocation").val())) && ($("#txtLocation").parent().addClass("loginFormError"), t = 1), $("#locationinput").is(":visible") && ("" == $("#locationinput").val() || a.test($("#locationinput").val())) && ($("#locationinput").addClass("loginFormError"), t = 1), ("" == $("#txtComment").val() || a.test($("#txtComment").val())) && ($("#txtComment").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateBrochureEmail() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return ("" == $("#txtToEmail").val() || a.test($("#txtToEmail").val()) || !e.test($("#txtToEmail").val())) && ($("#txtToEmail").addClass("loginFormError"), t = 1), ("" == $("#txtName").val() || a.test($("#txtName").val())) && ($("#txtName").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateFriendEmail() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return ("" == $("#txtSubject").val() || a.test($("#txtSubject").val())) && ($("#txtSubject").addClass("loginFormError"), t = 1), ("" == $("#txtComment").val() || a.test($("#txtComment").val())) && ($("#txtComment").addClass("loginFormError"), t = 1), ("" == $("#txtToEmail").val() || a.test($("#txtToEmail").val()) || !e.test($("#txtToEmail").val())) && ($("#txtToEmail").addClass("loginFormError"), t = 1), ("" == $("#txtFromEmail").val() || a.test($("#txtFromEmail").val()) || !e.test($("#txtFromEmail").val())) && ($("#txtFromEmail").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function validateTestimonial() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (("" == $("#txtName").val() || a.test($("#txtName").val()) || "Name" == $("#txtName").val()) && ($("#txtName").addClass("loginFormError"), t = 1), ("" == $("#txtState").val() || a.test($("#txtState").val()) || "State" == $("#txtState").val()) && ($("#txtState").addClass("loginFormError"),
            t = 1), ("" == $("#txtCity").val() || a.test($("#txtCity").val()) || "City" == $("#txtCity").val()) && ($("#txtCity").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), ("" == $("#txtCategory").val() || a.test($("#txtCategory").val())) && ($("#txtCategory").addClass("loginFormError"), t = 1), ("" == $("#subcat").val() || a.test($("#subcat").val())) && ($("#subcat").addClass("loginFormError"), t = 1), ("" == $("#txtComment").val() || a.test($("#txtComment").val()) || "Comment" == $("#txtComment").val()) && ($("#txtComment").addClass("loginFormError"), t = 1), 0 != t) return !1;
    var o = "testimonial.php";
    return $.ajax({
        url: o,
        type: "POST",
        data: $("#testimonial").serialize(),
        success: function(t) {
            "success" == t ? ($("#msg_show").html('<span style="color: #70D070 !important; display: block; font-size: 13px; padding: 10px">Your Testimonial has been successfully submitted.</span>'), $("#testimonial")[0].reset(), $("#msg_show").fadeOut(8e3)) : "fail" == t && ($("#msg_show").html('<span style="color: #880000 !important; display: block; font-size: 13px; padding: 10px">There is something issue while submitting your Testimonial. Please try again later.</span>'), $("#testimonial")[0].reset(), $("#msg_show").fadeOut(8e3))
        }
    }), !1
}

function validateFeedback() {
    var t = "",
        a = /^[\s]+$/,
        e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        o = /(\+91-?|0)?\d{10}/;
    return ("" == $("#txtName").val() || a.test($("#txtName").val()) || !isNaN($("#txtName").val())) && ($("#txtName").addClass("loginFormError"), t = 1), ("" == $("#category").val() || a.test($("#category").val())) && ($("#category").addClass("loginFormError"), t = 1), ("" == $("#subcat").val() || a.test($("#subcat").val())) && ($("#subcat").addClass("loginFormError"), t = 1), ("" == $("#txtPhone").val() || a.test($("#txtPhone").val()) || !o.test($("#txtPhone").val())) && ($("#txtPhone").addClass("loginFormError"), t = 1), ("" == $("#txtEmail").val() || a.test($("#txtEmail").val()) || !e.test($("#txtEmail").val())) && ($("#txtEmail").addClass("loginFormError"), t = 1), ("" == $("#txtComment").val() || a.test($("#txtComment").val())) && ($("#txtComment").addClass("loginFormError"), t = 1), 1 == t ? !1 : !0
}

function compareBoxLoad(t) {
    if ("" != t) {
        var a = "ajax_add_to_compare.php?",
            e = a + "product_id=" + encodeURIComponent(t);
        jQuery.ajax({
            type: "GET",
            url: e,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(t) {
                document.getElementById("imageBox").innerHTML = t.image, document.getElementById("pricePtag").innerHTML = t.price, document.getElementById("keyFeatureDiv").innerHTML = t.features, document.getElementById("prod_id").value = t.id
            }
        })
    }
}

function addProductIntoCompare(t, a) {
    "" == a || "" == t || isNaN(a) || isNaN(t) || (compare.add(a, t), window.location.reload(!0))
}

function add_compare(t, a) {
    var e = compare.get(t).length;
    8 > e ? "" == a || "" == t || isNaN(a) || isNaN(t) || (compare.add(a, t), e = compare.get(t).length, document.getElementById("compare_li_" + a).innerHTML = '<a href="javascript:void(0);" onclick="remove_compare(' + t + "," + a + ');" title="remove from Compare"><i><img alt="Compare" src="images/compare-icon.png"></i><strong>Remove Compare</strong></a>', document.getElementById("compare_mainbutton").innerHTML = "Compare (" + e + ")", document.getElementById("compare_mainbutton_end").innerHTML = "Compare (" + e + ")") : alert("Compare Box is full.You have to remove one before you add another product.")
}

function remove_compare(t, a) {
    var e = compare.get(t).length;
    e > 0 && ("" == a || "" == t || isNaN(a) || isNaN(t) || (compare.remove(a, t), e = compare.get(t).length, document.getElementById("compare_li_" + a).innerHTML = '<a href="javascript:void(0);" onclick="add_compare(' + t + "," + a + ');" title="Compare" class=""><i><img alt="Compare" src="images/compare-icon.png"></i><strong>Compare</strong></a>', document.getElementById("compare_mainbutton").innerHTML = "Compare (" + e + ")", document.getElementById("compare_mainbutton_end").innerHTML = "Compare (" + e + ")"))
}

function removeProduct(t, a) {
    "" == t || "" == a || isNaN(t) || isNaN(a) || (compare.remove(t, a), window.location.reload(!0))
}

function removeAllProducts(t) {
    "" == t || isNaN(t) || (compare.empty(t), window.location.reload(!0))
}
var compare = {
    CARTS: "COMPARE_PRODUCT",
    get: function(t) {
        var a = this.ObjGet()[t];
        if (a)
            for (var e = a.length; e--;) "" == a[e] && a.splice(e, 1);
        else a = [];
        return a
    },
    add: function(t, a, e) {
        var o = this.get(a);
        if (0 == $.inArray(t, o)) return alert("Already add in compare box"), !1;
        null == e ? o.unshift(t) : o.splice($.inArray(e, o), 1, t);
        var r = this.ObjGet();
        r[a] = o, this.ObjSet(r)
    },
    remove: function(t, a) {
        for (var e = this.ObjGet(), o = this.get(a), r = o.length; r--;) o[r] == t && o.splice(r, 1);
        e[a] = o, this.ObjSet(e)
    },
    isin: function(t, a) {
        for (var e = (this.ObjGet(), this.get(a)), o = e.length; o--;)
            if (e[o] == t) return !0;
        return !1
    },
    empty: function(t) {
        var a = this.ObjGet();
        delete a[t], this.ObjSet(a)
    },
    count: function(t) {
        return this.get(t).length
    },
    ObjGet: function() {
        var t, a = {},
            e = this.cookieGet(this.CARTS);
        t = e ? e.split(",") : [];
        for (var o in t) {
            var r = t[o];
            a[r.split("=")[0]] = r.split("=")[1].split("|")
        }
        return a
    },
    ObjSet: function(t) {
        var a = [];
        for (var e in t) {
            var o = t[e];
            a.push(e + "=" + o.join("|"))
        }
        this.cookieSet(this.CARTS, a.join(","))
    },
    cookieSet: function(t, a, e) {
        if (e) {
            var o = new Date;
            o.setTime(o.getTime() + 24 * e * 60 * 60 * 1e3);
            var r = "; expires=" + o.toGMTString()
        } else var r = "";
        document.cookie = t + "=" + a + r + "; path=/;"
    },
    cookieGet: function(t) {
        for (var a = t + "=", e = document.cookie.split(";"), o = 0; o < e.length; o++) {
            for (var r = e[o];
                " " == r.charAt(0);) r = r.substring(1, r.length);
            if (0 == r.indexOf(a)) return r.substring(a.length, r.length)
        }
        return null
    },
    _cDel: function(t) {
        this.set(t, "", -1)
    }
};