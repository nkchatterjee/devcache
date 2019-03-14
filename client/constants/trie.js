// Create a prefix tree (words with common prefixes are under the same sequence of edges)
const Trie = function(value = '') {
  this.value = value;
  this.isEnd = false;
  this.children = {};
}

// Insert a new word
Trie.prototype.insert = function (string) {
  // what do we want to actually do here
  // rubber meets the roaaaaaad
  let curNode = this;

  // iterate over string will be happening
  for (let i = 0; i < string.length; i += 1) {
    const curChar = string[i];
    // we want to add the firstChar as a key in the children object of the head of the trie
    if (!curNode.children[curChar]) {
      curNode.children[curChar] = new Trie(curChar);
    }
    if (i === string.length - 1) {
      curNode.children[curChar].isEnd = true;
    }
    // successive characters should be added as keys into the children of the firstChar node
    // if any of those keys already exist, we want to traverse down and see if those chars exist in the next node
    curNode = curNode.children[curChar];
  }
};

// Returns true or false, depending on whether the word/prefix is contained in the tree
Trie.prototype.find = function (string) {
  let curNode = this;
  for (let i = 0; i < string.length; i++) {
    const curChar = string[i];
    if (!curNode.children[curChar]) {
      return false;
    }
    if (i === string.length - 1) {
      return curNode.children[curChar].isEnd;
    }
    curNode = curNode.children[curChar];
  }
};

// traverses remaining nodes after reaching the end of the string
// returns array of matches, ordered in the order that they were inserted
Trie.prototype.findChildren = function (string) {

  console.log('we are searching for...',string)
  // array of all found 'isEnd' strings
  const output = [];

  let curNode = this;

  for (let i = 0; i < string.length; i += 1) {
    const curChar = string[i];
    // console.log('curChar', curChar)
    if (!curNode.children[curChar]) {
      return [];
    } else {
      curNode = curNode.children[curChar];
    }
  }


  // our recursive dive into the great unknown of the trie
  const dumpTheRest = (node, str) => {
    const childKeys = Object.keys(node.children);
    // check if CurNode has isEnd is true
    if (node.isEnd === true) {
      output.push(str);
    }

    if (!childKeys.length) {
      return;
    } else {
      for (let i = 0; i < childKeys.length; i += 1) {
        const curKey = childKeys[i];
        // console.log('curKey is', curKey);
        dumpTheRest(node.children[curKey], str + childKeys[i]);

      }
    }
  }

  dumpTheRest(curNode, string);

  return output;
}

export default Trie;