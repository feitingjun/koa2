class cache {
    constructor(props){
        this.values = {}
        this.timer = {}
    }
    set (key,data,expiration){
        if(this.values[key]) clearTimeout(this.timer[key]);
        this.values[key] = data;
        if(expiration){
            this.timer[key] = setTimeout(() => {
                delete this.values[key];
                clearTimeout(this.timer[key]);
                delete this.timer[key];
            }, expiration * 1000);
        }
    }
    get (key){
        if(this.values[key]) return this.values[key];
        return null;
    }
    del (key){
        if(this.values[key]) {
            delete this.values[key];
            if(this.timer[key]) clearTimeout(this.timer[key]);
            delete this.timer[key];
        }
    }
}

export default cache;