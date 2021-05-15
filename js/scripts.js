$(document).ready(function() {
  window.possible_words = [
    ["Eden", "Grădina în care au fost așezați Adam și Eva"],
    ["Ararat", "Munții unde s-a oprit arca lui Noe"],
    ["Ninive", "Zidită de Nimrod"],
    ["Babel", "Aici a încurcat Domnul limba întregului pământ"],
    ["Ur, Caldeea", "Haran s-a născut și a murit aici"],
    ["Sodoma", "Îngerii Domnului l-au găsit pe Lot stând la poarta acestei cetăți"],
    ["Țoar", "Lot a fugit din Sodoma ca să-și scape viața aici"],
    ["Gherar", "Avraam a trecut pe aici, iar împărat era Abimelec"],
    ["Beer-Șeba", "Înseamnă Fântâna jurământului; aici Avraam și Abimelec și-au jurat credință"],
    ["Iehova-Iire", "Înseamnă Domnul va purta de grijă; aici a fost adus Isaac pentru jertfire"],
    ["Chiriat-Arba", "Sara a murit la Hebron, care se mai numește și"],
    ["Macpela", "peștera în care a fost îngropată Sara, soția lui Avraam"],
    ["Padan-Aram", "Laban locuia aici când Iacov a fugit în Mesopotamia"],
    ["Mahanaim", "Înseamnă „Tabără îndoită” - aici l-au întâlnit îngerii lui Dumnezeu pe Iacov"],
    ["Peniel", "Înseamnă „Fața lui Dumnezeu” - aici Iacov a avut o luptă de dus"],
    ["Sucot", "Înseamnă „Colibe” - Iacov a trecut pe aici"],
  ];
  window.game_is_finished = false;
  window.hint = "";
  window.word = "";


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  function get_random_definition() {
    var random_number = Math.floor(Math.random() * possible_words.length);
    var selected_word = possible_words[random_number];
    return selected_word;
  }


  function choose_word() {
    var selected_word = get_random_definition();
    window.word = selected_word[0];
    window.hint = selected_word[1];
  }


  function choose_answers() {
    var answers = [];
    answers.push([window.word, window.hint]);

    while (answers.length <= 4) {
      var new_answer = get_random_definition();

      var exists = false;
      for (var j = 0; j < answers.length; j++) {
        if (answers[j][0] == new_answer[0] || answers[j][1] == new_answer[1]) {
          exists = true;
        }
      }

      if (!exists) {
        answers.push(new_answer);
      }
    }

    var randomized_answers = shuffle(answers);
    for (var i = 0; i < randomized_answers.length; i++) {
      $("p.controls").append(
        "<a href='#' class='btn btn-warning btn-answer'>" + randomized_answers[i][0].toUpperCase() + "</a>"
      );
    }
  }


  function game_over() {
    $("p#status").text("Răspuns corect: " + window.word.toUpperCase());
    game_is_finished = true;
  }


  function win() {
    $("p#status").text("Felicitări!");
    $("p#status").css({"background": "#2ecc71"});
    game_is_finished = true;
  }


  function filename(word) {
    var filenames = {
      "lazăr": "lazar"
    }
    var res = filenames[word];
    if (res == undefined) {
      return word;
    } else {
      return res;
    }
  }


  function start_game() {
    choose_word();
    choose_answers();

    $("a.btn.btn-answer").on("click", function(evt) {
      evt.preventDefault();
      var answer = $(this).text();
      if (answer == window.word.toUpperCase()) {
        $(this).removeClass("btn-warning").addClass("btn-success");
        win();
      } else {
        $(this).removeClass("btn-warning").addClass("btn-danger");
      }
    });

    $("p#status").text(window.hint);
  }

  $("a#app-info-details").on("click", function(evt) {
    evt.preventDefault();
    $("div.app-info-details").toggle();
  });

  start_game();
});
