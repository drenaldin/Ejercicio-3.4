let aciertos = 0;
let errores = 0;

function generateQuestion() {
    const_max_num = 50;
    const num1 = Math.floor(Math.random() * const_max_num);
    const num2 = Math.floor(Math.random() * const_max_num);
    const num3 = Math.floor(Math.random() * const_max_num);
    let correctAnswer;
    let questionText;
    if(aciertos < 5){
      correctAnswer = num1 + num2;
      questionText = `${num1} + ${num2}`;
    }else if (aciertos < 10){
      const numCase = Math.floor(Math.random() * 2);
      switch (numCase) {
          case 0:
              correctAnswer = num1 + num2;
              questionText = `${num1} + ${num2}`;
              break;
          case 1:
              correctAnswer = num1 - num2;
              questionText = `${num1} - ${num2}`;
              break;
      }
    } else{
      const numCase = Math.floor(Math.random() * 3);
        switch (numCase) {
            case 0:
                correctAnswer = num1 + num2 + num3;
                questionText = `${num1} + ${num2} + ${num3}`;
                break;
            case 1:
                correctAnswer = num1 - num2 - num3;
                questionText = `${num1} - ${num2} - ${num3}`;
                break;
            case 2:
                correctAnswer = num1 - num2 + num3;
                questionText = `${num1} - ${num2} + ${num3}`;
                break;
        }
    }
    document.getElementById('question').textContent = `¿Cuál es el resultado de ${questionText}?`;
  
    const options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
        if (options.size == 1){
            const fake = correctAnswer + Math.floor(Math.random() * 10 - 5);
            if (fake !== correctAnswer && fake >= 0) {
            options.add(fake);
          }
        }
        if (options.size == 2 ){
            fake = correctAnswer + Math.floor(Math.random() * 40 - 20);
            if (Math.abs(correctAnswer - fake) > 5) {
                if (fake !== correctAnswer && fake >= 0) {
                options.add(fake);
            }
          }
        }
        if (options.size == 3 ) {
            fake = correctAnswer + Math.floor(Math.random() * 100 - 50);
            if (Math.abs(correctAnswer - fake) > 5) {
                if (fake !== correctAnswer && fake >= 0) {
                options.add(fake);
            }
          }
        }
    }
  
    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
  
    shuffled.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(option, correctAnswer);
      optionsContainer.appendChild(button);
    });
  
    document.getElementById('feedback').textContent = '';
  }
  
  function checkAnswer(selected, correct) {
    const feedback = document.getElementById('feedback');
    if (selected === correct) {
      feedback.textContent = '¡Correcto!';
      feedback.style.color = 'green';
      aciertos++;
    } else {
      feedback.textContent = 'Incorrecto.';
      feedback.style.color = 'red';
      errores++;
    }
    
    updateCounters();
    setTimeout(generateQuestion, 1000);
  }
  

  function updateCounters() {
    document.getElementById('aciertos').textContent = aciertos;
    document.getElementById('errores').textContent = errores;
  }

  document.addEventListener('DOMContentLoaded', generateQuestion);
  