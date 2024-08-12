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
let localFetch = [];
const adaptRes = {
    0: 'D',
    1: 'C',
    2: 'B',
    3: 'A',
    4: 'SS',
    5: 'SS'
}

// const fetchBA = async (id) => {
//     try {
//         const res = await fetch(`https://api.ennead.cc/buruaka/character/${id}`);
//         if(res.status !== 200){
//             console.log("NO DATA AVAILABLE!");
//         } else {
//             const data = await res.json();
//             console.log(data);
//             alert("Found!")
//             resultDisplay.insertAdjacentHTML('beforeend', `
//                 <img src="${data.image.icon}">
//             `);
//         }
//     } catch (err) {
//         console.log("ERRORRRR ARASFAFSFA");
//     }
// }

const fetchBAFull = async () => {
    btn.disabled = true;
    console.log("Fetching Data...");
    try {
        const res = await fetch('https://beta.schaledb.com/data/en/students.min.json');
        const local = await fetch('https://schale.gg/data/en/localization.min.json');
        if(res.status !== 200 || local.status !== 200){
            console.log("NO DATA AVAILABLE!");
        } else {
            const data = await res.json();
            const _data = await local.json();
            dataFetch = data;
            localFetch = _data;
            btn.disabled = false;
            // console.log(dataFetch);
            // console.log(localFetch);
            console.log("Fetching Data Complete!");
            await eventAdd();
            await enterAdd();
        }
    } catch (err) {
        console.log("ERRORRRR ARASFAFSFA");
    }
}

const enterAdd = async () => {
    document.querySelector("#form-input").onkeydown = (event) => {
        if(event.key === 'Enter') {
            btn.click()
        }
    } 
}

const eventAdd = async () => {
    btn.addEventListener('click', () => {
        resultDisplay.innerHTML = ''
        let value = document.querySelector('#form-input').value;
        value = stringPrettier(value);
        console.log(value);
        let student = dataFetch.find(student => {
            return student.PathName === value;
        })
        if(student){
            // console.log(student);
            renderGeneral(student);
            renderDetail(student);
        } else {
            renderFailed();
        }
    })
}

const renderFailed = () => {
    document.querySelector(".form").insertAdjacentHTML('beforebegin', `
        <div style="width: 100vw;
            height: 100vh;
            position: fixed;
            background: url('https://schale.gg/images/background/BG_ReceptionRoom.jpg') no-repeat center center;
            background-size: cover;
            z-index: -1"
            class="bgbg">
        </div>
    `)
    resultDisplay.insertAdjacentHTML('beforeend', `
        <div class="failed-container">
            <p class="failed-text">No student found!</p>
        </div>
    `)
}

