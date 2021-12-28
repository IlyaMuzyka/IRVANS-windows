const images = () => {
    const popup = document.createElement('div'),
          section = document.querySelector('.works'),
          bigImg = document.createElement('img');

    popup.classList.add('popup');
    section.appendChild(popup);

    popup.style.display = 'none';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';

    bigImg.style.maxHeight = '90vh';
    bigImg.style.maxWidth = '90%';

    popup.appendChild(bigImg);

    section.addEventListener('click', (e) => {
        e.preventDefault();

        const target = e.target;

        if(target && target.classList.contains('preview')) {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path);
        }

        if(target && target.matches('div.popup')) {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
};

export default images;