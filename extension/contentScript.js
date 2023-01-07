// alert("hello")
// if (typeof init == 'undefined'){
// }
// let result = document.querySelectorAll('div[data-testid="tweetText"]')
// for (let elemsKey in result) {
//     console.log(elemsKey.innerText)
// }

// console.log()
chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const {type} = obj;
    let result = document.querySelectorAll('div[data-testid="tweetText"]')
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        console.log(result[i].innerText)
        // $.post('http://localhost:5000/api/language-detection',{tweet_text:result[i].innerHTML},function (data) {
        //     console.log(data)
        // })
        $.ajax({
            url: ' http://127.0.0.1:5000/api/language-detection',
            method: 'post',
            type: 'POST',
            data: JSON.stringify({tweet_text: result[i].innerText}),
            contentType: 'application/json',
            success: function (data) {
                console.log(data['is_english'])
                if (data['is_english']) {
                    $.ajax({
                        url: ' http://127.0.0.1:5000/api/sentiment-score',
                        method: 'post',
                        type: 'POST',
                        data: JSON.stringify({tweet_text: data['tweet_text']}),
                        contentType: 'application/json',
                        success: function (response) {
                            let text = ' · Detect Result: 😊'
                            if (response['detected_mood'] == 'NEUTRAL') {
                                text = ' · Detect Result: 😐'
                            }
                            if (response['detected_mood'] == 'POSITIVE') {
                                text = ' · Detect Result: 😊'
                            }
                            if (response['detected_mood'] == 'NEGATIVE') {
                                text = ' · Detect Result: ☹️'
                            }
                            let time = result[i].parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].children[0].children[0].children
                            let place = time[time.length - 1].children[0]
                            console.log(place);
                            const spanElement = document.createElement("span");
                            spanElement.style.color = 'grey';
                            spanElement.textContent = text;
                            place.appendChild(spanElement)
                            console.log(response)
                        }
                    })


                    //place.textContent+='·Detect Result: 😊'
                }
            }
        })

        //console.log(result[i].parentNode.parentNode.parentNode.getElementsByTagName('a')[0].textContent)
        //time[time.length-1].textContent+='·Detect Result: 😊'
    }

    // let text =result[0].parentNode.parentNode.parentNode.getElementsByTagName('time')[0].innerText

    console.log()
    alert(type);


})
// (()=>{
//     function nodeInsertedCallback() {
//         const article = document.getElementsByTagName('article')
//         // for (let articleKey in article) {
//         //     console.log(articleKey.innerText)
//         // }
//         console.log(article)
//
//     }
//     function getContent(article){
//         const ret = []
//         for (let i = 0; i < article.length; i++) {
//          let span = article[i].querySelector('[data-testid="tweetText"]');
//
//             ret.push(span.innerText)
//
//         }
//         return ret
//     }
//
//     chrome.runtime.onMessage.addListener((obj,sender,response)=>{
//         const {type} = obj;
//         console.log(type);
//
//         nodeInsertedCallback()
//         // window.addEventListener('load', function () {
//         //    nodeInsertedCallback()
//         // })
//
//         //getContent(article)
//         //document.addEventListener('scroll', nodeInsertedCallback);
//     })
// })();
