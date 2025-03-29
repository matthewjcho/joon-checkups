const submit = document.getElementById('submit-button');

const firstNameInput = document.getElementById('first-name-box');
const lastNameInput = document.getElementById('last-name-box');
const positionInput = document.getElementById('position-box');

const responsesInputs = document.getElementsByTagName('textarea');

const sliders = document.getElementsByTagName('a');


document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/results')
    .then(response => response.json())
    .then(data => console.log(data));

    firstNameInput.value = '';
    lastNameInput.value = '';
    responsesInputs.value = '';

    for (let i = 0; i < responsesInputs.length; i++) {
        responsesInputs[i].value = '';
    }

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].style.backgroundColor = '#9198e5';
    }
})

submit.onclick = function() {
    firstNameInput.style.borderColor = 'rgb(227, 236, 240';
    lastNameInput.style.borderColor = 'rgb(227, 236, 240';
    positionInput.style.borderColor = 'rgb(227, 236, 240';

    for (let i = 0; i < responsesInputs.length; i++) {
        responsesInputs[i].style.borderColor = 'initial';   
    }
    
    for (let i = 0; i < sliders.length; i++) {
        sliders[i].style.backgroundColor = '#9198e5'
    }

    checkIdentity();
}


async function checkIdentity() {
    let identity = false;
    let responses = false;

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const position = positionInput.value.trim();
    
    if (firstName.length === 0 && lastName.length === 0 && position.length === 0) {
        firstNameInput.style.borderColor = 'red';
        lastNameInput.style.borderColor = 'red';
        positionInput.style.borderColor = 'red';
    }
    else if (firstName.length === 0 && lastName.length === 0) {
        firstNameInput.style.borderColor = 'red';
        lastNameInput.style.borderColor = 'red';
    }
    else if (firstName.length === 0 && position.length === 0) {
        firstNameInput.style.borderColor = 'red';
        positionInput.style.borderColor = 'red';
    }
    else if (lastName.length === 0 && position.length === 0) {
        lastNameInput.style.borderColor = 'red';
        positionInput.style.borderColor = 'red';
    }
    else if (firstName.length === 0) {
        firstNameInput.style.borderColor = 'red';
    }
    else if (lastName.length === 0) {
        lastNameInput.style.borderColor = 'red';
    }
    else if (position.length === 0) {
        positionInput.style.borderColor = 'red';
    }
    else {
        const name = `${firstName} ${lastName}`;
        localStorage.setItem('name', name);
        identity = true;
    }

    if (identity === false) {
        const slidernav1 = document.getElementById('slidernav-1');
        slidernav1.style.backgroundColor = 'red';
    }

    
    const memberName = localStorage.getItem('name');    
    const response1Input = document.querySelector('input[name = "feelings"]:checked');
    
        if (response1Input) {
            const response1 = response1Input.value;
            localStorage.setItem('response1', response1);
        }
        else {
            const slidernav2 = document.getElementById('slidernav-2');
            slidernav2.style.backgroundColor = 'red';
        }

    const response2Input = document.getElementById('textarea1');
    const response3Input = document.getElementById('textarea2');
    const response4Input = document.getElementById('textarea3');
    const response5Input = document.getElementById('textarea4');

    const response1 = localStorage.getItem('response1');
    const response2 = response2Input.value.trim();
    const response3 = response3Input.value.trim();
    const response4 = response4Input.value.trim();
    const response5 = response5Input.value.trim();

        if (response2.length === 0) {
            response2Input.style.borderColor = 'red';

            const slidernav3 = document.getElementById('slidernav-3');
            slidernav3.style.backgroundColor = 'red';
        }

        if (response3.length === 0) {
            response3Input.style.borderColor = 'red';

            const slidernav4 = document.getElementById('slidernav-4');
            slidernav4.style.backgroundColor = 'red';
        }

        if (response4.length === 0) {
            response4Input.style.borderColor = 'red';
            
            const slidernav5 = document.getElementById('slidernav-5');
            slidernav5.style.backgroundColor = 'red';
        }

        if (response5.length === 0) {
            response5Input.style.borderColor = 'red';
            
            const slidernav6 = document.getElementById('slidernav-6');
            slidernav6.style.backgroundColor = 'red';
        }

        if (response2.length > 0 && response3.length > 0 && response4.length > 0 && response5.length > 0) {
            responses = true;
        }

        if (identity && responses) {
            const submission = {
                memberName, response1, response2, response3, response4, response5
            }

            try {
                const response = await fetch('http://localhost:8080/results', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(submission)
                })
                const data = await response.json();
                console.log('Data sent successfully', data);
            }

            catch (error) {
                console.error('Error sending data');
            }

            const leftSlider = document.getElementById('left-slider');
            const leftSliderNav = document.querySelector('.slider-nav');
            const finalSlide = document.getElementById('final-slide');
            finalSlide.style.display = 'block';
            
            if (finalSlide) {
                leftSlider.style.display = 'none';
                leftSliderNav.style.display = 'none';

            }
        }

}
