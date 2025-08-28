fetch('http://localhost:3000/api/users/21' , {
    method : 'PATCH' , 
    headers : {
        "content-type" : 'application/json'
    } ,
    body : JSON.stringify({
        "name": "Heno",
        "age": 40,
        "email": "henripetrosyan47@gmail.com",
        "role": "user"
      })
}).then((res) => res.json()).then((res) => console.log(res))