import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = Array.from(form.elements.state).find(
      radio => radio.checked
    )?.value;

    if (!state) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please select a state!',
        position: 'topRight',
      });
      return;
    }

    console.log(`Creating promise with delay: ${delay}, state: ${state}`);

    createPromise(delay, state)
      .then(({ delay }) => {
        iziToast.success({
          title: 'OK',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#4CAF50',
        });
      })
      .catch(({ delay }) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#F44336',
        });
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve({ delay });
        } else {
          reject({ delay });
        }
      }, delay);
    });
  }
});
