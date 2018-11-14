Array.prototype._map = function(f){
    let arr = [];
    for(let i=0;i<this.length;i++){
        arr.push(new Promise((resolve, reject) => {
            // const fu = f.call(null,this[i],i);
            const item = f(this[i],i);
            resolve(item);
        }))
    }
    return Promise.all(arr);
}