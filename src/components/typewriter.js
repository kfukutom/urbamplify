// typewriter.js
// Developed by @kfukutom

// Helper Sleep Function
// REQUIRES: None
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function writeLoop(element, phrases, baseSleepTime = 200) {
  let curPhraseIndex = 0;

  while (true) {
    let curWord = phrases[curPhraseIndex];

    // Typing effect
    for (let i = 0; i < curWord.length; i++) {
      element.innerText = curWord.substring(0, i + 1);
      
      // Adjust typing speed: faster for some characters (e.g., vowels)
      const char = curWord[i];
      let sleepTime = baseSleepTime;
      if ("aeiouAEIOU".includes(char)) {
        sleepTime = baseSleepTime / 2;  // Speed up for vowels
      }
      
      await sleep(sleepTime);
    }

    await sleep(baseSleepTime * 10);

    // Deleting effect
    for (let i = curWord.length; i > 0; i--) {
      element.innerText = curWord.substring(0, i - 1);

      // Faster delete speed
      await sleep(baseSleepTime / 2);
    }

    await sleep(baseSleepTime * 5);

    // Move to the next phrase or loop back to the start
    if (curPhraseIndex === phrases.length - 1) {
      curPhraseIndex = 0;
    } else {
      curPhraseIndex++;
    }
  }
}
