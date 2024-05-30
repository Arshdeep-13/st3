const http = require('http');
const fs = require('fs')
const QueryString = require('url');

try{
    http.createServer( (req, res) => {
        const comingUrl = QueryString.parse(req.url, true);

        if(comingUrl.pathname === '/'){
            const data = fs.readFileSync('./index.html', 'utf-8');
            res.setHeader('Content-type', 'text/html');
            res.write(data);
        }
        else if(comingUrl.pathname === '/style.css'){
            const data = fs.readFileSync('./style.css', 'utf-8');
            res.setHeader('Content-type', 'text/css');
            res.write(data);
        } 
        else if(comingUrl.pathname === '/addtask'){
            if(req.method === 'POST'){
                let body = '';

                req.on('data', (chunk) => {
                    body += chunk;
                })

                req.on('end', () => {
                    const formData = JSON.parse(body);

                    let arr = fs.readFileSync('./todo.json', 'utf-8');
                    arr = JSON.parse(arr);

                    arr.push(formData);
                    fs.writeFileSync('./todo.json', JSON.stringify(arr));
                })
            }
            else{
                res.write("Make the post request only")
            }
        }
        else if(comingUrl.pathname === '/tasks'){
            let arr = fs.readFileSync('./todo.json', 'utf-8');
            arr = JSON.parse(arr);
            let ans = [];

            for(elem of arr){
                if(elem.status === comingUrl.query.status){
                    ans.push(elem);
                }
            }

            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify(ans));
        }
        else if(comingUrl.pathname === '/read'){
            let arr = fs.readFileSync('./todo.json', 'utf-8');
            res.setHeader('Content-type', 'application/json');
            res.write(arr);
        }
        else if(comingUrl.pathname === '/delete'){
            let arr = fs.readFileSync('./todo.json', 'utf-8');
            arr = JSON.parse(arr);
            let ans = [];

            for(elem of arr){
                if(elem.id !== comingUrl.query.id){
                    ans.push(elem);
                }
            }

            res.setHeader('Content-type', 'application/json');
            fs.writeFileSync('./todo.json', JSON.stringify(ans));
            res.write(JSON.stringify(ans));
        }
        else{
            const data = fs.readFileSync('./error.html', 'utf-8');
            res.setHeader('Content-type', 'text/html');
            res.write(data);
        }

        res.end();
    }).listen(3000, () => {
        console.log("Server started...")
    })
}
catch(err){
    console.log("Unable to start server...")
}