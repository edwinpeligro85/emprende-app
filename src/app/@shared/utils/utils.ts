import { FormArray } from '@angular/forms';

export const normalize = (() => {
  var from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç',
    to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc',
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++) mapping[from.charAt(i)] = to.charAt(i);

  return (str: string) => {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join('');
  };
})();

export const onlyLetters = (e: KeyboardEvent) => {
  const key = e.keyCode || e.which;
  const tecla = String.fromCharCode(key).toLowerCase();
  const letras = ' áéíóúabcdefghijklmnñopqrstuvwxyz';
  const especiales = [8, 37, 39, 46];
  let tecla_especial = false;

  for (let i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }

  return !(letras.indexOf(tecla) == -1 && !tecla_especial);
};

export const codeFranzs = (e: KeyboardEvent) => {
  const key = e.keyCode || e.which;
  const tecla = String.fromCharCode(key).toLowerCase();
  const letras = '0123456789';
  const especiales = [8, 37, 39, 46];

  let teclaEspecial = false;

  for (const i in especiales) {
    if (key === especiales[i]) {
      teclaEspecial = true;
      break;
    }
  }

  return !(letras.indexOf(tecla) === -1 && !teclaEspecial);
};

export function ValidateAges(control: FormArray) {
  if ((control.value as number[]).reduce((acc, val) => acc + val, 0) < 1) {
    return { invalidAge: true };
  }
  return null;
}
