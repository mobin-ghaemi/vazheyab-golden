// Variales
const $ = document;

function My_JavaScript() {
  // Get desktop menu buttons
  const desktopHomeBtn = $.querySelector(".desktop-header #homeButton");
  const desktopSearchBtn = $.querySelector(".desktop-header #searchButton");
  const desktopAboutBtn = $.querySelector(".desktop-header #aboutButton");
  const desktopContactBtn = $.querySelector(".desktop-header #contactButton");
  const themeEditBtn = $.querySelector(".desktop-header #themeEditor");
  // Get System Button in mobile menu
  const openMenuBtn = $.querySelector("#openMenu");
  const closeMenuBtn = $.querySelector("#closeMenu");
  const menuSelf = $.querySelector(".mobile-menu ul");
  // Get mobile menu buttons
  const mobileHomeBtn = $.querySelector(".mobile-header #homeButton");
  const mobileSearchBtn = $.querySelector(".mobile-header #searchButton");
  const mobileAboutBtn = $.querySelector(".mobile-header #aboutButton");
  const mobileContactBtn = $.querySelector(".mobile-header #contactButton");
  const mobileThemeEditBtn = $.querySelector(".mobile-header #themeEditor");
  // Get normal button in this page
  const startSearchBtn = $.querySelector("#startSearch");
  const moreInfoBtn = $.querySelector("#moreInfo");
  const shareBtn = $.querySelector("#shareWeb");
  const scrollToUpBtn = $.querySelector("#moveToTop");
  // Get the search box home form
  const searchHome = $.querySelector("#searchBoxHome");
  // Get Contact Forms
  const sendEmailForm = $.querySelector("#sendEmailForm");
  // Gets Share Btns
  const shareSection = $.querySelector("section.share-website");

  eventListeners();

  function eventListeners() {
    //! after clicked in menu and header button

    // * Desktop
    // after click the home button
    desktopHomeBtn.addEventListener("click", afterHome);
    // After Click the search button
    desktopSearchBtn.addEventListener("click", afterSearch);
    // after click the about button
    desktopAboutBtn.addEventListener("click", afterAbout);
    // After Click the contact button
    desktopContactBtn.addEventListener("click", afterContact);
    // * End Desltop

    // ? Mobile
    // after click the home button
    mobileHomeBtn.addEventListener("click", afterHome);
    // After Click the search button
    mobileSearchBtn.addEventListener("click", afterSearch);
    // after click the about button
    mobileAboutBtn.addEventListener("click", afterAbout);
    // After Click the contact button
    mobileContactBtn.addEventListener("click", afterContact);
    // ? End Mobile

    // ! end codes for menu and header button

    //* Menu Events
    // Open The mobile menu #CALL
    openMenuBtn.addEventListener("click", afterOpenMenu);
    // Close the mobile menu #CALL
    closeMenuBtn.addEventListener("click", afterCloseMenu);
    //* End Menu Events

    // *
    // Open The search page
    if (startSearchBtn) {
      startSearchBtn.addEventListener("click", afterSearch);
    }
    // Open The about page
    if (moreInfoBtn) {
      moreInfoBtn.addEventListener("click", afterAbout);
    }
    // Scroll to top this page
    if (scrollToUpBtn) {
      scrollToUpBtn.addEventListener("click", afterScroll);
    }
    // Edit Website Theme
    themeEditBtn.addEventListener("click", afterEditTheme);
    if (mobileThemeEditBtn) {
      mobileThemeEditBtn.addEventListener("click", afterEditTheme);
    }
    // Share Bank Link
    if (shareBtn) {
      shareBtn.addEventListener("click", afterShare);
    }
    // *

    // After user searchd in home
    if (searchHome) {
      searchHome.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get user query
        const query = $.querySelector(".search-box input").value;

        transmitter.transfer("search").then(() => {
          // Get the spinner
          const spinner = $.querySelector("#loadingSpinner");
          if (query === "") {
            modal("sendInformationModal", "???? ????????", "???????? ?? ???????? ?????????? ????");
          } else {
            const container = $.querySelector(".output .grid");
            container.innerHTML = "";
            if (spinner) {
              spinner.style.display = "block";
            }
            api.create(query, spinner);

            initForm();
          }
        });

        searchHome.reset();
      });
    }

    // Validate Send Email Form
    if (sendEmailForm) {
      sendEmailForm.addEventListener("submit", afterSendFeedbak);
    }

    // Share Buttons events
    shareSection.addEventListener("click", afterShareSection);
  }

  // Functions

  // ! All menu Reactions
  // After Click home button in all menu
  function afterHome(e) {
    transmitter.transfer("../index");
  }
  // After Click search button in all menu
  function afterSearch(e) {
    transmitter.transfer("search").then(() => {
      initForm();
    });
  }
  // init search form when search page initialized
  let counter = 0;
  function initForm() {
    $.querySelector(".search-box").addEventListener("submit", (e) => {
      e.preventDefault();

      counter++;

      // Get the spinner
      const spinner = $.querySelector("#loadingSpinner");

      // Get Query
      const query = $.querySelector(".search-box input").value;

      if (query === "") {
        modal("sendInformationModal", "???? ????????", "???????? ?? ???????? ?????????? ????");
      } else {
        const container = $.querySelector(".output .grid");
        container.innerHTML = "";
        spinner.style.display = "block";
        api.create(query, spinner);
      }

      if (counter > 3) {
        modal(
          "sendInformationModal",
          "???????? ????????????",
          "???????????? ???? ???????? ???? ???????? ?????? ?????????? ?? ?????????????? ?????????? ????????"
        );

        counter = 0;
      }

      $.querySelector(".search-box").reset();
    });
  }

  // After Click home button in all menu
  function afterAbout(e) {
    transmitter.transfer("about");
  }
  // After Click search button in all menu
  function afterContact(e) {
    transmitter.transfer("contact");
  }
  // ! End Codes for all menu button reaction

  //* Mobile Menu Funcs
  // Open Mobile Menu
  function afterOpenMenu() {
    $.querySelector(".mobile-menu ul").style.width = "70vw";
  }
  // Close mobile menu
  function afterCloseMenu() {
    $.querySelector(".mobile-menu ul").style.width = "0px";
  }
  // * end mobile funcs

  // ? Normal Button this page funcs

  // Soft Scroll to 0,0 this page
  function afterScroll() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // After Clicked Edit Website theme (default == go to the dark theme)
  function afterEditTheme() {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
  }
  // after clicked in share btn for share link
  function afterShare() {
    // Get close this sec button
    const closeThis = $.querySelector("#closeSec");
    closeThis.addEventListener("click", () => {
      shareSection.style.opacity = "0";
      shareSection.style.zIndex = "-100";
    });
    shareSection.style.opacity = "10";
    shareSection.style.zIndex = "10";
  }
}

