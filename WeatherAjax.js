$(document).ready(function(){
	
	
	
	
	$('#submit').on('click', function(e){
		e.preventDefault();			
		
		var $urlR = 'http://api.openweathermap.org/data/2.5/weather?q=';
		$('#values').text('');
		
		var $cityValue = '';
		var $stateValue = '';
		var $zipValue = '';	
		
		 $cityValue = $('#city').val();
		 $stateValue = $('#state').val();
		 $zipValue = $('#zipCode').val();
		
		if ($cityValue=='' && $zipValue!='')
		{
			$urlR = $urlR +$zipValue+',US';
		}
		else if ($cityValue!='' && $zipValue=='')
		{
			$urlR = $urlR +$cityValue+','+ $stateValue;
		}
		else if ($cityValue=='' && $zipValue=='')
		{
			$('#values').text('Please enter a zipcode or city');
		}
		else
		{
			$urlR = $urlR +$cityValue+','+ $stateValue;
		}
		
		$.ajax({
			type:"GET",
			dataContent: 'json',
			url: $urlR,
			
			//url: 'http://api.openweathermap.org/data/2.5/weather?q='+$cityValue+','+ $stateValue,
			
			success: function (data){
				
				console.log($urlR);
				

				var $main = 'Main: '+ (data.weather[0].main);
				var $desc = 'Description: '+ (data.weather[0].description);
				var $hum = 'Humidity: ' + (data.main.humidity);
				var $low = (data.main.temp_min);
				var $high =  (data.main.temp_max);
				
				var $long = (data.coord.lon);
				var $lat = (data.coord.lat);
				
				var $lowF = 'Low: ' + Math.round(((parseInt($low)-273.15)*1.8) +32);
				var $highF = 'High: ' + Math.round(((parseInt($high)-273.15)*1.8) +32);
				
				var $results = $main + '<br />' + $desc + '<br />' + $hum +'<br />'+ $lowF +' F<br />'+ $highF +' F<br />';
				
				$('#values').append($results);
				console.log($main + '\n' + $desc +'\n' + $hum +'\n'+ $low +'\n'+ $high);
				console.log(data.weather[0].main);
				
				var mapOptions ={
					zoom: 8,
					center: new google.maps.LatLng($lat,$long),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}
				map =new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
			}
		});
		
		
	});
	
	
});