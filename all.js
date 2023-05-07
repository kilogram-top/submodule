var done = false;

function sanitize(text, conf){
    return text.replace('{SITE_NAME}', conf.site_name).replace('{ABOUT_SITE}',conf.about_site);
}

function startAll(){
    let conf = {
        site_name: site_conf.site_name,
        about_site: site_conf.about_site,
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
}

let s = document.createElement("script");
s.type = "text/javascript";
s.onload= startAll;
s.src = "https://unpkg.com/axios/dist/axios.min.js";
document.body.appendChild(s);