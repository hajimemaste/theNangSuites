const btnDropdown = document.querySelectorAll(
  ".hotel__main-container-rooms-row-heading"
);
const dropDown = document.querySelectorAll(
  ".hotel__main-container-rooms-dropdown"
);
const btnDropdown2 = document.querySelectorAll(
  ".hotel__main-container-facilities-row-heading"
);
const dropDown2 = document.querySelectorAll(
  ".hotel__main-container-facilities-dropdown"
);
const scroolLogo = document.querySelector(".hotel__logo-img");
const time = document.querySelector(".hotel__main-time-text-time");
const numMenu = document.querySelectorAll(".hotel__main-container-type");
const menuItems = document.querySelectorAll(".hotel__main-container-type");
const temperature = document.querySelector(".hotel__main-time-text-c");
const hdMobi = document.querySelectorAll(".aos-init");
const btnMobile = document.querySelector(".hotel__header-mobi i");
const menuMobile = document.querySelector(".hotel__header-mobi-menu");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`
  )
    .then((res) => res.json())
    .then((data) => {
      temperature.innerHTML = `${data.current_weather.temperature.toFixed(
        0
      )}°C`;
    })
    .catch((error) => console.error(error));
}

menuItems.forEach(function (menuItem) {
  var targetId = menuItem.getAttribute("data-id");
  var targetSection = document.getElementById(targetId);

  new Waypoint({
    element: targetSection,
    handler: function () {
      menuItems.forEach(function (item) {
        item.classList.remove("active");
      });
      menuItem.classList.add("active");
    },
    offset: "10%",
  });
});

numMenu[0].classList.add("active");

for (let i = 0; i < numMenu.length; i++) {
  numMenu[i].addEventListener("click", function () {
    for (let i = 0; i < numMenu.length; i++) {
      numMenu[i].classList.remove("active");
    }
    numMenu[i].classList.add("active");
  });
}

for (let i = 0; i < btnDropdown.length; i++) {
  btnDropdown[i].addEventListener("click", function () {
    dropDown[i].classList.toggle("show");
  });
}

for (let i = 0; i < btnDropdown.length; i++) {
  if (btnDropdown2[i]) {
    btnDropdown2[i].addEventListener("click", function () {
      dropDown2[i].classList.toggle("show");
    });
  }
}

btnMobile.addEventListener("click", function () {
  menuMobile.classList.toggle("show");
});

menuMobile.addEventListener("click", function () {
  menuMobile.classList.remove("show");
});

window.onscroll = () => {
  window.scrollY >= 2200
    ? scroolLogo.classList.add("scroll")
    : scroolLogo.classList.remove("scroll");
};

function Time() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();

  time.innerHTML = `
  ${hour}:${minute < 10 ? "0" + minute : minute} &#8226;`;

  setTimeout(Time, 1000);
}

Time();

$(".hotel__main-container-rooms-list-img").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
});
