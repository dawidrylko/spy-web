'use strict';

const microphone = new Wit.Microphone(document.getElementById('microphone'));

const info = message => {
  document.getElementById('info').innerHTML = message;
};
const error = message => {
  document.getElementById('error').innerHTML = message;
};

// Microphone part
microphone.onconnecting = () => {
  info('Trwa weryfikowanie mikrofonu');
};
microphone.ondisconnected = () => {
  info('Mikrofon nie jest podłączony');
};
microphone.onready = () => {
  info('Mikrofon gotowy do nagrywania');
}
microphone.onaudiostart = () => {
  info('Nagrywanie rozpoczęte');
  error('');
};
microphone.onaudioend = () => {
  info('Nagrywanie zakończone, trwa konwertowanie');
};
microphone.onerror = errorMessage => {
  error('Błąd: ' + errorMessage);
};

microphone.onresult = (intent, entities) => {
    if (entities.fullName === undefined) {
        document.getElementById('result').innerHTML = 'Nie zrozumiałem, spróbuj jeszcze raz!';
    } else {
        let fullName = entities.fullName.value;
        document.getElementById('result').innerHTML = fullName + '? Szukam na wikipedii...';
        window.open('https://pl.wikipedia.org/wiki/' + fullName.replace(' ', '_'));
    }
};

// Client TOKEN from Wit.ai
microphone.connect('6NHAXMCI2IC23O4IVOQAE5TG5O62CTPD');
