var rangeEl = $(".sliderange");
function isOlderEdgeOrIE() {
  return (
    window.navigator.userAgent.indexOf("MSIE ") > -1 ||
    !!navigator.userAgent.match(/Trident.*rv\:11\./) ||
    window.navigator.userAgent.indexOf("Edge") > -1
  );
}
function valueTotalRatio(value, min, max) {
  return ((value - min) / (max - min)).toFixed(2);
}
function getLinearGradientCSS(ratio, leftColor, rightColor) {
  return [
    "-webkit-gradient(",
    "linear, ",
    "left top, ",
    "right top, ",
    "color-stop(" + ratio + ", " + leftColor + "), ",
    "color-stop(" + ratio + ", " + rightColor + ")",
    ")",
  ].join("");
}

function updateRangeEl(rangeEl) {
  $(rangeEl).each((i, item) => {
    var ratio = valueTotalRatio(item.value, item.min, item.max);
    item.style.backgroundImage = getLinearGradientCSS(
      ratio,
      "#004595",
      "#E6E6E6"
    );
    if (ratio < 1) {
      ratio = ratio.split(".")[1];
    } else {
      ratio = 95;
      console.log(ratio);
    }
    $(item).parent().find(".tooltipslider").css("left", `${ratio}%`);
  });
}

$(".sliderange").each((i, item) => {
  $(item).hover(
    function () {
      $(this).parent().find(".tooltipslider").css("opacity", 1);
    },
    function () {
      $(this).parent().find(".tooltipslider").css("opacity", 0);
    }
  );
});

function initRangeEl() {
  if (isOlderEdgeOrIE()) {
    $(rangeEl).on("change", function (e) {
      textEl.value = e.target.value;
    });
    $(rangeEl).on("input", function (e) {
      textEl.value = e.target.value;
    });
  } else {
    updateRangeEl(rangeEl);
    $(rangeEl).on("input", function (e) {
      updateRangeEl(e.target);
      $(this).closest(".slider").find(".rangevalue").val(e.target.value);
      $(this).closest(".slider").find(".tooltipslider").text(e.target.value);
    });
  }
}

initRangeEl();
