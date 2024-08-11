'use strict';

const settingsBtn = document.querySelector('.settings-btn');
const settingsModal = document.querySelector('.settings-modal')
const settingsCloseBtn = document.querySelector('.close-settings-btn');
const testmodeCheckbox = document.querySelector('.test-mode-checkbox');
const credentialsBtns = [document.getElementById('my-test-credentials'), document.getElementById('techsupport-credentials')];
const credentials = {
    'my-test-credentials': ['GoID', 'ClientSecret', 'ClientID', true],
    'techsupport-credentials': ['GoID', 'ClientSecret', 'ClientID', false]
};
const goidInput = document.getElementById('goid');
const clientidInput = document.getElementById('clientid');
const clientsecretInput = document.getElementById('clientsecret');
const urlInput = document.getElementById('url');
const overlay = document.querySelector('.overlay');
const paymentForm = document.getElementById('payment-form');
const recurrenceCheckbox = document.getElementById('recurrence-checkbox');
const recurrenceContainer = document.querySelector('.recurrence-container');
const paymentIDInput = document.getElementById('paymentID-input');
const statusModal = document.querySelector('.status-modal');
const statusMessage = document.getElementById('status-message');
const statusCloseBtn = document.querySelector('.close-status-btn');
const errorModal = document.querySelector('.error-modal');
const errorMessage = document.getElementById('error-message');
const errorCloseBtn = document.querySelector('.close-error-btn');
const validationModal = document.querySelector('.validation-modal');
const validationCloseBtn = document.querySelector('.close-validation-btn');

// Kontrola URL parametrů po načtení stránky 
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Načtení credentials ze session storage a doplnění do inputů
    if (sessionStorage.getItem('goid')) {
        goidInput.value = sessionStorage.getItem('goid');;
        clientidInput.value = sessionStorage.getItem('clientid');
        clientsecretInput.value = sessionStorage.getItem('clientsecret');
        testmodeCheckbox.checked = (sessionStorage.getItem('testmode') === 'true');
        urlInput.value = sessionStorage.getItem('url');
    }

    // Načtení ID platby a provedení dotazu na stav
    if (urlParams.has('id')) {
        paymentIDInput.value = urlParams.get('id');
        paymentForm.action = 'php/status.php';
        paymentForm.submit();
    }

    // Načtení stavu platby pokud byl proveden a zobrazení stavu platby
    if (urlParams.has('status')) {
        const data = JSON.parse(decodeURIComponent(urlParams.get('status')));

        // Pokud je platba opakovaná
        let reccurenceState = "";
        if (data.recurrence)
            reccurenceState = `(RECURRENCE ${data.recurrence.recurrence_state})`;

        statusMessage.textContent = `ID: ${data.id} > ${data.state} ${reccurenceState}`;
        paymentIDInput.value = data.id;
        statusModal.classList.remove('hidden');
    }

    // Načtení validace credentials a zobrazení okna
    if (urlParams.has('validCredentials')) {
        validationModal.classList.remove('hidden');
        setTimeout(() => validationModal.classList.add('hidden'), 2000);
    }

    // Načtení a zobrazení chybové zprávy
    if (urlParams.has('error')) {
        errorMessage.textContent = urlParams.get('error');
        errorModal.classList.remove('hidden');
    }
});

// Odeslání formuláře 
paymentForm.addEventListener('click', function (e) {
    // Kontrola tlačítka a přiřazení php scriptu
    if (e.target.classList.contains('btn-submit')) {
        const id = e.target.getAttribute('id');
        paymentForm.action = `php/${id}.php`;

        // Uložení credentials do session storage před odesláním
        sessionStorage.setItem('goid', goidInput.value);
        sessionStorage.setItem('clientid', clientidInput.value);
        sessionStorage.setItem('clientsecret', clientsecretInput.value);
        sessionStorage.setItem('testmode', testmodeCheckbox.checked);
        sessionStorage.setItem('url', urlInput.value);

        paymentForm.submit();
    }
});

// Změna stavu checkboxu opakované platby a zobrazení / skrytí parametrů opakované platby
recurrenceCheckbox.addEventListener('change', function () {
    if (recurrenceCheckbox.checked) {
        recurrenceContainer.style.opacity = 100;
        recurrenceContainer.querySelectorAll('*').forEach(element => element.disabled = false);
    } else {
        recurrenceContainer.style.opacity = 0;
        recurrenceContainer.querySelectorAll('*').forEach(element => element.disabled = true);
    }
});

// Zavření settings modálu
const closeSettings = function () {
    settingsModal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Otevření settings modálu
settingsBtn.addEventListener('click', function () {
    settingsModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});
overlay.addEventListener('click', closeSettings);

// Zavření settings modálu escapem
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !settingsModal.classList.contains('hidden'))
        closeSettings();
});

// Změna url dle stavu checkboxu test mode
const changeUrl = () => testmodeCheckbox.checked ?
    urlInput.value = 'https://gw.sandbox.gopay.com/api' : urlInput.value = 'https://gate.gopay.cz/api';

testmodeCheckbox.addEventListener('change', changeUrl);

// Doplnění credentials do příslušných polí z credentials mapy
credentialsBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        goidInput.value = credentials[btn.id][0];
        clientsecretInput.value = credentials[btn.id][1];
        clientidInput.value = credentials[btn.id][2];
        testmodeCheckbox.checked = credentials[btn.id][3];
        changeUrl();
    });
});

// Close tlačítka, zavření modálů
settingsCloseBtn.addEventListener('click', function (e) {
    e.preventDefault();
    closeSettings();
});
statusCloseBtn.addEventListener('click', () => statusModal.classList.add('hidden'));
errorCloseBtn.addEventListener('click', () => errorModal.classList.add('hidden'));
validationCloseBtn.addEventListener('click', () => validationModal.classList.add('hidden'));