const renderGeneral = (student) => {
    document.querySelector(".bgbg").remove();
    document.querySelector(".form").insertAdjacentHTML('beforebegin', `
        <div style="width: 100vw;
            height: 100vh;
            position: fixed;
            background: url('https://schale.gg/images/background/${student.CollectionBG}.jpg') no-repeat center center;
            background-size: cover;
            z-index: -1"
            class="bgbg">
        </div>
    `)
    resultDisplay.insertAdjacentHTML('beforeend', `
        <div class="col-12 col-md-6 potrait">
            <div class="student-potrait">
                <img src="https://schale.gg/images/student/portrait/${student.Id}.webp">            
            </div>
        </div>
        <div class="col-12 col-md-6 info">
            <div class="student-info">
                <div>
                    <div class="student-name">
                        <p>${student.Name}</p>
                    </div>
                    <div class="student-badge">
                        <div class="student-star"></div>
                        <div class="student-role">
                            <span></span>
                        </div>                
                    </div>               
                </div>
                <div>
                    <div class="student-school invert-light">
                        <img
                            src="https://schale.gg/images/schoolicon/School_Icon_${student.School.toUpperCase()}_W.png"
                            alt="${student.School}"
                            width="84"
                            height="76">
                    </div>
                </div>                    
            </div>
            <div class="student-info-stats">
                <div class="pill">
                    <div class="student-info-pill">
                        <img
                            src="https://schale.gg/images/ui/Role_${student.TacticRole}.png"
                            alt=""
                            height="26px"
                            class="invert-light">
                        <p>${localFetch.TacticRole[student.TacticRole]}</p>
                    </div>
                    <div class="student-info-pill type-${localFetch.BulletType[student.BulletType].toLowerCase()}">
                        <img
                            src="https://schale.gg/images/ui/Type_Attack.png"
                            alt="ATK type"
                            height="18px">
                        <p>${localFetch.BulletType[student.BulletType]}</p>
                    </div>
                    <div class="student-info-pill type-${localFetch.ArmorType[student.ArmorType].toLowerCase()}">
                        <img
                            src="https://schale.gg/images/ui/Type_Defense.png"
                            alt="DEF Type"
                            height="18px">
                        <p>${localFetch.ArmorType[student.ArmorType]}</p>
                    </div>
                    <div class="student-info-pill type-pos">
                        <p>${student.Position.toUpperCase()}</p>
                    </div>
                    <div class="student-info-pill">
                        <img
                            src="https://schale.gg/images/schoolicon/School_Icon_${student.School.toUpperCase()}_W.png"
                            alt=""
                            height="26px"
                            class="invert-light">
                        <p>${localFetch.School[student.School]} / ${localFetch.Club[student.Club]}</p>
                    </div>
                </div>
                <div class="student-terrain">
                    <div class="terrain terrain-street">
                        <div class="terrain-icon">
                            <img
                                src="https://schale.gg/images/ui/Terrain_Street.png"
                                alt="Terrain_Street"
                                class="invert-light">
                        </div>
                        <br>
                        <img
                            src="https://schale.gg/images/ui/Ingame_Emo_Adaptresult${adaptRes[student.StreetBattleAdaptation]}.png"
                            alt="${adaptRes[student.StreetBattleAdaptation]}">
                    </div>
                    <div class="terrain terrain-outdoor">
                        <div class="terrain-icon">
                            <img
                                src="https://schale.gg/images/ui/Terrain_Outdoor.png"
                                alt="Terrain_Outdoor"
                                class="invert-light">
                        </div>
                        <br>
                        <img
                            src="https://schale.gg/images/ui/Ingame_Emo_Adaptresult${adaptRes[student.OutdoorBattleAdaptation]}.png"
                            alt="${adaptRes[student.OutdoorBattleAdaptation]}">
                    </div>
                    <div class="terrain terrain-indoor">
                        <div class="terrain-icon">
                            <img
                                src="https://schale.gg/images/ui/Terrain_Indoor.png"
                                alt="Terrain_Indoor"
                                class="invert-light">
                        </div>
                        <br>
                        <img
                            src="https://schale.gg/images/ui/Ingame_Emo_Adaptresult${adaptRes[student.IndoorBattleAdaptation]}.png"
                            alt="${adaptRes[student.IndoorBattleAdaptation]}">
                    </div>
                </div>
            </div>
            <div class="student-info-profile">
                <div class="profile-header">
                    <img
                        src="https://schale.gg/images/student/collection/${student.Id}.webp"
                        alt=""
                        style="height: 96px; width: auto; border-radius: 8px;">
                    <div>
                        <div class="full-name">
                            <h3>${student.FamilyName + " " + student.PersonalName}</h3>
                        </div>
                        <div>
                            <div class="school">
                                <div class="school-label">
                                    <span>${localFetch.SchoolLong[student.School]}</span>
                                </div>
                                <div class="school-year">
                                    <span>${student.SchoolYear}</span>
                                </div>                                    
                            </div>
                            <div class="club">
                                <span>${localFetch.Club[student.Club]}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table profile-panel mb-2 mt-3">
                    <tbody>
                        <tr>
                            <td width="50%">
                                <div class="profile-detail">
                                    <span class="title">CV.</span>
                                    <span class="detail ms-2">${student.CharacterVoice}</span>
                                </div>
                            </td>
                            <td width="50%">
                                <div class="profile-detail">
                                    <span class="title">Birthday</span>
                                    <span class="detail ms-2">${student.Birthday}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <div class="profile-detail">
                                    <span class="title">Age</span>
                                    <span class="detail ms-2">${student.CharacterAge}</span>
                                </div>
                            </td>
                            <td width="50%">
                                <div class="profile-detail">
                                    <span class="title">Height</span>
                                    <span class="detail ms-2">${student.CharHeightMetric}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <div class="profile-detail">
                                    <span class="title">Design</span>
                                    <span class="detail ms-2">${student.Designer}</span>
                                </div>
                            </td>
                            <td width="50%">
                                <div class="profile-detail">
                                    <span class="title">Illustrator</span>
                                    <span class="detail ms-2">${student.Illustrator}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="profile-detail">
                                    <span class="title">Hobbies</span>
                                    <span class="detail ms-2">${student.Hobby}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="separator"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="intro">${student.ProfileIntroduction}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `);
}

const renderDetail = (student) => {
    const star = `<i class="fa fa-star"></i>`;
    const SSRText = `<br><i class="text-bold">"${student.CharacterSSRNew}"</i>`
    let type = "";
    let roleType = document.querySelector(".student-role span");
    let roleContainer = document.querySelector(".student-role");
    let starContainer = document.querySelector(".student-star");
    let introContainer = document.querySelector(".intro");
    for(let i = 0; i < student.StarGrade; i++){
        starContainer.insertAdjacentHTML('beforeend', star);
    }
    if(student.StarGrade === 3){
        introContainer.insertAdjacentHTML('beforeend', SSRText)
    }
    if(student.School === "ETC"){
        document.querySelector(".school-year").remove();
    }
    type = localFetch.SquadType[student.SquadType];
    // console.log(type);
    roleType.innerHTML = type;
    roleContainer.classList.add(type.toLowerCase());
}

const stringPrettier = (str) => {
    str = str.toLowerCase();
    str = str.trim(); // remove space back and front
    str = str.replace(/ /g, '_'); // remove multispace
    let check = false;
    if(str.includes('_(')){
        check = true;
        str = str.replace('_(', '_');
        str = str.replace(')', '');
    }
    if(str.includes('(') && !check){
        check = true;
        str = str.replace('(', '_');
        str = str.replace(')', '');
    }    
    if(str.includes("hot_spring")){
        str = str.replace("hot_spring", "onsen");
    }
    if(str.includes("battle")) {
        str = str.concat('_', 'dealer');
    }
    if(str === "misaka") return "misaka_mikoto";
    if(str === "miku") return "hatsune_miku"
    return str;
}

fetchBAFull();