// After send email in me or send feedbak in me | my email
function afterSendFeedbak(e) {
  // My Email
  const myEmail = "mobinghaemi@yahoo.com";
  // Reset Default Reactions
  e.preventDefault();
  // Get Contents
  const userName = e.target.querySelector("input#userName").value;
  const userTitle = e.target.querySelector("input#userTitle").value;
  const userText = e.target.querySelector("#userText").value;

  location.assign(
    `mailto:${myEmail}?subject=${userTitle}&body=${userName},${userText}`
  );
}

// Share Btns after click
function afterShareSection(e) {
  const myLink = "whatsapp://send?text=http://www.example.com";
  // Create Social Media link
  const whatsApp = `https://wa.me/?text=${myLink}`;
  const telegram = `tg://msg?text=${myLink}`;

  if (e.target.className === "fa fa-clipboard") {
    modal("sendInformationModal", "?????????? ????????", "???????? ?????????? ???????????? ?????? ????");
    clipboard.copy("https://idpay.ir/protect-word");
  }
  if (e.target.className === "fab fa-telegram") {
    modal(
      "sendInformationModal",
      "??????????",
      "???????? ???????????? ?????????? ???? ???????? ???????????? ???????????????? ?????? ???? ???????? ????????"
    );

    location.assign(telegram);
  }
  if (e.target.className === "fab fa-whatsapp") {
    location.assign(whatsApp);
  }
}
