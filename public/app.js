var app = new Vue({
    el  : "#app",
    data:  {
        author : "",
        newText: "",
        texts  : [],
        server_url: "http://localhost:8080",
    },
    created() {     
    setInterval(() => {
        this.getPostsFromServer();
    }, 100);
    },
    methods:{
        postText: function(){
            myData = {
                author: this.author,
                text  : this.newText
            }
            
            fetch(this.server_url + "/text", {
                method: "POST",
                body: JSON.stringify(myData),
                headers: { "Content-Type": "application/json" }
            }).then(function(response){
                // check to see if there is any error
                if(response.status == 400) {
                    response.json().then(function(data) {
                        alert(data.msg)
                    })
                } else if(response.status == 201) {
                    // update the messages list
                    app.getPostsFromServer();

                    // clear all inputs in the new text message input fields
                    app.author  = "";
                    app.newText = "";
                }
            })
        },
        getPostsFromServer: function(){
            fetch(`${this.server_url}/text`).then(function(response){
                response.json().then(function(data){
                    app.texts = data;
                })
            })
        }
    }
})