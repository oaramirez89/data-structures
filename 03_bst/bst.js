function BinarySearchTree(value){
  this.value = value;
  this.magnitude = 1;
}

BinarySearchTree.prototype.insert = function(value){
  this.magnitude++;
  var direction = value < this.value ? 'left' : 'right';
  if (!this[direction]){
    this[direction] = new BinarySearchTree(value);
  } else {
    this[direction].insert(value);
  }
}

BinarySearchTree.prototype.contains = function(value){
  if (this.value === value) return true;
  var direction = value < this.value ? 'left' : 'right';
  if (!this[direction]){
    return false;
  }
  return this[direction].contains(value);
}

BinarySearchTree.prototype.depthFirstForEach = function(inFunc, option){

  let theOption = option || 'in-order';

  if (theOption === 'pre-order'){
     inFunc(this.value);
  }

  if (this.left){
    this.left.depthFirstForEach(inFunc, option);
  }

  if (theOption === 'in-order') {
    inFunc(this.value);
  }

  if (this.right){
    this.right.depthFirstForEach(inFunc, option);
  }

  if (theOption === 'post-order') {
    inFunc(this.value);
  }
}

BinarySearchTree.prototype.breadthFirstForEach = function(inFunc){
  var queue = [this];
  var tree;

  while (queue.length){
    tree = queue.shift();
    inFunc(tree.value);
    if (tree.left) queue.push(tree.left);
    if (tree.right) queue.push(tree.right);
  }
}

BinarySearchTree.prototype.size = function(){
  return this.magnitude;
}
