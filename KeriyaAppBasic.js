var alephBeis = ["א","בּ","ב","ג","ד","ה","ו","ז","ח","ט","י","כּ","כ","ך","ל","מ","ם","נ","ן","ס","ע","פּ","פ","ף","צ","ץ","ק","ר","שׁ","שׂ","תּ","ת",];
var nekudos = [" ",]; // For now I won't include nikud "\u05b8", "\u05b7", "\u05b5","\u05b6", "\u05b0", "\u05b4", "\ufb4b", "\u05bb", "\ufb35","\u05b3", "\u05b2", "\u05b1",];

// names of nikud for possible inclussion
// ["kamatz", "patach", "tzeiri", "segol", "sheva", "chirik", "cholam", "kubutz", "shuruk", "chataf kamatz", "chataf patach", "chataf segol"];


var deck = [];

function getDeck()
{
    var deck = [];

    for(var i = 0; i < nekudos.length; i++)
    {
        for(var x = 0; x < alephBeis.length; x++)
        {
            var card = {Letter: alephBeis[x], Nikud: nekudos[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle()
{
    // for each card in deck
    // switch the letters of two random cards (Fisher-Yates suffle algorithm)
    for (var i = deck.length - 1; i > 0; i--)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

// A variable to hold the value of the correct card to be selected
var correctLetter = 0;
function myQuestion() {
    // Chooses a random number. Whichever card has this id number will be marked as the "correct" card.
    // Returns a random integer between min (include) and max (include): Math.floor(Math.random() * (max - min + 1)) + min;
    correctLetter = Math.floor(Math.random() * 4); 
    
    var question = document.createElement("div");
    question.className = "question";
    // TODO: add sound 
    // question.onclick = sayQuestion;
    question.innerHTML = "Find the Letter " + deck[correctLetter].Letter + deck[correctLetter].Nikud;
    document.getElementById("showQuestion").appendChild(question);
    return correctLetter;
}

function renderDeck()
{
    myQuestion();
    for(var i = 0; i < 4; i++)
    {
        var card = document.createElement("div");
        var letter = document.createElement("div");
        // var nikud = document.createElement("div");
        // assigns each card a unique id, so that we can select one as the "correct" answer
        card.id = i;
        card.className = "card";
        card.onclick = alertMyClick;
        letter.className = "letter";
        // nikud.className = "nikud";

        letter.innerHTML = deck[i].Letter + deck[i].Nikud; // I made these in one div so that the nikud would be applied to the letter properly.
        // nikud.innerHTML = deck[i].nikud;
        card.appendChild(letter);
        // card.appendChild(nikud);

        document.getElementById("deck").appendChild(card);
    }
}

function alertMyClick() {
    // if the id number of the selcted card equals the number of the correct letter mark "correct"
    if (this.id == correctLetter) {
        console.log("Correct!");
    }
    else {
        console.log("Try again!");
    }
}

function load()
{
    deck = getDeck();
    shuffle();
    renderDeck();
    console.log(deck);
}

window.onload = load;

function clearDeck() {
    var myQuestion = document.getElementById("showQuestion");
    while (myQuestion.firstChild) {
        myQuestion.removeChild(myQuestion.firstChild);
    }

    var myNode = document.getElementById("deck");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function reset()
{
    clearDeck();
    load();
}