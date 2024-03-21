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

let bank = 0
// let paycheck = 0 paycheck should be calculated EACH time, it's not storage, like bank is

function hungerDecay() {
  // animals[0].hunger -= 5
  // animals[1].hunger -= 5
  animals.forEach(animal => {
    animal.hunger -= 5
    if (animal.hunger < 0) animal.hunger = 0 // when an if statement on has one line, it can all be inline with no { }
  }) // change the data
  // console.log('the animals hunger', animals);
  updateAnimals() // draw the data
  drawPaycheck()
}
// REVIEW to make code run on it's own, on a repeating interval
setInterval(hungerDecay, 1000)


function updateAnimals() {
  updateAnimalStatuses()
  animals.forEach(animal => {
    // console.log('drawing', animal);
    let animalPenElm = document.getElementById(animal.name)
    // console.log(animalPenElm);
    // let statsElm = animalPenElm.getElementsByTagName('h5')[0] maybe a little wacky
    let statsElm = animalPenElm.querySelector('h5')
    // console.log('📈', statsElm);
    statsElm.innerText = `${animal.name} | ${animal.status} | ${animal.hunger}`

    // stop marquees
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
  }
}


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
  // NOTE our calculate paycheck function now does this and could take over most of this functionality
  // let paycheck = calculatePaycheck()
  bank += paycheck
  // console.log('💰', paycheck);
  // console.log('🏦', bank);
  drawBank()
  //drawPaycheck(paycheck) // passing through will will tell me what i was last paid
}

setInterval(getPaid, 5000)

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