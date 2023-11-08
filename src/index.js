const navigation = document.getElementById("navigation");
const navToggle = document.getElementById("mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = navigation.getAttribute("data-visible");
  console.log(visibility);

  if (visibility === "false") {
    navigation.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    navigation.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});
