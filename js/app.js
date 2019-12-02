import "../scss/main.scss";
document.addEventListener("DOMContentLoaded", function() {
  // kliknięcie na button strony głównej i przejscie do menu głównego
  const startBtn = document.querySelector(".start-btn");
  const start = document.querySelector(".start");
  const menu = document.querySelector(".menu");
  startBtn.addEventListener("click", function() {
    start.style.display = "none";
    menu.style.display = "flex";
  });

  // wejscie do sekcji tablic
  const kana = document.querySelector(".kana");
  const menuTable = document.querySelector(".menu_table");
  menuTable.addEventListener("click", function() {
    menu.style.display = "none";
    kana.style.display = "flex";
  });

  // akcja na kliknięcie w button hiragany i atakany

  const kanaBtns = $(".hiragana, .katakana");
  kanaBtns.on("click", function(e) {
    const kanaClass = $(e.target).attr("class");

    function loadKana() {
      $.ajax("http://localhost:3000/kana")
        .done(function(resp) {
          renderKana(resp);
        })
        .fail(function(err) {
          console.log(err);
        });
    }

    loadKana();
    // ladowanie tablicy
    function renderKana(kanas) {
      const hiraganaTable = $(".hiragana-table");
      const katakanaTable = $(".katakana-table");
      kanas.forEach(function(kana) {
        if (kanaClass === "hiragana") {
          hiraganaTable.append(
            $(
              `<div class="hiragana-box"><p>${kana.hiragana}</p><p>${kana.meaning}</p></div>`
            )
          );
          hiraganaTable
            .find(".hiragana-box p:first-child")
            .addClass("showCharacter");
          katakanaTable.css("display", "none");
          hiraganaTable.css("display", "flex");
        }

        if (kanaClass === "katakana") {
          katakanaTable.append(
            $(
              `<div class="katakana-box"><p>${kana.katakana}</p><p>${kana.meaning}</p></div>`
            )
          );
          katakanaTable
            .find(".katakana-box p:first-child")
            .addClass("showCharacter");

          hiraganaTable.css("display", "none");
          katakanaTable.css("display", "flex");
        }
      });
    }

    //usunięcie znaków, aby podczas kolejnego kliknięcia nie dublowały się

    $(".hiragana-table")
      .children()
      .remove();

    $(".katakana-table")
      .children()
      .remove();
  });

  //przycisk powrotu do menu glownego i czyszczenie tabel ze znaków

  const goBack = document.querySelector(".kana-back");
  goBack.addEventListener("click", function() {
    menu.style.display = "flex";
    kana.style.display = "none";
    $(".hiragana-box").detach();
    $(".katakana-box").detach();
  });

  //wejscie do okna wyboru fiszek

  const flash = document.querySelector(".menu_flash");
  const choiceWindow = document.querySelector(".choice");
  flash.addEventListener("click", function() {
    choiceWindow.style.display = "flex";
  });

  //wejscie do fiszek wlasciwych

  const kanaFlash = document.querySelector(".kana-flash");
  const choiceStartBtn = document.querySelector(".choice-start");
  const hiraganaCards = document.querySelector(".hiragana-cards");
  const katakanaCards = document.querySelector(".katakana-cards");
  const kanaInputs = document.querySelectorAll("#choice1, #choice2");
  for (let i = 0; i < kanaInputs.length; i++) {
    const singleEl = kanaInputs[i];
    singleEl.addEventListener("change", function() {
      choiceStartBtn.addEventListener("click", function() {
        if (kanaInputs[0].checked) {
          hiraganaCards.style.display = "flex";
        } else if (kanaInputs[1].checked) {
          katakanaCards.style.display = "flex";
        }
        kanaFlash.style.display = "flex";
        choiceWindow.style.display = "none";
        menu.style.display = "none";
      });
    });
  }

  //wejscie do ookna wyboru quizu

  const quiz = document.querySelector(".menu_quiz");
  const quizChoiceWindow = document.querySelector(".quiz-choice");
  quiz.addEventListener("click", function() {
    quizChoiceWindow.style.display = "flex";
  });

  // wejscie do quizu

  //wyjsce z quizu result do menu głównego

  //wyjscie z  quizu

  //czyszczenie buttona z disable, inputa z wartosci i przywracanie starych table
  // wrzucenie znakow do diva o klasie kana-place
  // const quizButton = $(".quiz-start"); //przycisk wylaczajacy diva choice
  const kanaPlace = $(".kana-place"); //miejsce wrzucenia znaku
  const inputQuiz = $("#kana-name"); //input do wpisania nazwy
  const wrongAnswers = $(".wrong"); //miejsce na zle odpowiedzi
  const correctAnswers = $(".correct"); //miejsce na dobre odpowiedzi
  const kanaNumber = $(".kana-id"); //kolejny numer wylosowanego znaku
  const isCorrect = $(".isCorrect");
  // div z koncowymi wynikami
  const nextArrow = $(".quiz-container")
    .children("span")
    .eq(0); //strzalka kolejnosci w prawo
  loadKana1();
  ///////////////////////////////////////////////////
  function renderKanaQuiz(characters) {
    const quizStartBtn = document.querySelector(".quiz-start");

    const kanaQuiz = document.querySelector(".kana-quiz");
    const hiraganaQuiz = document.querySelector(".hiragana-quiz");
    const katakanaQuiz = document.querySelector(".katakana-quiz");
    const quizInputs = document.querySelectorAll("#choice3, #choice4");

    for (let i = 0; i < kanaInputs.length; i++) {
      const singleEl = quizInputs[i];
      singleEl.addEventListener("change", function() {
        quizStartBtn.addEventListener("click", function() {
          if ($(".kana-place").children().length > 0) {
            $(".kana-place")
              .children()
              .hide();
            kanaPlace.append($(`<p>${randomKana[0].hiragana}</p>`));
          }

          $(".isCorrect").removeAttr("disabled");
          $(".kana-place");
          if (quizInputs[0].checked) {
            hiraganaQuiz.style.display = "flex";
          } else if (quizInputs[1].checked) {
            katakanaQuiz.style.display = "flex";
          }
          kanaQuiz.style.display = "flex";
          quizChoiceWindow.style.display = "none";
          menu.style.display = "none";
          correctAnswers.text("0");
          wrongAnswers.text("0");
          const numberCharacterId = document.querySelector(".kana-id");
          let primeNumber = 1;
          numberCharacterId.innerText = `${primeNumber}`;
        });
      });
    }

    const charactersArray = characters;
    const failArray = [];
    const correctArray = [];
    // zmiksowanie kolejnosci tablicy!
    let randomKana = charactersArray
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
    correctAnswers.text(correctArray.length);
    wrongAnswers.text(failArray.length);

    // console.log(correctAnswers);
    // console.log(correctArray.length);
    kanaPlace.append($(`<p>${randomKana[0].hiragana}</p>`));
    kanaNumber.text("1");
    isCorrect.on("click", function() {
      if (inputQuiz.val() === randomKana[0].meaning) {
        kanaPlace.children("p").addClass("correctAnswear");
        console.log("prawidlowo!");
        console.log(randomKana);
        isCorrect.attr("disabled", "true");
        correctArray.push(randomKana.splice(0, 1));
        console.log(correctArray);
      } else if (inputQuiz.val() !== randomKana[0].meaning) {
        kanaPlace.children("p").addClass("wrongAnswear");
        isCorrect.attr("disabled", "true");
        failArray.push(randomKana.splice(0, 1));
      }
      inputQuiz.val("");
      // isCorrect.removeAttr("disabled");
      correctAnswers.text(correctArray.length);
      wrongAnswers.text(failArray.length);

      const kanaQuizResults = $(".quiz-result");
      const correctResult = $(".correct-result");
      if (randomKana.length === 43) {
        //tu ma się pojawic wynik mojego quizu!
        kanaQuiz.style.display = "none";
        kanaQuizResults.css("display", "flex");
        correctResult.text(correctArray.length);
      }
    });
    let number = 1;
    nextArrow.on("click", function() {
      $(".kana-place")
        .children("p")
        .removeClass("wrongAnswear");
      $(".kana-place")
        .children("p")
        .removeClass("correctAnswear");
      number = 1;
      number = number + 1;
      isCorrect.removeAttr("disabled");
      kanaPlace.find("p").text(`${randomKana[0].hiragana}`);
      kanaNumber.text(number);
    });

    //przycisk powrotu do menu glownego z quizu
    const quizBack = $(".quiz-back-menu");
    quizBack.on("click", function() {
      $(".kana-place")
        .children("p")
        .removeClass("wrongAnswear");
      $(".kana-place")
        .children("p")
        .removeClass("correctAnswear");
      $(this)
        .parent()
        .parent()
        .parent()
        .css("display", "none");
      menu.style.display = "flex";
      // console.log(randomKana.length);
      if (correctArray.length > 0) {
        randomKana.push(correctArray.splice(0, correctArray.length));
      }

      if (failArray.length > 0) {
        randomKana.push(failArray.splice(0, failArray.length));
      }
      console.log(failArray);
      console.log(correctArray);
      console.log(randomKana.length);
      if ($(".kana-place").children().length > 0) {
        $(".kana-place")
          .children()
          .hide();
        kanaPlace.append($(`<p>${randomKana[0].hiragana}</p>`));
      }
    });
    const resultsBack = $(".back-result");
    resultsBack.on("click", function() {
      $(".kana-place")
        .children("p")
        .removeClass("wrongAnswear");
      $(".kana-place")
        .children("p")
        .removeClass("correctAnswear");
      $(this)
        .parent()
        .parent()
        .css("display", "none");
      menu.style.display = "flex";
      if (correctArray.length > 0) {
        randomKana.push(correctArray.splice(0, correctArray.length));
      }

      if (failArray.length > 0) {
        randomKana.push(failArray.splice(0, failArray.length));
      }

      // console.log(correctArray.length);
      // console.log(failArray.length);
      console.log(failArray);
      console.log(correctArray);
      console.log(randomKana.length);
    });
  }

  function loadKana1() {
    $.ajax("http://localhost:3000/kana")
      .done(function(resp) {
        renderKanaQuiz(resp);
      })
      .fail(function(err) {
        console.log(err);
      });
  }
});
