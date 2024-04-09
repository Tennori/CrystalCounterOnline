function increaseCount(counterNumber) {
    var counterElement = document.getElementById('counter' + counterNumber);
    var countSpan = counterElement.querySelector('span');
    var currentCount = parseInt(countSpan.textContent);
    
    if (isNaN(currentCount)) {
      currentCount = 0;
    }
    
    if (currentCount < 99) { // カウンターが99以下の場合のみ増加
      countSpan.textContent = ('0' + (currentCount + 1)).slice(-2);
      counterElement.classList.add('fadeInOut'); // アニメーションの追加
      setTimeout(function() {
        counterElement.classList.remove('fadeInOut'); // アニメーションの除去
      }, 300); // アニメーションの時間
    }
  }

  function decreaseCount(counterNumber) {
    var counterElement = document.getElementById('counter' + counterNumber);
    var countSpan = counterElement.querySelector('span');
    var currentCount = parseInt(countSpan.textContent);
    
    if (isNaN(currentCount)) {
      currentCount = 0;
    }
    
    if (currentCount > 0) { // カウンターが0より大きい場合のみ減少
      countSpan.textContent = ('0' + (currentCount - 1)).slice(-2);
      counterElement.classList.add('fadeInOut'); // アニメーションの追加
      setTimeout(function() {
        counterElement.classList.remove('fadeInOut'); // アニメーションの除去
      }, 300); // アニメーションの時間
    }
  }

