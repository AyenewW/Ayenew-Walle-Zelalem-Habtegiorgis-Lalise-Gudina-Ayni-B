/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Ayenew Walle, Zelalem Habtegiorgis, Lalise Gudina, Ayni]
 */
 let cards = {
  wallia: {
    title: 'Wallia',
    price:  25,
    minutes: 130,
    refillable: true
  },
  chellada: {
    title: 'Chellada',
    price:  20,
    minutes: 120,
    refillable: true
  },
  kebero: {
    title: 'Key Kebero',
    price:  10,
    minutes: 100,
    refillable: false
  }
};

let checkout= []; //array for checkedout cards.
let purchased = []; //array for the purchased cards
let email_subscribers = []; //array for the subscribers
let members = []; //array for the members

let selected_quantity = {};
let total_balance = 0;
let total_minutes = 0;
let total_grand =0;

const buy_chellada_card = document.querySelector('#chellada');
const buy_wallia_card = document.querySelector('#wallia');
const buy_kebero_card = document.querySelector('#kebero');
const all_buy_card = document.querySelector('#all_buy_card');
const add_min = document.querySelector('#add_min');

const checkout_list = document.querySelector('#checkout_list');

const updateCheckout = () => {

  //create a list to be shown on the checkout list.
  let checkout_table = "";
  if (checkout.length > 0) {
    total_grand =0;
    total_minutes =0;
    let checkout_count =0;
    checkout.forEach( card => {
      //To calculate checkout count;
      checkout_count += 1;// checkout_count = checkout_count + 1;
      let total = parseInt(cards[card.type].price)*Number(card.quantity);
      let total_grd = parseInt(cards[card.type].price)*Number(card.quantity);
      
      let total_min = parseInt(cards[card.type].minutes)*Number(card.quantity);
      checkout_table += `<tr>
      <td>${card.type}</td>
      <td>${card.quantity}</td>
      <td>$${cards[card.type].price}</td>
      <td>$${total}</td>
    </tr>`;
    // to calculate total balance
    total_balance += total;// total_balance = total_balance + total;

    // to calculate total grand
    total_grand += total_grd;
   
    //to calculate total minutes
    total_minutes += total_min;
    
    console.log('total_minutes='+ total_minutes);
    console.log('total_grand='+ total_grand);
    });
    checkout_list.innerHTML = checkout_table;
    document.getElementById('grandTotal').innerHTML ='$'+ total_grand;
    console.log('total_minutes='+ total_minutes);
    document.getElementById('balance').innerHTML = total_minutes;
    document.getElementById('totalCheckout').innerHTML = checkout_count;
    document.getElementById('totalCart').innerHTML = checkout_count;
    //document.getElementById('addMore_minutes').innerHTML = total_balance + total_minutes;
  }
}
const chellada_quantity = document.querySelector('#chellada_quantity');
const wallia_quantity = document.querySelector('#wallia_quantity');
const kebero_quantity = document.querySelector('#kebero_quantity');
const buy_type = document.querySelector('#buy_type');
const buy_quantity = document.querySelector('#buy_quantity');
const subscribe = document.querySelector('#subscribe');


//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //get the type of the card from the id itself
  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;

  const quantity = event.target.value;
  if (quantity >0) { //meaning the user has seleted the quantity of the card to be purchased.

selected_quantity[card_type] = quantity;
    //now the user has selected the quantity, activate the button.
    console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
kebero_quantity.addEventListener('change', (event) => quantitySelected(event));
wallia_quantity.addEventListener('change', (event) => quantitySelected(event));

//purchased object example {type: 'chellada', quantity: 2 }

const addToCheckout = (type) => {
  console.log(this);
  //get valid card types

  let valid_types = Object.keys(cards);
  if (valid_types.includes(type)) {

    if (checkout.find(e => e.type === type)) {
      checkout.map(ch => ch.type === type ? ch.quantity = Number(ch.quantity)+Number(selected_quantity[type]): ch)
    } else {
      //create the object for checkout here.
      let checkout_card = {type: type, quantity:selected_quantity[type] };
      checkout.push(checkout_card);
    }


    updateCheckout();
  }
}

addToCheckoutbyOption = () => {
  //find the value directly from the element with id buy_type
  const newType = document.getElementById('buy_type').value;
  const newSelectedQuantity = document.getElementById('buy_quantity').value;
  let valid_types = Object.keys(cards);
  if (valid_types.includes(newType)) {

    if (checkout.find(e => e.type === newType)) {
      checkout.map(ch => ch.type === newType ? ch.quantity = Number(ch.quantity)+Number(newSelectedQuantity): ch)
    } else {
      //create the object for checkout here.
      let checkout_card = {type: newType, quantity:newSelectedQuantity };
      checkout.push(checkout_card);
    }


    updateCheckout();
  }
}

addMinutesbyOption = () => {
  const newType = document.getElementById('minute_type').value; 
  const newSelectedminutes = document.getElementById('more_minutes').value;
 // const newMinute = (parseInt(cards[newType].minutes)*parseInt(newSelectedQuantity));
  
  // document.getElementById('balance').innerHTML = total_minutes + newMinute;
  document.getElementById('addMore_minutes').innerHTML = newSelectedminutes;
  
  let valid_types = Object.keys(cards);
  if (valid_types.includes(newType)) {
    const newSelectedQuantity = newSelectedminutes/Number(cards[newType]['minutes']);
    if (checkout.find(e => e.type === newType)) {
      checkout.map(ch => ch.type === newType ? ch.quantity = Number(ch.quantity)+Number(newSelectedQuantity): ch)
    }  else {
      //create the object for checkout here.
      let checkout_card = {type: newType, quantity:newSelectedQuantity };
      checkout.push(checkout_card);
    }


    updateCheckout();
  }
}

const registerMember = () => {
  let first_name = document.getElementById('first_name').value;
  let last_name = document.getElementById('last_name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;

  let newMember = {first_name, last_name, email, phone};
  members.push(newMember);
  console.log('members', members);
}

const addToSubscriber = () => {
  let newEmail = document.getElementById('subscriberEmail').value;
  if(newEmail !== '') {
    email_subscribers.push(newEmail);
  }
  console.log('subscribers', email_subscribers)
}


buy_chellada_card.addEventListener('click', () => addToCheckout('chellada'));
buy_kebero_card.addEventListener('click', () => addToCheckout('kebero'));
buy_wallia_card.addEventListener('click', () => addToCheckout('wallia'));
all_buy_card.addEventListener('click', () => addToCheckoutbyOption());
add_min.addEventListener('click', () => addMinutesbyOption());





