// // Promise

// // let p = new Promise((resolve, reject) => {
// //     let a = 1 + 2;
// //     if(a == 2){
// //         resolve('Success');
// //     } else {
// //         reject('Failed');
// //     }
// // })
// // p.then((mes) => {
// //     console.log("Then +", mes);
// // }).catch((mes) => {
// //     console.log("Catch +", mes);
// // })

// const userLeft = false;
// const userWatchingCatMeme = true;

// // const watchTutorialCallBack = (callback, errorCallback) => {
// //     if (userLeft) {
// //         errorCallback({
// //             name: 'User Left',
// //             message: ':('
// //         })
// //     } else if (userWatchingCatMeme) {
// //         errorCallback({
// //             name: 'User Watching Cat Meme',
// //             message: 'BidenJr < Cat'
// //         })
// //     } else {
// //         callback('Thumbs up')
// //     }
// // }

// // watchTutorialCallBack((message) => {
// //     console.log("Success: ", message)
// // }, (error) => {
// //     console.log(error.name + ' ' + error.message)
// // })



// const watchTutorialPromise = () => {
//     return new Promise((resolve, reject) => {
//         if (userLeft) {
//             reject({
//                 name: 'User Left',
//                 message: ':('
//             })
//         } else if (userWatchingCatMeme) {
//             reject({
//                 name: 'User Watching Cat Meme',
//                 message: 'BidenJr < Cat'
//             })
//         } else {
//             resolve('Thumbs up')
//         }
//     })
// }

// watchTutorialPromise().then((message) => {
//     console.log("Success: ", message)
// }).catch((error) => {
//     console.log(error.name + ' ' + error.message)
// })

// const recordVideoOne = new Promise((resolve, reject) => {
//     resolve('Video 1 Recorded')
// })

// const recordVideoTwo = new Promise((resolve, reject) => {
//     resolve('Video 2 Recorded')
// })

// const recordVideoThree = new Promise((resolve, reject) => {
//     resolve('Video 3 Recorded')
// })

// Promise.all([
//     recordVideoOne,
//     recordVideoTwo,
//     recordVideoThree
// ]).then((messages) => {
//     console.log(messages);
// }) // Array of messages

// Promise.race([
//     recordVideoOne,
//     recordVideoTwo,
//     recordVideoThree
// ]).then((message) => {
//     console.log(message);
// }) // First message came out

// // Async

// const makeRequest = (location) => {
//     return new Promise((resolve, reject) => {
//         console.log(`Making request to ${location}`)
//         if(location === 'Google'){
//             resolve('Google says hi')
//         } else {
//             reject('We can only talk to Google')
//         }
//     })
// }

// const processRequest = (response) => {
//     return new Promise((resolve, reject) => {
//         console.log('Processing response')
//         resolve(`Extra Information + ${response}`)
//     })
// }

// // makeRequest('Facebook').then( response => {
// //     console.log('Response received')
// //     return processRequest(response)
// // }).then(processResponse => {
// //     console.log(processResponse)
// // }).catch(err => {
// //     console.log(err)
// // })


// async function doWork() {
//     try {
//         const response = await makeRequest('Facebook')
//         console.log('Response received')
//         const processResponse = await processRequest(response)
//         console.log(processResponse)
//     } catch (err) {
//         console.log(err)
//     }

// }

// doWork()

// import fs from 'fs'

// // Load File

// const loadFile = async () => {
//     try {
//         const data = await fs.promises.readFile('./test.txt', {
//             encoding: 'utf-8'
//         });
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// }
// loadFile()

// Fetch Data

let btn = document.querySelector('.btn-submit');
let resultDisplay = document.querySelector('.result');
let dataFetch = [];

const fetchBA = async (id) => {
    try {
        const res = await fetch(`https://api.ennead.cc/buruaka/character/${id}`);
        if(res.status !== 200){
            console.log("NO DATA AVAILABLE!");
        } else {
            const data = await res.json();
            console.log(data);
            alert("Found!")
            resultDisplay.insertAdjacentHTML('beforeend', `
                <img src="${data.image.icon}">
            `);
        }
    } catch (err) {
        console.log("ERRORRRR ARASFAFSFA");
    }
}

const fetchBAFull = async () => {
    btn.disabled = true;
    try {
        const res = await fetch('https://beta.schaledb.com/data/en/students.min.json');
        if(res.status !== 200){
            console.log("NO DATA AVAILABLE!");
        } else {
            const data = await res.json();
            dataFetch = data;
            btn.disabled = false;
            console.log(dataFetch);
            await eventAdd();
            // data.forEach(student => {
            //     resultDisplay.insertAdjacentHTML('beforeend', `
            //         <img src="https://schale.gg/images/student/collection/${student.Id}.webp">
            //                                     images/student/portrait/10000.webp
            //                                     images/weapon/weapon_icon_10000.webp
            //         <p>${student.Name}</p>
            //     `);                
            // });
        }
    } catch (err) {
        console.log("ERRORRRR ARASFAFSFA");
    }
}

const eventAdd = async () => {
    btn.addEventListener('click', () => {
        resultDisplay.innerHTML = ' '
        let value = document.querySelector('#form-input').value;
        value = stringPrettier(value);
        console.log(value);
        let student = dataFetch.find(student => {
            return student.PathName === value;
        })
        if(student){
            console.log(student);
            renderGeneral(student);
            renderDetail(student);
        } else {
            resultDisplay.insertAdjacentHTML('beforeend', `
                <div class="failed-container">
                    <p class="failed-text">No student found!</p>
                </div>
            `)
            // innerHTML = 'No student found!'
        }
    })
}

const renderGeneral = (student) => {
    resultDisplay.insertAdjacentHTML('beforeend', `
        <div class="student-potrait">
            <img src="https://schale.gg/images/student/portrait/${student.Id}.webp">
        </div>
        <div class="student-info">
            <div class="student-name">
                <p>${student.Name}</p>
            </div>
            <div class="student-badge">
                <div class="student-star"></div>
                <div class="student-role"><p></p></div>                
            </div>               
        </div>

    `);
}

const renderDetail = (student) => {
    const star = `<i class="fa fa-star"></i>`;
    let type = "";
    let roleType = document.querySelector(".student-role p");
    let roleContainer = document.querySelector(".student-role");
    let starContainer = document.querySelector(".student-star");
    for(let i = 0; i < student.StarGrade; i++){
        starContainer.insertAdjacentHTML('beforeend', star);
    }
    type = (student.SquadType === "Main") ? "striker" : "special"
    roleType.innerHTML = type;
    roleContainer.classList.add(type);
}

const stringPrettier = (str) => {
    str = str.toLowerCase();
    str = str.trim(); // remove space back and front
    str = str.replace(/ /g, ''); // remove multispace
    if(str.includes(')')){
        str = str.replace('(', '_');
        str = str.replace(')', '');
    }
    return str;
}

fetchBAFull();