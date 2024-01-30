import { getLatLngObj } from 'tle.js'


const tle = `LCS 1                   
1 01361U 65034C   24020.66273891 -.00000002  00000+0 -13044-2 0  9996
2 01361  32.1418 102.9360 0004803 194.4902 165.5458  9.89304467122882`;

console.log(getLatLngObj(tle));