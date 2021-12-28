import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elements, property) {
        elements.forEach((element, i) => {
            element.addEventListener(event, () => {
                switch(element.nodeName) {
                    case 'SPAN':
                        state[property] = i;
                        break;
                    case 'INPUT':
                        if(element.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[property] = 'Холодное' : state[property] = 'Тёплое';

                            elements.forEach((checkbox, j) => {
                                checkbox.checked = false;
                                if(i == j) {
                                    checkbox.checked = true;
                                }
                            });
                        } else {
                            state[property] = element.value;
                        }
                        break;
                    case 'SELECT':
                        state[property] = element.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;