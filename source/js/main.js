// HAMBURGER
let hamburger = document.querySelector('.hamburger');
let headerMenu = document.querySelector('.header__menu');
let headerMenuItem = document.querySelectorAll('.header__menu-item');

function openMenu() {
  hamburger.classList.toggle('is-active');
  headerMenu.classList.toggle('header__menu--active');
  document.body.classList.toggle('no-scroll');
}

function closeMenu() {
  hamburger.classList.remove('is-active');
  headerMenu.classList.remove('header__menu--active');
  document.body.classList.remove('no-scroll');
}

hamburger.addEventListener('click', () => {
  openMenu();
})

headerMenuItem.forEach(item => {
  item.addEventListener('click', () => {
    closeMenu();
  })
})

// Бегущая строка
const ticker = new Swiper('.ticker', {
  slidesPerView: 'auto',
  speed: 12000,
  loop: true,
  autoplay: {
    delay: 0,
  },
});

// MODAL
// Get the modal
let modal = document.querySelector('[data-modal="modal"');

// Get the button that opens the modal
let modalBtns = document.querySelectorAll('[data-modal="btn"');

// Get the <span> element that closes the modal
let modalCloseBtn = modal.querySelector(".close");

// When the user clicks on the button, open the modal
modalBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = "block";
  })
})

// When the user clicks on <span> (x), close the modal
modalCloseBtn.addEventListener('click', () => {
  modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
document.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
})

// Отправка заявки из формы в телеграм
let modalForm = document.querySelector('.modal-form');
let modalSubmit = document.querySelector('.modal-submit');
let modalFromTitle = document.querySelector('.modal-from__title');
let modalInputName = document.querySelector('.modal-input--name');
let modalInputTel = document.querySelector('.modal-input--tel');
let botToken = '5288895801:AAEdIRj9GSDxwsVJdeTYYBlYyftbtfrSxg8';
let chatId = '-1001675747485';

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = modalInputName.value;
  let tel = modalInputTel.value;

  text = `Всем приветики, мои сладкие! ❤️ Прилетела заявочка от писечки по имени <b>${name}</b> с номером телефона <b>${tel}</b>`;
  
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${text}`)

  modalFromTitle.textContent = 'Ваша заявка отправлена!'
  modalFromTitle.style.marginBottom = '0';
  modalInputName.style.display = 'none';
  modalInputTel.style.display = 'none';
  modalSubmit.style.display = 'none';

  setTimeout(() => {
    modal.click();
  }, 3000)
})

// Portfolio
document.addEventListener("DOMContentLoaded", () => {
  let portfolioPhotosList = document.querySelector('.portfolio__photos-list');

  let i = 0;
  let arrayPhotos = [];

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  while (arrayPhotos.length < 19) {
    let newNumber = getRandomIntInclusive(0, 18);
    if (arrayPhotos.indexOf(newNumber) === -1) {
      arrayPhotos.push(newNumber)
    }
  }

  while (i <= 18) {
    let newPortfolioPhotosListItem = document.createElement('li');
    newPortfolioPhotosListItem.classList.add('portfolio__photos-list-item');

    let newPortfolioPhotoLink = document.createElement('a');
    newPortfolioPhotoLink.href = `../img/portfolio-${arrayPhotos[i]}.jpg`;
    newPortfolioPhotoLink.dataset.fancybox = 'gallery';

    let newPortfolioPhoto = document.createElement('img');
    newPortfolioPhoto.src = `../img/portfolio-${arrayPhotos[i]}-preview.jpg`;
    newPortfolioPhoto.classList.add('portfolio__photo');

    newPortfolioPhotoLink.append(newPortfolioPhoto)
    newPortfolioPhotosListItem.append(newPortfolioPhotoLink)
    portfolioPhotosList.append(newPortfolioPhotosListItem)

    i++
  }

  let portfolioPhoto = document.querySelectorAll('.portfolio__photo');

  function hidePhotos(target) {
    portfolioPhoto.forEach((otherItem) => {
      if (otherItem != target) {
        otherItem.style.opacity = 0
        otherItem.style.transition = `opacity ${0.3 * getRandomIntInclusive(1, 7)}s linear`
      }
    })
  }

  function showPhotos() {
    portfolioPhoto.forEach(item => {
      item.style.opacity = 1
    })
  }

  let counter

  document.addEventListener('mouseover', (e) => {
    clearTimeout(counter)
    if (e.target.classList.contains('portfolio__photo')) {
      counter = setTimeout(() => {
        hidePhotos(e.target)
        e.target.addEventListener('mouseout', showPhotos)
      }, 3000);
    }
  })
})
