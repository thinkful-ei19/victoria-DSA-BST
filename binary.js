'use strict'

class BST {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (!this.key) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key > this.key && this.left) {
      this.left.find(key);
    } else if (key < this.key && this.right) {
      this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const candidate = this.right._findMin();
        this.key = candidate.key;
        this.value = candidate.value;
        candidate.remove(candidate.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key > this.key && this.left) {
      this.left.remove(key);
    } else if (key < this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }
}

function bst_height(tree) {
	return Math.max(tree.left && bst_height(tree.left),
		tree.right && bst_height(tree.right)) + 1;
}

function isBST(bst){
  if(bst.left){
    if(bst.left.key > bst.key){
      return false;
    }
    if(!isBST(bst.left)){
      return false;
    }
  }
  if(bst.right){
    if(bst.right.key < bst.key){
      return false;
    }
    if(!isBST(bst.right)){
      return false;
    }
  }
  return true;
}

function thirdLargest(node, counter = 1){
  if(!node) return console.log('Tree is too young, not enough digits');
  if(counter === 3) return node.value;
  return thirdLargest(node.right, counter +1) || thirdLargest(node.left, counter +1)
}

function _shortest(tree){
  return Math.min(tree.left && bst_height(tree.left),
		tree.right && bst_height(tree.right)) + 1;
}

function balanced(node){
 return bst_height(node) - _shortest(node) <= 1
}

function main(){
  let test = new BST;
  test.insert(3, 3);
  test.insert(1, 1);
  test.insert(4, 4);
  test.insert(6, 6);
  test.insert(9, 9);
  test.insert(2, 2);
  test.insert(5, 5);
  test.insert(7, 7);
  console.log(balanced(test))
}
main()
