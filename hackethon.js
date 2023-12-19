document.addEventListener('DOMContentLoaded',    () => {
    const newsContainer = document.getElementById('news-container');

    async  function fetchnews(keyword) {
        const key = '7d1b5cca93e34c39a5ce1e63080bac27';
        const country = 'in';
        //const URL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${key}&sortBy=popularity`
        let URL = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key}`
        try {
            if (keyword) {
                 URL = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${key}`
                }
            const response = await fetch(URL);
            const newsdata = await response.json();
            if (response.ok && newsdata.articles) {
                displayNews(newsdata.articles.slice(0, 10));
            } else {
                console.error('Error fetching news:', newsdata.message || 'Unexpected response');
            }

        } catch (error) {
            console.error("Not fetched", error.message || 'unexpected responce' );
        }
    }
    

    
    function displayNews(art) {
        newsContainer.innerHTML = '';
        const rightArrow = '\u2192';

        art.forEach(article => {

            const card = document.createElement('div');
            card.className = 'News-card';
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title;
            const heading = document.createElement('h3');
            heading.innerHTML = article.title;
            const description = document.createElement('p');
            description.textContent = article.description;
            const btn = document.createElement('button')
            btn.className = 'Read-more';
            const addtext = document.createTextNode(`Read Full article ${rightArrow}`)
            btn.addEventListener('click', ()=>{
                Read_full_news(article.url);
            });

            btn.appendChild(addtext);
            card.appendChild(image);
            card.appendChild(heading);
            card.appendChild(description);
            card.appendChild(btn);
            newsContainer.appendChild(card);
            
        });

       async function Read_full_news (url){
        try{
            window.open(url , '_blank');
        }
        catch (error){
            console.error('Error opening article:', error.message || 'Unexpected response');
        }

        }
    }
   async function news () {
       await fetchnews('');
} 
news();
    

    const search_button = document.getElementById('go_btn');
    const search_input = document.getElementById('input');
    search_button.addEventListener('click', async () => {
        const trim_keyword = search_input.value.trim();
        const keyword = encodeURIComponent(trim_keyword);

        await fetchnews(keyword);
    });

});