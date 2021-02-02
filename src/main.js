import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import Card from './card.js';

$(document).ready(function() {
  let cards = [
    {
      value: '1',
      count: 0
    },
    {
      value: '2',
      count: 0
    },
    {
      value: '3',
      count: 0
    },
    {
      value: '4',
      count: 0
    },
    {
      value: '5',
      count: 0
    }
  ];

  function createCardGrid(rowNum, limit) {
    for(let i = 0; i < 5; i++) {
      let randomizer = Math.floor(Math.random() * 5);
      while(cards[randomizer].count >= limit ) {
        randomizer = Math.floor(Math.random() * 5);
      }
  
      $(rowNum).append(`
        <div class="col-sm clickable ${'card' + cards[randomizer].value}">
          ${cards[randomizer].value}
        </div>
      `);
      cards[randomizer].count++;

    }
  }
  createCardGrid(".row1", 1);
  createCardGrid(".row2", 2);

  let clicks = 0;
  let currentSelections = [];
  let backgroundColor = "";
  let numOfTurns = 0;
  let matches = 0;

  

  $(".clickable").click(function() {
    $(this).css({"font-size": 25});
    currentSelections.push($(this).text().toString().trim());
    $(this).css({
      "background-color": "red"
    });
    clicks++;
    numOfTurns++;
    console.log(numOfTurns);

    if(clicks === 2) {
      if(currentSelections[0] === currentSelections[1]) {
        matches++;
        alert("Match!");
        backgroundColor = "green";
        $(`.card${currentSelections[0]}`).unbind("click");
        $(`.card${currentSelections[1]}`).unbind("click");
      } else {
        alert("NO Match!");
        backgroundColor = "";
        $(`.card${currentSelections[0]}`).css({"font-size": 0});
        $(`.card${currentSelections[1]}`).css({"font-size": 0});
      } 
      $(`.card${currentSelections[0]}`).css({"background-color": backgroundColor});
      $(`.card${currentSelections[1]}`).css({"background-color": backgroundColor});
      currentSelections = [];
      clicks = 0;
    }
    console.log("Matches: " + matches);

    if(matches === 5) {
      $("#output").show();
      $(".container").hide();
      $("#num-turns").text(numOfTurns);
    }
  });

  


});