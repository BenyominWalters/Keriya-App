var cards = [" ", "א","בּ","ב","ג","ד","ה","ו","ז","ח","ט","י","כּ","כ","ך","ל","מ","ם","נ","ן","ס","ע","פּ","פ","ף","צ","ץ","ק","ר","שׁ","שׂ","תּ","ת",];
var suits = [" ", "\u05b8", "\u05b7", "\u05b5","\u05b6", "\u05b0", "\u05b4", "\ufb4b", "\u05bb", "\ufb35","\u05b3", "\u05b2", "\u05b1",];

// names of nikud
// ["kamatz", "patach", "tzeiri", "segol", "sheva", "chirik", "cholam", "kubutz", "shuruk", "chataf kamatz", "chataf patach", "chataf segol"];


var deck = [];

function getDeck()
{
    var deck = [];

    for(var i = 0; i < suits.length; i++)
    {
        for(var x = 0; x < cards.length; x++)
        {
            var card = {Value: cards[x], Suit: suits[i]};
            deck.push(card);
        }
    }

    return deck;
}

function deal()
{
    // remove top card from deck
    var card = deck[deck.length-1];
    deck.splice(deck.length-1, 1);
    return card;
}

function shuffle()
{
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function renderDeck()
{
    for(var i = 0; i < 3; i++)
    {
        var card = document.createElement("div");
        var value = document.createElement("div");
        var suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit";

        value.innerHTML = deck[i].Value + deck[i].Suit;
        // suit.innerHTML = deck[i].Suit;
        card.appendChild(value);
        card.appendChild(suit);

        document.getElementById("deck").appendChild(card);
    }
}

function load()
{
    deck = getDeck();
    shuffle();
    renderDeck();
}

window.onload = load;

function clearDeck() {
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