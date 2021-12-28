import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');

    const messages = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся.',
        failure: 'Что-то пошло не так :('
    };

    checkNumInputs('input[name="user_phone"]');

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messages.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        });
    };

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);

            const formData = new FormData(form);

            if(form.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = messages.success;
                })
                .catch(() => statusMessage.textContent = messages.failure)
                .finally(() => {
                    clearInputs();
                    for(let key in state) {
                        delete state[key];
                    }
                    setTimeout(() => {
                        statusMessage.remove();
                        windows.forEach(window => {
                            window.style.display = 'none';
                        });
                    }, 5000);
                });
        });
    });
};

export default forms;