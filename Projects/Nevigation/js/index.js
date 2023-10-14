// On click on main menu second menu will open
$(".mainMenuLink").on("click", (e) => {
  $.each($(".fSubMenu"), function (key, val) {
    $(val).removeClass("active");
  });
  let clickedMainMenuLink = e.currentTarget;
  $(clickedMainMenuLink).children(".fSubMenu").addClass("active");
});

// to toLowerCase the element
function convertToLowercase(value) {
  return value.replaceAll(" ", "-").toLowerCase();
}

// Add Data attribute to all li and if we have next level so create arrow for thar Element
function addDataAttrAndArrowToElem() {
  $.each($(".MobileNavigation ul li a"), (ind, value) => {
    $(value)
      .parent("li")
      .attr("data-className", convertToLowercase(value.innerText));
    let allLiClassName = $(value).parent("li").attr("data-className");
    if ($(`.${allLiClassName}`).length > 0) {
      $(value).after("<div class='rightSideArrow'></div>");
    }
  });
}
addDataAttrAndArrowToElem();

// Create a breadcrumbLink
function createBreadcrumb(breadcrumbLink) {
  let removeArrowFromLi = $(breadcrumbLink).find(".rightSideArrow");
  if (removeArrowFromLi.length > 0) {
    let dataAttr = $(breadcrumbLink).attr("data-className");
    $(".bredCrumb").append(
      `<span class="BredLinks" data-searchClass="${dataAttr}">${dataAttr.replaceAll(
        "-",
        " "
      )}</span>`
    );
  }
}

// click of navLinks open next level
$(".MobileNavigation ul li").on("click", (e) => {
  let currentTargetLink = e.currentTarget;
  createBreadcrumb(currentTargetLink);
  let clickedLinkClassName = $(currentTargetLink).attr("data-className");
  let topMostParent = $(`.${clickedLinkClassName}`).closest(
    ".MobileNavigation"
  );
  $(topMostParent).find(".activeLevel").removeClass("activeLevel");
  $(`.${clickedLinkClassName}`).parent().addClass("activeLevel");
});

$(".bredCrumb").bind("click", ".BredLinks", function (e) {
  let targetClassName = $(e.target).attr("data-searchClass");
  $(e.target).nextAll().remove();
  $(".MobileNavigation").find(".activeLevel").removeClass("activeLevel");
  $.each($(".MobileNavigation ul li"), (ind, val) => {
    if ($(val).attr("data-className") === targetClassName) {
      $(val).parent().parent().addClass("activeLevel");
    }
  });
  $(e.target).remove();
});

// on click of hamburger open menu and
$(".hamburger").on("click", () => {
  $(".firstLavelMobMune").addClass("activeLevel");
  $(".close").show();
  $(".hamburger").hide();
});
// close navigation menu
$(".close").on("click", () => {
  $(".MobileNavigation").find(".activeLevel").removeClass("activeLevel");
  $(".hamburger").show();
  $(".close").hide();
  $(".bredCrumb").html("");
});
