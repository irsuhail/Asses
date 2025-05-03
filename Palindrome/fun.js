

function checkPalindrome(word) {
    const reversed = word.split('').reverse().join('');
    return word.toLowerCase() === reversed.toLowerCase();
  }
  
  function countVowels(word) {
    const vowels = 'aeiou';
    return [...word.toLowerCase()].filter(char => vowels.includes(char)).length;
  }
  
  module.exports = {
    checkPalindrome,
    countVowels,
  };
  