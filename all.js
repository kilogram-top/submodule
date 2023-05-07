var done = false;

function sanitize(text, conf){
    return text.replaceAll('{SITE_NAME}', conf.site_name).replaceAll('{ABOUT_SITE}', conf.about_site).replaceAll('{CTA_TITLE}', conf.global_cta_title)
        .replaceAll('{CTA_DESC}', conf.global_cta_desc)
        .replaceAll('{CTA_BUTTON_TEXT}', conf.global_cta_button_text)
        .replaceAll('{CTA_LINK}', conf.global_cta_link);
}

function startAll(){
    let conf = {
        site_name: site_conf.site_name,
        about_site: site_conf.about_site,
        global_cta_title:site_conf.global_cta_title || "",
        global_cta_desc:site_conf.global_cta_desc || "",
        global_cta_button_text:site_conf.global_cta_button_text || "",
        global_cta_link:site_conf.global_cta_link || ""
    }
    axios.get('/submodule/left_tr.html')
        .then(function (response) {
            // handle success
            console.log(response);
            document.getElementById('left').innerHTML=sanitize(response.data, conf);
            document.getElementById('right').innerHTML=sanitize(response.data, conf);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    axios.get('/submodule/footer_tr.html')
        .then(function (response) {
            // handle success
            console.log(response);
            document.getElementById('footer').innerHTML=sanitize(response.data, conf);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    var home = document.getElementById("home");
    if(home){
        axios.get('posts/all.json')
            .then(function (response) {
                // handle success
                console.log(response.data);
                let postsHtml = '';
                const posts_length = response.data.posts.length;
                for (let i = 0; i < posts_length; i++) {
                    if(i%3 === 0){
                        postsHtml = postsHtml + "<div class=\"row\">";
                    }
                    postsHtml = postsHtml + `<div class="col col col-mb-12 col-tb-6 col-pc-6">
                <article class="preview-post">
                    <h2><a href="/posts/${response.data['posts'][i]['slug']}.html">${response.data['posts'][i]['title']}</a></h2>
                    <img src="${response.data['posts'][i]['image_url']}" alt="${response.data['posts'][i]['title']}">
                </article></div>`;
                    if(i%3 === 2 || i === posts_length-1){
                        postsHtml = postsHtml + "</div>";
                    }
                }
                document.getElementById('home').innerHTML=postsHtml;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
}

let s = document.createElement("script");
s.type = "text/javascript";
s.onload= startAll;
s.src = "https://unpkg.com/axios/dist/axios.min.js";
document.body.appendChild(s);