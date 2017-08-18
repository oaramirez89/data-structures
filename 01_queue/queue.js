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
    if (this.size() === 0) return;

    let item = this.list[this.head];

    // extra credit. removing processed items in queue.
    // Define criteria when to execute code. Here we select
    // when we have processed 100 items.
    if (this.head > 99){
        this.list = this.list.slice(this.head);
        this.tail = this.tail - this.head
        this.head = 0;
    }

    this.head++;
    return item;
}

Queue.prototype.size =  function (){
    return this.tail - this.head;
}
