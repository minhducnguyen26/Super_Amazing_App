const server  = require ("./server");
const persist = require("./persist");

const port = process.argv[2] || process.env.PORT || 8080;

persist(()=>{
    server.listen(port, ()=>{
        console.log(`Super Amazing App running on port: ${port}`)
    })
})