import saudacaoPadrao, { ehPar, PI as constantePI } from './utils';
//      ^-- import default  ^-- imports nomeados (podem ser renomeados com 'as')

console.log(saudacaoPadrao("Estudante"));
console.log(`O número 4 é par? ${ehPar(4)}`);
console.log(`Valor de PI: ${constantePI}`);