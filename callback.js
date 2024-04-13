let stocks = {
  Fruits: ["strawberry", "grapes", "banana", "apple"],
  liquid: ["water", "ice"],
  holder: ["cone", "cup", "stick"],
  toppings: ["chocolate", "peanuts"],
};

// 1st Function

let order = (fruit_name, call_production) => {
  setTimeout(function () {
    console.log(`${stocks.Fruits[fruit_name]} was selected`);

    // Order placed. Call production to start
    call_production();
  }, 2000);
};

// 2nd Function

let production = () => {
  setTimeout(() => {
    console.log("production has started");

    setTimeout(() => {
      console.log("The fruit has been chopped");
    }, 2000);
  }, 1000);
};

// Trigger 👇
order(0, production);
