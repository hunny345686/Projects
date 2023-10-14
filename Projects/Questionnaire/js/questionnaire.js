$(".questionnaire-btn").on("click", (e) => {
  $(e.currentTarget).closest(".questionnaire");
  let allParentDivs = $(e.currentTarget).closest(".questionnaire-inner");
  userSelectOption = $(allParentDivs)
    .find(".ans-div input[type='radio']:checked")
    .val();
  $(allParentDivs)
    .find(".selectAndEdit")
    .html(
      `<p class="result">${userSelectOption} </p> <img class= "editBtn"src="./img/editIcon.png" alt="">`
    );
  $(allParentDivs).removeClass("active");
  $(allParentDivs).addClass("done");
  $(allParentDivs).next().addClass("active");
});

$(".selectAndEdit").on("click", ".editBtn", function (e) {
  $(this).closest(".questionnaire-inner").removeClass("done");
  $(this)
    .closest(".questionnaire")
    .find(".questionnaire-inner.active")
    .removeClass("active");
  $(this).closest(".questionnaire-inner").addClass("active");
});
