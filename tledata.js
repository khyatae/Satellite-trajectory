
fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle')
.then(res=>{
  return res.json();
})
.then(data=>{
  data.forEach(user=>{
    const markup=`<li>${user}</li>`;
    const canvas = document.querySelector('.web');
     canvas.insertAdjacentHTML('beforeend', markup);
    const renderer=new THREE.WebGLRenderer({canvas})
    
  });
})