// Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBZy7GTKn62CqeXAgm2fLrXI67P4Lc4Q3M",
    authDomain: "taxi-15314.firebaseapp.com",
    databaseURL: "https://taxi-15314-default-rtdb.firebaseio.com/",
    projectId: "taxi-15314"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// إظهار الصفحات
function showRegister() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

// إنشاء حساب
function register() {
    let phone = regPhone.value.trim();
    let pass = regPassword.value.trim();
    let type = regType.value;

    if (!phone || !pass) return alert("أدخل البيانات");

    db.ref("users/" + phone).set({
        phone: phone,
        password: pass,
        type: type,
        banned: false
    }).then(() => {

        // حفظ الجلسة
        localStorage.setItem("phone", phone);
        localStorage.setItem("userType", type);

        if (type === "driver") window.location.href = "driver.html";
        else window.location.href = "rider.html";
    });
}

// تسجيل الدخول
function login() {
    let phone = loginPhone.value.trim();
    let pass = loginPassword.value.trim();

    if (!phone || !pass) return alert("أدخل البيانات");

    db.ref("users/" + phone).once("value").then(snap => {
        if (!snap.exists()) return alert("الحساب غير موجود");

        let u = snap.val();

        if (u.password !== pass) return alert("كلمة المرور خطأ");
        if (u.banned) return alert("الحساب محظور");

        // حفظ الجلسة ومنع الخروج
        localStorage.setItem("phone", phone);
        localStorage.setItem("userType", u.type);

        if (u.type === "driver") window.location.href = "driver.html";
        else window.location.href = "rider.html";
    });
}