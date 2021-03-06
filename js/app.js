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

  // akcja na kliknięcie w button hiragany i katakany  => długa funkcja
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

  //wejscie do okna wyboru fiszek -- DO SKONCZENIA

  const flash = document.querySelector(".menu_flash");
  const choiceWindow = document.querySelector(".choice");
  flash.addEventListener("click", function() {
    choiceWindow.style.display = "flex";
  });

  //wejscie do fiszek wlasciwych --DO SKONCZENIA

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

  //wyjście z fiszek

  const flashBack = document.querySelector(".flash-back-menu");
  flashBack.addEventListener("click", function() {
    menu.style.display = "flex";
    kanaFlash.style.display = "none";
  });

  //wejscie do ookna wyboru quizu

  const quiz = document.querySelector(".menu_quiz");
  const quizChoiceWindow = document.querySelector(".quiz-choice");
  quiz.addEventListener("click", function() {
    quizChoiceWindow.style.display = "flex";
  });

  //czyszczenie buttona z disable, inputa z wartosci i przywracanie starych table
  const kanaPlace = $(".kana-place"); //miejsce wyswietlenia znaku
  const wrongAnswers = $(".wrong"); //miejsce na zle odpowiedzi
  const correctAnswers = $(".correct"); //miejsce na dobre odpowiedzi
  const kanaNumber = $(".kana-id"); //kolejny numer wylosowanego znaku
  const isCorrect = $(".isCorrect"); // button sprawdzajacy poprawne wyniki
  const nextArrow = $(".quiz-container")
    .children("span")
    .eq(0); //strzalka kolejnosci w prawo

  loadKana1();
  // const katakanaPlace = $(".katakana-quiz").find(".kana-place");
  const hiraganaCorrect = $(".hiragana-quiz").find(".isCorrect");
  const katakanaCorrect = $(".katakana-quiz").find(".isCorrect");

  function renderKanaQuiz(characters) {
    const inputKatakana = $(".katakana-quiz").find("#kana-name");
    const inputHiragana = $(".hiragana-quiz").find("#kana-name");
    const quizStartBtn = document.querySelector(".quiz-start"); //rozpoczecie quizu
    const kanaQuiz = document.querySelector(".kana-quiz"); //okno wyswietlania znakow
    const hiraganaQuiz = document.querySelector(".hiragana-quiz");
    const katakanaQuiz = document.querySelector(".katakana-quiz");
    const quizInputs = document.querySelectorAll("#choice3, #choice4"); // wybor znakow w quizie
    let number = 1;

    quizStartBtn.addEventListener("click", function() {
      console.log(randomKana[0].meaning);
      kanaNumber.text(number);
      if ($(".kana-place").children().length > 0) {
        $(".kana-place")
          .children()
          .remove();
      }

      if (quizInputs[0].checked) {
        hiraganaQuiz.style.display = "flex";
        katakanaQuiz.style.display = "none";
        $(hiraganaQuiz)
          .find(kanaPlace)
          .append($(`<p>${randomKana[0].hiragana}</p>`));
        kanaQuiz.style.display = "flex";
        quizChoiceWindow.style.display = "none";
        menu.style.display = "none";
        correctAnswers.text("0");
        wrongAnswers.text("0");
      } else if (quizInputs[1].checked) {
        katakanaQuiz.style.display = "flex";
        hiraganaQuiz.style.display = "none";
        $(katakanaQuiz)
          .find(kanaPlace)
          .append($(`<p>${randomKana[0].katakana}</p>`));
        kanaQuiz.style.display = "flex";
        quizChoiceWindow.style.display = "none";
        menu.style.display = "none";
        correctAnswers.text("0");
        wrongAnswers.text("0");
      }
    });

    //przypisanie wartosci z json server do tablicy generalnej
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

    //sprawdzenie poprawnosci wpisanego znaczenia w inpucie

    hiraganaCorrect.on("click", function() {
      if (inputHiragana.val() !== randomKana[0].meaning) {
        inputHiragana.val("");
        kanaPlace.children("p").addClass("wrongAnswear");
        hiraganaCorrect.attr("disabled", "true");
        failArray.push(randomKana.splice(0, 1));
        correctAnswers.text(correctArray.length);
        wrongAnswers.text(failArray.length);
      }
      if (inputHiragana.val() === randomKana[0].meaning) {
        kanaPlace.children("p").addClass("correctAnswear");
        hiraganaCorrect.attr("disabled", "true");
        correctArray.push(randomKana.splice(0, 1));
        inputHiragana.val("");
        correctAnswers.text(correctArray.length);
        wrongAnswers.text(failArray.length);
      }
      if (randomKana.length === 43) {
        const kanaQuizResults = $(".quiz-result");
        const correctResult = $(".correct-result");
        //pojawienie się diva z koncowym wynikiem
        kanaQuiz.style.display = "none";
        kanaQuizResults.css("display", "flex");
        correctResult.text(correctArray.length);
        hiraganaCorrect.removeAttr("disabled");
        inputHiragana.val("");
        console.log(randomKana.length);
        console.log(correctArray);
        console.log(failArray);
      }
    });
    katakanaCorrect.on("click", function() {
      if (inputKatakana.val() === randomKana[0].meaning) {
        $(".katakana-quiz")
          .find(".kana-place")
          .children("p")
          .addClass("correctAnswear");
        katakanaCorrect.attr("disabled", "true");
        correctArray.push(randomKana.splice(0, 1));
        inputKatakana.val("");
        correctAnswers.text(correctArray.length);
        wrongAnswers.text(failArray.length);
      } else if (inputKatakana.val() !== randomKana[0].meaning) {
        $(".katakana-quiz")
          .find(".kana-place")
          .children("p")
          .addClass("wrongAnswear");
        katakanaCorrect.attr("disabled", "true");
        failArray.push(randomKana.splice(0, 1));
        inputKatakana.val("");
        correctAnswers.text(correctArray.length);
        wrongAnswers.text(failArray.length);
      }
      if (randomKana.length === 43) {
        const kanaQuizResults = $(".quiz-result");
        const correctResult = $(".correct-result");
        //pojawienie się diva z koncowym wynikiem
        kanaQuiz.style.display = "none";
        kanaQuizResults.css("display", "flex");
        correctResult.text(correctArray.length);
        katakanaCorrect.removeAttr("disabled");
        inputKatakana.val("");
      }
    });
    //wybor kolejnego znaku
    nextArrow.on("click", function() {
      $(".kana-place")
        .children("p")
        .removeClass("wrongAnswear");
      $(".kana-place")
        .children("p")
        .removeClass("correctAnswear");
      number = number + 1;
      isCorrect.removeAttr("disabled");
      if ($(".hiragana-quiz").length) {
        $(".hiragana-quiz")
          .find($(kanaPlace))
          .find("p")
          .text(`${randomKana[0].hiragana}`);
        kanaNumber.text(number);
      }
      if ($(".katakana-quiz").length) {
        $(".katakana-quiz")
          .find($(kanaPlace))
          .find("p")
          .text(`${randomKana[0].katakana}`);
        kanaNumber.text(number);
      }
    });

    //przycisk powrotu do menu glownego z quizu
    const quizBack = $(".quiz-back-menu");
    quizBack.on("click", function() {
      number = 1;
      isCorrect.removeAttr("disabled");
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
      if (correctArray.length > 0) {
        let newArray1 = [];
        newArray1.push(...correctArray.splice(0, correctArray.length));
        for (let i = 0; i < newArray1.length; i++) {
          randomKana.push(newArray1[i][0]);
        }
        newArray1 = [];
      }

      if (failArray.length > 0) {
        let newArray1 = [];
        newArray1.push(...failArray.splice(0, failArray.length));
        for (let i = 0; i < newArray1.length; i++) {
          randomKana.push(newArray1[i][0]);
        }
        newArray1 = [];
      }
      if ($(".kana-place").children().length > 0) {
        $(".kana-place")
          .children()
          .remove();
      }
    });
    const resultsBack = $(".back-result");
    resultsBack.on("click", function() {
      number = 1;
      isCorrect.removeAttr("disabled");
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
        let newArray1 = [];
        newArray1.push(...correctArray.splice(0, correctArray.length));

        for (let i = 0; i < newArray1.length; i++) {
          randomKana.push(newArray1[i][0]);
        }
        newArray1 = [];
      }

      if (failArray.length > 0) {
        let newArray1 = [];
        newArray1.push(...failArray.splice(0, failArray.length));
        for (let i = 0; i < newArray1.length; i++) {
          randomKana.push(newArray1[i][0]);
        }
        newArray1 = [];
      }
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
