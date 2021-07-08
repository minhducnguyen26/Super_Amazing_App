var app = new Vue({
    el  : "#app",
    data:  {
        author: "",
        newText: "",
        texts: [],
        server_url: "http://localhost:8080",

    },
    methods:{









        postText: function(){
            //if(this.author != null && this.author != "" && this.newText != null && this.newText != ""){
                myData = {
                    author: this.author,
                    text: this.newText
                }
                fetch(this.server_url+"/text", {
                    method: "POST",
                    body: JSON.stringify(myData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(response){
    
                })

                this.texts.push(myData)
            //}
        }
    }
})








