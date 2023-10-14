$(".cus-select-option").each(function (ind, dropdowns) {
  let selectOption = $(dropdowns).find("option");
  let html = `<div class="custom-select"><span>Choose One</span><ul>
  ${[...selectOption].map(
    (item) => `<li data-value="${$(item).val()}">${item.innerText}</li>`
  )}</ul></div>`;
  let convertedHtml = html.replaceAll(",", "");
  $(convertedHtml).insertAfter($(dropdowns));
});

$(".custom-select").each(function (ind, select) {
  const selectTrigger = $(select).find("span");
  const options = $(select).find("li");
  $(selectTrigger).on("click", function () {
    $(select).toggleClass("open");
    let alphabeticKeyPresses = [];
    $(document).on("keyup", function (event) {
      let keyPressed = event.key;
      if ($(select).hasClass("open")) {
        setTimeout(() => {
          if (/^[a-zA-Z0-9]$/.test(keyPressed)) {
            alphabeticKeyPresses.push(keyPressed);
            let searchText = alphabeticKeyPresses
              .toString()
              .replaceAll(",", "")
              .toLocaleLowerCase();
            console.log(searchText);
            let mapresult = [...options].filter((data) => {
              $(data).removeClass("active");
              return data.innerText.toLocaleLowerCase().includes(searchText);
            });
            if (mapresult[0]) {
              mapresult[0].classList.add("active");
              mapresult[0].scrollIntoView({ behavior: "smooth" });
            } else {
              return false;
            }
          }
        }, 1000);
        alphabeticKeyPresses = [];
        if (event.which == 13) {
          let activeValue = $(select).find(".active").text();
          if (activeValue) {
            $(selectTrigger).text(activeValue);
            $(select).removeClass("open");
          }
        }
      }
    });
  });
  $(document).on("click", (event) => {
    if (!select.contains(event.target)) {
      $(select).removeClass("open");
    }
  });
  $(options).on("click", function () {
    $(selectTrigger).text(this.textContent);
    $(options).each((i, v) => {
      $(v).removeClass("active");
    });
    $(this).addClass("active");
    $(select).removeClass("open");
  });
});
