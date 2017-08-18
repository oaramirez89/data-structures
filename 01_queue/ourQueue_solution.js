function Queue(){
    this.head = 0;
    this.tail = 0;
    this.list = [ ];
}

Queue.prototype.enqueue =  function (num){
    this.list[this.tail] = num;
    this.tail++;
}

Queue.prototype.dequeue =  function (){
    let item = this.list[this.head];
    this.head++;
    return item;
}

Queue.prototype.size =  function (){
    return this.tail - this.head;
}
