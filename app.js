console.log("Who wan't to keep a zoo?");

const animals = [
  {
    name: 'George',
    emoji: '🦍',
    hunger: 100,
    status: '😄',
    foodQuality: 1,
    upgradeCost: 50
  },
  {
    name: 'Clarence',
    emoji: '🐅',
    hunger: 100,
    status: '😄',
    foodQuality: 1,
    upgradeCost: 50
  },
  {
    name: 'Oslo',
    emoji: '🦧',
    hunger: 100,
    status: '😄',
    foodQuality: 1,
    upgradeCost: 50
  },
  {
    name: 'Reggie',
    emoji: '🐘',
    hunger: 100,
    status: '😄',
    foodQuality: 1,
    upgradeCost: 50
  },
  {
    name: 'Peanut',
    emoji: '🐍',
    hunger: 100,
    status: '😄',
    foodQuality: 1,
    upgradeCost: 50
  },
  {
    name: 'Henry',
    emoji: '🦩',
    hunger: 100,
    status: '😄',
    foodQuality: 1,
    upgradeCost: 50
  },
]

// REVIEW bank is a global variable that will store the money we have made over the course of the game
let bank = 0
// let paycheck = 0 paycheck should be calculated EACH time, it's not storage, like bank is



function hungerDecay() {
  // animals[0].hunger -= 5
  // animals[1].hunger -= 5 // instead of trying to update each animal individually, we can use a loop instead
  animals.forEach(animal => {
    animal.hunger -= 5
    if (animal.hunger < 0) animal.hunger = 0 // when an if statement on has one line, it can all be inline with no { }
  }) // change the data
  // console.log('the animals hunger', animals);
  updateAnimals() // draw the data
  drawPaycheck()
}

// REVIEW to make code run on it's own, on a repeating interval
let hungerInterval = setInterval(hungerDecay, 1000)


function updateAnimals() {
  updateAnimalStatuses()
  // loop over each animal and update each animal
  animals.forEach(animal => {
    // console.log('drawing', animal);
    // REVIEW each animal element has it's own id. so we can grab that chunk of the page using the animal's name
    let animalPenElm = document.getElementById(animal.name)
    // console.log(animalPenElm);
    // let statsElm = animalPenElm.getElementsByTagName('h5')[0] maybe a little wacky
    // REVIEW then we can grab each the inner elements of our each animals pen and updates it's details individually
    let statsElm = animalPenElm.querySelector('h5')
    // console.log('📈', statsElm);
    statsElm.innerText = `${animal.name} | ${animal.status} | ${animal.hunger}`
    let buttonElm = animalPenElm.querySelector('button')
    buttonElm.innerHTML = `$${animal.upgradeCost} 
    <i class="mdi mdi-upload-box"></i> lv ${animal.foodQuality} [ 🍖${animal.foodQuality * 5}]`

    // stop marquees if an animal is dead
    if (animal.hunger <= 0) {
      let marqueeX = animalPenElm.querySelector('.habitat>marquee')
      let marqueeY = animalPenElm.querySelector('marquee>marquee')
      // @ts-ignore
      marqueeX.stop() // our code does not know these are marquee tags so it is upset at the stop, but we can ignore these
      // @ts-ignore
      marqueeY.stop()
    }
  })
}
updateAnimals() // we run this after the definition so it runs when the page loads


// A function that just updates the animals status
function updateAnimalStatuses() {
  animals.forEach(animal => {
    if (animal.hunger > 80) {
      animal.status = '😄'
    } else if (animal.hunger > 50) {
      animal.status = '😐'
    } else if (animal.hunger > 15) {
      animal.status = '🥺'
    } else if (animal.hunger > 0) {
      animal.status = '😖'
    } else {
      animal.status = '💀'
    }
  })
}

// REVIEW feed takes in an animals name. Finds the original animal using that name, then increases their hunger value
function feed(animalName) {
  console.log('feeding', animalName);
  const animalToFeed = animals.find(animal => animal.name == animalName) // find me the animal that has a name, that matches the animalName passed
  console.log('🍽️', animalToFeed); // 🧪 did your find return the whole animal, 

  if (animalToFeed.hunger <= 0) return // this will end our function early

  animalToFeed.hunger += 5 * animalToFeed.foodQuality // change data
  if (animalToFeed.hunger > 100) animalToFeed.hunger = 100
  updateAnimals() // draw data
  drawPaycheck()
}

// REVIEW takes in an animals name, finds the original, checks if you have enough money in the bank. If you do, take that money away, upgrade their food quality, and increase the cost so the next time the upgrade costs more.
function upgradeFood(animalName) {
  console.log('upgrading', animalName);
  const animalToUpgrade = animals.find(animal => animal.name == animalName)
  if (bank >= animalToUpgrade.upgradeCost) {
    bank -= animalToUpgrade.upgradeCost
    console.log('✨', animalToUpgrade);
    animalToUpgrade.foodQuality++
    animalToUpgrade.upgradeCost += 50
    console.log('upgarded!', animalToUpgrade.foodQuality)
    drawBank()
    updateAnimals()
  }
}


// calculate how much we are going to get paid, based on each animals status.
function getPaid() {
  let paycheck = 0
  animals.forEach(animal => {
    switch (animal.status) {
      case '😄':
        paycheck += 15
        break
      case '😐':
        paycheck += 10
        break
      case '😟':
        paycheck += 6
        break
      case '🥺':
        paycheck += 3
        break
      case '😖':
        paycheck += 1
        break
      case '💀':
        paycheck -= 2
    }
    //TODO is the animal happy?
  })
  // NOTE our calculate paycheck function now does everything above does and could take over most of this functionality
  // let paycheck = calculatePaycheck()

  bank += paycheck
  // console.log('💰', paycheck);
  // console.log('🏦', bank);
  drawBank()
  //drawPaycheck(paycheck) // passing through will will tell me what i was last paid
}

setInterval(getPaid, 5000) // start an interval that pays us

function drawBank() {
  let bankElm = document.getElementById('bank')
  bankElm.innerText = `$${bank}`
}

function drawPaycheck() {
  // let paycheck = 0
  // animals.forEach(animal => {
  //   switch (animal.status) {
  //     case '😄':
  //       paycheck += 15
  //       break
  //     case '😐':
  //       paycheck += 10
  //       break
  //     case '😟':
  //       paycheck += 6
  //       break
  //     case '🥺':
  //       paycheck += 3
  //       break
  //     case '😖':
  //       paycheck += 1
  //       break
  //     case '💀':
  //       paycheck -= 2

  //   }
  // })
  let paycheck = calculatePaycheck()
  let paycheckElm = document.getElementById('paycheck')
  // paycheckElm.innerText = `+ $${paycheck}`
  paycheckElm.innerText = `+ $${paycheck}`
}

function calculatePaycheck() {
  let paycheck = 0
  animals.forEach(animal => {
    switch (animal.status) {
      case '😄':
        paycheck += 15
        break
      case '😐':
        paycheck += 10
        break
      case '😟':
        paycheck += 6
        break
      case '🥺':
        paycheck += 3
        break
      case '😖':
        paycheck += 1
        break
      case '💀':
        paycheck -= 2
    }
  })
  return paycheck
}


// REVIEW return example
function addNumber(x, y) {
  let sum = x + y
  console.log('👩‍🔬', sum);
  // To gain access to our result in this function, we have to use return
  return sum
}

let result = addNumber(5, 10)
// result will have the value of 15, because it will run the addNumber function, receiving the return value from addNumber