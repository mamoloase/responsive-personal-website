const serviceModals = document.querySelectorAll(".service-modal");
const leanMoreButton = document.querySelectorAll(".learn-more");
const modelCloseButton = document.querySelectorAll(".close-service-modal");

function modal(modal_click) {
    serviceModals[modal_click].classList.add("active");
};
leanMoreButton.forEach((learnMoreBtn, i) => {
    learnMoreBtn.addEventListener("click", () => {
        modal(i);
    })
});
modelCloseButton.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener("click", () => {
        serviceModals.forEach(modalView => {
            modalView.classList.remove("active")
        });
    });
})

const navigation = document.querySelector(".navigation");
const openNavigationButton = document.querySelector(".open-navigatin");
const closeNavigationButton = document.querySelector(".close-navbar-menu");
openNavigationButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
});

closeNavigationButton.addEventListener("click", () => {
    navigation.classList.remove("active");
});

const navigationItems = document.querySelectorAll(".navigation-item");
navigationItems.forEach(item => {
    item.addEventListener("click", () => {
        navigation.classList.remove("active");
    })
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};

const scrollButton = document.querySelector(".scroll-up-button");

window.onscroll = function () {

    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)
        scrollButton.style.display = "flex";
    else
        scrollButton.style.display = "none";
};

scrollButton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

const setting_window = document.querySelector(".setting");
const setting_open_btn = document.querySelector(".setting-button");
const setting_close_btn = document.querySelector(".setting-window-close");

setting_close_btn.addEventListener('click', () => {
    setting_window.classList.remove("active")
})
setting_open_btn.addEventListener('click', () => {
    setting_window.classList.add("active")
})


function change_submit_btn(status) {
    var submit_contact_btn = document.querySelector(".contact-result");
    if (status) {
        submit_contact_btn.classList.add("success");
        submit_contact_btn.innerHTML = "Message sent successfully";
    }
    else {
        submit_contact_btn.classList.add("danger");
        submit_contact_btn.innerHTML = "Can not send message .please try again ...";
    }
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()

    const url = '/';
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200)
                change_submit_btn(true);
            else
                change_submit_btn(false)
        }
    };
    xhr.send(JSON.stringify(data));
});

function setTheme(theme) {
    const root = document.querySelector(':root');
    switch (theme) {
        case "orange":
            localStorage.setItem("theme", "orange");
            root.style.setProperty("--theme", 14);
            break;
        case "green":
            localStorage.setItem("theme", "green");
            root.style.setProperty("--theme", 122);
            break;
        case "blue":
            localStorage.setItem("theme", "blue");
            root.style.setProperty("--theme", 221);
            break;
        case "purple":
            localStorage.setItem("theme", "purple");
            root.style.setProperty("--theme", 267);
            break;
        case "yellow":
            localStorage.setItem("theme", "yellow");
            root.style.setProperty("--theme", 49);
            break;
        case "red":
            localStorage.setItem("theme", "red");
            root.style.setProperty("--theme", 5);
            break;

        default:
            break;
    }
}
function setMode(theme) {
    switch (theme) {
        case "dark":
            localStorage.setItem("mode", theme);
            document.documentElement.className = "dark-theme";
            break;
        case "light":
            localStorage.setItem("mode", theme);
            document.documentElement.className = "light-theme";
            break;

        default:
            break;
    }
}
(function () {
    var get_mode = localStorage.getItem('mode');
    var get_theme = localStorage.getItem('theme');

    setMode(get_mode);
    setTheme(get_theme);
})();