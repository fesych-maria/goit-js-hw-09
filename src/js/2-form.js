const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('focus', addPlaceholder, true);

function addPlaceholder(e) {
  if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA') {
    e.target.setAttribute('placeholder', 'Type area');
  }
}

refs.form.addEventListener('blur', removePlaceholder, true);

function removePlaceholder(e) {
  if (e.target.nodeName === 'INPUT' || e.target.nodeName === 'TEXTAREA') {
    e.target.removeAttribute('placeholder');
  }
}

const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
refs.form.addEventListener('input', saveData);

function saveData(e) {
  formData.email = e.currentTarget.querySelector('[name="email"]').value;
  formData.message = e.currentTarget.querySelector('[name="message"]').value;
  saveToLs(STORAGE_KEY, formData);
}

function initPage() {
  const dataFromLs = getFromLs(STORAGE_KEY);
  formData.email = dataFromLs?.email || '';
  formData.message = dataFromLs?.message || '';
  refs.form.querySelector('[name="email"]').value = formData.email;
  refs.form.querySelector('[name="message"]').value = formData.message;
}
initPage();

refs.form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
  } else {
    formData.message = formData.message.trim();
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
    refs.form.reset();
  }
}

function saveToLs(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLs(value) {
  const data = localStorage.getItem(value);
  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch {
    return data;
  }
}
