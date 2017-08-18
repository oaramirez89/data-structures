function HashTable(){
  this.buckets = new Array(35);
}

Object.defineProperty(HashTable.prototype, 'numBuckets', {
  get: function() { return this.buckets.length;}
});

HashTable.prototype.set = function(key, value){
  if (typeof key !== 'string'){
    throw new TypeError('Keys must be strings');
  }
  let hash = this.hash(key);
  let keyObj = this.buckets[this.hash(key)];

  if (keyObj){
    if (this.get(key)){
      keyObj.removeTail();
    }
    keyObj.addToTail(key, value);
  } else {
    let linkedList = new LinkedList();
    linkedList.addToTail(key, value);
    this.buckets[hash] = linkedList;
  }
}

HashTable.prototype.get = function(key){
  let keyObj = this.buckets[this.hash(key)];
  if (keyObj){
    return keyObj.search(key);
  }
}

HashTable.prototype.hasKey = function(key){
  return (this.get(key)) ? true : false;
}

HashTable.prototype.hash = function(key){
  let hash = 0;

  key.split('').forEach(function(element) {
    hash = hash + element.charCodeAt(0);
  });

  return hash%this.numBuckets;
}

function Node(key, value, previous, next){
    this.next = next || null;
    this.previous = previous || null;
    this.key = key;
    this.value = value;
}

function LinkedList(){
    this.head = null;
    this.tail = null;
}

LinkedList.prototype.addToTail = function (key, value){

    let newNode = new Node(key, value, this.tail);

    if (this.tail){
        this.tail.next = newNode;
    }  else {
        this.head = newNode;
    }

    this.tail = newNode;

}

LinkedList.prototype.addToHead = function(key, value){
    let node = new Node(key, value, null, this.head);

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
    let oldKey = this.head.key;
    this.head = this.head.next;

    if (!this.head){
        this.tail = null;
    } else {
        this.head.previous = null;
    }

    return oldKey;

}

LinkedList.prototype.removeTail = function(){

  if (!this.tail){
    return;
  }

  let oldKey = this.tail.key;
  this.tail = this.tail.previous;

  if (this.tail){
    this.tail.next = null;
  } else {
      this.head = null;
  }

  return oldKey;
}

function isFunction(obj) { return typeof obj === 'function';}

LinkedList.prototype.search = function(predicate){
    var funcToUse = isFunction(predicate) ? predicate : function(key){
        // loose comparison where JS will use the valueOf function in
        // object, if one is defined. Here the specs have defined a
        // valueOf that returns name.
        return key == predicate;
    }

    var currentNode = this.head;

    while (currentNode){
        if (funcToUse(currentNode.key)){
            return currentNode.value;
        }
        currentNode = currentNode.next;
    }

    return null;
}


var hashTable = new HashTable();

hashTable.set('foo', 'val1');
hashTable.set('ofo', 'val2');

console.log(hashTable.get('ofo'));
