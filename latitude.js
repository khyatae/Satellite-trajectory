function calcPosFromLatLonRad(lat,lon,radius){
  
    var phi   = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);

    x = -(radius * Math.sin(phi)*Math.cos(theta));
    z = (radius * Math.sin(phi)*Math.sin(theta));
    y = (radius * Math.cos(phi));
  
    return [x,y,z];

}
latlons = [[40.7142700,-74.0059700], [52.5243700,13.4105300]];

latlons = [[40.7142700,-74.0059700], [52.5243700,13.4105300]];
	function addPoints(){
		var meshes= THREEx.Planets.createRandomPoints()	;
		for(var i = 0; i< meshes.length; i++ ){
			mesh = meshes[i];
		currentMesh.add(mesh)
        
		latlon=latlons[Math.floor(Math.random()*latlons.length)];

		latlonpoint = calcPosFromLatLonRad(latlon[0],latlon[1], 0.5);
		mesh.position = new THREE.Vector3(latlonpoint[0],latlonpoint[1],latlonpoint[2]);
		}
		
	}

addPoints();
