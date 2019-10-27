import axios from "axios";
export default class QueueHandler {

    constructor () { // not passing any "queryFunction" parameter
        this.requesting = false;
        this.stack = [];
    }
    
    //instead of an "options" object I pass the api and the param for the "add" function. 
    //Using the options object caused errors.
    
    add (api, param) { 
        if (this.stack.length < 2) {
            return new Promise ((resolve, reject) => {
                this.stack.push({
                    api,
                    param,
                    resolve,
                    reject
                });
                this.makeQuery()
            })
        }
        return new Promise ((resolve, reject) => {
            this.stack[1] = {
                api,
                param,
                resolve,
                reject
            };
            this.makeQuery()
        })
    
    }

    addPost (api, data, param) { 
        if (this.stack.length < 2) {
            return new Promise ((resolve, reject) => {
                this.stack.push({
                    api,
                    data,
                    param,
                    resolve,
                    reject
                });
                this.makeQuery(true)
            })
        }
        return new Promise ((resolve, reject) => {
            this.stack[1] = {
                api,
                data,
                param,
                resolve,
                reject
            };
            this.makeQuery(true)
        })
    
    }
    
    makeQuery (post=false) {
        if (! this.stack.length || this.requesting) {
            return null
        }
    
        this.requesting = true;
    // here I call fetch as a default with my api and param
        if(post){
            axios.post(this.stack[0].api, this.stack[0].data, this.stack[0].param).then(response => {
                this.stack[0].resolve(response);
                this.requesting = false;
                this.stack.splice(0, 1);
                this.makeQuery(true)
            }).catch(error => {
                this.stack[0].reject(error);
                this.requesting = false;
                this.stack.splice(0, 1);
                this.makeQuery(true)
            })
        }else{
            axios.get(this.stack[0].api, this.stack[0].param).then(response => {
                this.stack[0].resolve(response);
                this.requesting = false;
                this.stack.splice(0, 1);
                this.makeQuery()
            }).catch(error => {
                this.stack[0].reject(error);
                this.requesting = false;
                this.stack.splice(0, 1);
                this.makeQuery()
            })
        }
        
    }
    }