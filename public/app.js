var app = new Vue({
    el  : "#app",
    data:  {
        url: "http://localhost:8080",
        texts: []
    },
    methods:{
        getPostsFromServer: function(){
            fetch(`${this.url}/text`).then(function(response){
                console.log("This is the response", response);
                response.json().then(function(data){
                    console.log("This is the data: ", data);
                    app.texts = data;
                })
            })
        }
    }
})