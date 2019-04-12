$(document).ready(function(){

/*=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=*/
/*=+=+=+=+=+=+=+=+=+=+=+> DEFAULT JS <=+=+=+=+=+=+=+=+=+=+=+=*/
/*=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=*/
	
	/*============================================*/
	/*  => SCROLL                                 */
	/*============================================*/
		$(document).on('click', 'a[href^="#"]', function (event) 
		{
    		event.preventDefault();
	
    		$('html, body').animate({
		        scrollTop: $($.attr(this, 'href')).offset().top
		    }, 500);
		});

	/*============================================*/
	/*  => MODAL                                  */
	/*============================================*/
		$('.modal_link').on('click', function()
		{
			var modalID = $(this).attr('data');
			$('#' + modalID).addClass('open');
	
			$('html').addClass('noScroll');
			$('body').addClass('noScroll');
		});
	
		$('.close_modal').on('click', function()
		{
			$(this).parents('.modal').removeClass('open');
			$('html').removeClass('noScroll');
			$('body').removeClass('noScroll');
		});
		
		$(document).click(function(event)
		{//Fecha o modal se o utilizador clicar fora do modal
			if (!$(event.target).closest(".modal_container, .modal_link").length)
			{
				$("body").find(".modal").removeClass("open");
				$('html').removeClass('noScroll');
				$('body').removeClass('noScroll');
			}
		});


	/*============================================*/
	/*  => NAVBAR  				                  */
	/*============================================*/
		$('header .menu-item').hover(
			function(){ $(this).children('.dropdown').addClass('show'); },
			function() { $(this).children(".dropdown").removeClass('show'); }
		);


	/*============================================*/
	/*  => SLIDER                                 */
	/*============================================*/
		$('.slider').slick({
	    	autoplay: true,
	    	autoplaySpeed: 2000,
	    	fade: true,
	    	arrows: true,
	    	dots: true,
	    	pauseOnHover:true,
	    	pauseOnFocus:false,
		});
	
	
	/*============================================*/
	/*  => MOBILE                                 */
	/*============================================*/
		$('.menu_mobile').on('click', function()
		{
	        $('.menu_mobile').toggleClass('show');
		});
	

/*=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=*/
/*=+=+=+=+=+=+=+=+=+=+=+=> CUSTOM JS <=+=+=+=+=+=+=+=+=+=+=+=*/
/*=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=*/
	$('#audio1').on('click', function(){
		audio.src = "playlist/2-The_Phantom_of_the_Opera.m4a";
		$('#playerList .selected').removeClass('selected');
		$(this).addClass('selected');
		$('#audioTitle').text('The Phantom of the Opera');
		$('#playerBtn').addClass('playing');
		audio.play();
	});

	$('#audio2').on('click', function(){
		audio.src = "playlist/1-Think_of_Me.m4a";
		$('#playerList .selected').removeClass('selected');
		$(this).addClass('selected');
		$('#audioTitle').text('Think of Me');
		$('#playerBtn').addClass('playing');
		audio.play();
	});

	$('#audio3').on('click', function(){
		audio.src = "playlist/3-Masquerade_Why_So_Silent.m4a";
		$('#playerList .selected').removeClass('selected');
		$(this).addClass('selected');
		$('#audioTitle').text('Masquerade Why So Silent');
		$('#playerBtn').addClass('playing');
		audio.play();
	});

	var audio = new Audio();
	audio.src = "playlist/2-The_Phantom_of_the_Opera.m4a";

	$('#playerBtn').on('click', function(){
		if ($(this).hasClass("playing"))
		{
			audio.pause();
			$(this).removeClass("playing");
		}
		else
		{
			audio.play();
			$(this).addClass("playing");
		}
	});

	audio.addEventListener('timeupdate',function(){ 
            
        var position = audio.currentTime / audio.duration;
        
        var audioPosition = position * 100 +'%';

        $('.audioPosition').css('width', audioPosition);
    });

	var playerLine = document.getElementById('playerLine');
	playerLine.addEventListener('click', clickedStroke, false);

	function clickedStroke(e)
	{
		var strokeOffsetLeft = $('#playerLine').position().left;
		var mouseX = e.pageX - strokeOffsetLeft;

		var newtime = mouseX*audio.duration/stroke.offsetWidth;
		audio.currentTime = newtime;
		$('.audioPosition').css('width', mouseX + 'px');
	}


	$('#bilhete_porto').on('click', function()
	{
		$.ajax({
			type: "POST",
			url: "clicks.php", 
			data: { "cidade": "porto" },
			success: function(data)
			{ }
		});
	});

	$('#bilhete_lisboa').on('click', function()
	{
		$.ajax({
			type: "POST",
			url: "clicks.php", 
			data: { "cidade": "lisboa" },
			success: function(data)
			{ }
		}); 
	});

});
