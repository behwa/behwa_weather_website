console.log('Client side javascript file is loaded test!')
// aysrchronize
//then as a promises
//
// fetch('http://puzzle.mead.io/puzzle').then((respone) => {
//     //add on a call to then, then add a callback function    
//     respone.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:8080/weather?address=%22botson%22').then((respone) => {
//     respone.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From javascript'
// messageTwo.textContent = ''
// const isProduc = require('./prodConfig.js')
const string = 'http://localhost:8080'
const urlString = true ? '' : string

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //allow server render the page, prevent refresh
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(urlString + '/weather?address=%22' + location + '%22').then((respone) => {
        respone.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = JSON.stringify(data.location)
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

    // console.log(location)
})