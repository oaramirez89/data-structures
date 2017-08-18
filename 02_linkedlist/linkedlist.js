function Node(value, previous, next){
    this.next = next || null;
    this.previous = previous || null;
    this.value = value;
}

function LinkedList(){
    this.head = null;
    this.tail = null;
}

LinkedList.prototype.addToTail = function (value){

    let newNode = new Node(value, this.tail);

    if (this.tail){
        this.tail.next = newNode;
    }  else {
        this.head = newNode;
    }

    this.tail = newNode;

}

LinkedList.prototype.addToHead = function(value){
    let node = new Node(value, null, this.head);

    if (!this.head){
        this.tail = node;
    } else {
        this.head.previous = node;
    }

    this.head = node;
}

LinkedList.prototype.removeHead = function (){

    if (!this.head){
      return;
    }
    let oldValue = this.head.value;
    this.head = this.head.next;

    if (!this.head){
        this.tail = null;
    } else {
        this.head.previous = null;
    }

    return oldValue;

}

LinkedList.prototype.removeTail = function(){

  if (!this.tail){
    return;
  }

  let oldValue = this.tail.value;
  this.tail = this.tail.previous;

  if (this.tail){
    this.tail.next = null;
  } else {
      this.head = null;
  }

  return oldValue;
}

function isFunction(obj) { return typeof obj === 'function';}

LinkedList.prototype.search = function(predicate){
    var funcToUse = isFunction(predicate) ? predicate : function(value){
        // loose comparison where JS will use the valueOf function in
        // object, if one is defined. Here the specs have defined a
        // valueOf that returns name.
        return value == predicate;
    }

    var currentNode = this.head;

    while (currentNode){
        if (funcToUse(currentNode.value)){
            return currentNode.value;
        }
        currentNode = currentNode.next;
    }

    return null;
}
