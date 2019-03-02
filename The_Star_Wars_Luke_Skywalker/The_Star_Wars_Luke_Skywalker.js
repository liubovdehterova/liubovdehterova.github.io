var people = {
	init: function(name) {
		this.load(name);
	},
	load: function(name) {
        var $info = $('.people__info').append('<div class="info"></div>');
        var $wrapper = $('.info');
        
        $.ajax('https://swapi.co/api/people/1/', {
            dataType: 'json',
            context: people,
            success: function(result) {
                console.log(result);
                var $name = $('<div> Name: '+'<span class="main__info">'+result.name+'</span>'+'</div>');
                this.setData($name, $wrapper);

                var $height = $('<div> Growth: '+'<span class="main__info">'+result.height+'</span>'+'</div>');
                this.setData($height, $wrapper);

                var $mass = $('<div> Weight: '+'<span class="main__info">'+result.mass+'</span>'+'</div>');
                this.setData($mass, $wrapper);

                var $hairColor = $('<div> Hair Color: '+'<span class="main__info">'+result.hair_color+'</span>'+'</div>');
                this.setData($hairColor, $wrapper);
                
                var $eyeColor = $('<div> Eye Color: '+'<span class="main__info">'+result.eye_color+'</span>'+'</div>');
                this.setData($eyeColor, $wrapper);

                var $gender = $('<div> Gender: '+'<span class="main__info">'+result.gender+'</span>'+'</div>');
                this.setData($gender, $wrapper);

                var $birthYear = $('<div> Year of birth: '+'<span class="main__info">'+result.birth_year+'</span>'+'</div>');
                this.setData($birthYear, $wrapper);

                var $homeworld = $('<button class="home__world">Home World</button>');
                this.setData($homeworld, $wrapper);
                $('.home__world').on('click', function(e){
                    e.preventDefault();
                    $('.planet').css('border', '1px solid #fff');
                    $('.planet').append('<img src="https://images.csmonitor.com/csm/2015/03/0325-tunisia-tatooine.jpg?alias=standard_900x600" class="photo__planet">');
                    planet.init();
                });
            },
            error: function(error) {
                this.setData(error.responseText, $wrapper);
            },
        });
    },
    
    setData: function(what, where) {
        what.appendTo(where);
    }
    
};
var planet = {
    init: function(name) {
        this.load(name);
    },
    load: function(name) {
        var $info = $('.planet').append('<div class="planet__inner"></div>');
        var $wrapper = $('.planet__inner');

        var $infoButton = $('.planet').after('<div class="planet__films__button"></div>');        
        var $wrapperButton = $('.planet__films__button');

        $.ajax('https://swapi.co/api/planets/1/', {
            dataType: 'json',
            context: planet,
            success: function(result) {
                var $name = $('<div> Name: '+'<span class="main__info">'+result.name+'</span>'+'</div>');
                this.setData($name, $wrapper);

                var $rotationPeriod = $('<div> Rotation period: '+'<span class="main__info">'+result.rotation_period+'</span>'+'</div>');
                this.setData($rotationPeriod, $wrapper);

                var $diameter = $('<div> Diameter: '+'<span class="main__info">'+result.diameter+'</span>'+'</div>');
                this.setData($diameter, $wrapper);

                var $climate = $('<div> Climate: '+'<span class="main__info">'+result.climate+'</span>'+'</div>');
                this.setData($climate, $wrapper);

                var $terrain = $('<div class="terrain"> Местность: '+'<span class="main__info">'+result.terrain+'</span>'+'</div>');
                this.setData($terrain, $wrapper);

                var $films = $('<h2 class="titel__films">Movies in which the planet appeared:</h2>');
                this.setData($films, $wrapperButton);

                var $filmPhantomMenace = $('<button class="films films__phantom"> The Phantom Menace </button>');
                this.setData($filmPhantomMenace, $wrapperButton);

                var $filmAttackClones = $('<button class="films films__attack-clones"> Attack of the Clones </button>');
                this.setData($filmAttackClones, $wrapperButton);

                var $filmRevengeSith = $('<button class="films films__revenge"> Revenge of the Sith </button>');
                this.setData($filmRevengeSith, $wrapperButton);

                $('.films__phantom').on('click', function(e){
                    e.preventDefault();
                    phantomMenace.init();
                    $('.phantom-menace').append('<img src="https://vignette.wikia.nocookie.net/starwars/images/7/75/EPI_TPM_poster.png/revision/latest?cb=20130822171446" class="photo__films">');
                    if($(window).width() < '769') {
                        $('.attack-clones').remove();
                        $('.revenge').remove();
                    }                   
                });
                $('.films__attack-clones').on('click', function(e){
                    e.preventDefault();
                    attackClones.init();
                    if($(window).width() < '769') {
                        $('.phantom-menace').remove();
                        $('.revenge').remove();
                    }
                    $('.attack-clones').append('<img src="https://vignette.wikia.nocookie.net/starwars/images/3/3a/Attack_of_the_Clones_Cover.jpg/revision/latest?cb=20050501172807" class="photo__films">');
                });
                $('.films__revenge').on('click', function(e){
                    e.preventDefault();
                    revenge.init();
                    if($(window).width() < '769') {
                        $('.phantom-menace').remove();
                        $('.attack-clones').remove();
                    }
                    $('.revenge').append('<img src="https://usercontent2.hubstatic.com/12709537.jpg" class="photo__films">');
                });
            },
        });
    },
    setData: function(what, where) {
        what.appendTo(where);
    }
};

var phantomMenace = {
    init: function(name) {
        this.load(name);
    },
    load: function(name) {
        var $filmsPhantom = $('.films__planet').append('<div class="films__inner phantom-menace"></div>');
        var $wrapper = $('.phantom-menace');

        $.ajax('https://swapi.co/api/films/4/', {
            dataType: 'json',
            context: planet,
            success: function(result) {
                var $title = $('<div> Title: '+'<span class="films__info">'+result.title+'</span>'+'</div>');
                this.setData($title, $wrapper);

                var $description = $('<div> Description: '+'<span class="films__info">'+result.opening_crawl+'</span>'+'</div>');
                this.setData($description, $wrapper);
                
                var $director = $('<div> Director: '+'<span class="films__info">'+result.director+'</span>'+'</div>');
                this.setData($director, $wrapper);

                var $producer = $('<div> Producer: '+'<span class="films__info">'+result.producer+'</span>'+'</div>');
                this.setData($producer, $wrapper);

                var $release_date = $('<div> Date of release: '+'<span class="films__info">'+result.release_date+'</span>'+'</div>');
                this.setData($release_date, $wrapper);
            },
        });
    },
    setData: function(what, where) {
        what.appendTo(where);
    }
};

var attackClones = {
    init: function(name) {
        this.load(name);
    },
    load: function(name) {
        var $filmsAttack = $('.films__planet').append('<div class="films__inner attack-clones"></div>');
        var $wrapper = $('.attack-clones');

        $.ajax('https://swapi.co/api/films/5/', {
            dataType: 'json',
            context: planet,
            success: function(result) {
                var $title = $('<div> Title: '+'<span class="films__info">'+result.title+'</span>'+'</div>');
                this.setData($title, $wrapper);

                var $description = $('<div> Description: '+'<span class="films__info">'+result.opening_crawl+'</span>'+'</div>');
                this.setData($description, $wrapper);
                
                var $director = $('<div> Director: '+'<span class="films__info">'+result.director+'</span>'+'</div>');
                this.setData($director, $wrapper);

                var $producer = $('<div> Producer: '+'<span class="films__info">'+result.producer+'</span>'+'</div>');
                this.setData($producer, $wrapper);

                var $release_date = $('<div> Date of release: '+'<span class="films__info">'+result.release_date+'</span>'+'</div>');
                this.setData($release_date, $wrapper);
            },
        });
    },
    setData: function(what, where) {
        what.appendTo(where);
    }
};

var revenge = {
    init: function(name) {
        this.load(name);
    },
    load: function(name) {
        var $filmsRevenge = $('.films__planet').append('<div class="films__inner revenge"></div>');
        var $wrapper = $('.revenge');

        $.ajax('https://swapi.co/api/films/6/', {
            dataType: 'json',
            context: planet,
            success: function(result) {
                var $title = $('<div> Title: '+'<span class="films__info">'+result.title+'</span>'+'</div>');
                this.setData($title, $wrapper);

                var $description = $('<div> Description: '+'<span class="films__info">'+result.opening_crawl+'</span>'+'</div>');
                this.setData($description, $wrapper);
                
                var $director = $('<div> Director: '+'<span class="films__info">'+result.director+'</span>'+'</div>');
                this.setData($director, $wrapper);

                var $producer = $('<div> Producer: '+'<span class="films__info">'+result.producer+'</span>'+'</div>');
                this.setData($producer, $wrapper);

                var $release_date = $('<div> Date of release: '+'<span class="films__info">'+result.release_date+'</span>'+'</div>');
                this.setData($release_date, $wrapper);
            },
        });
    },
    setData: function(what, where) {
        what.appendTo(where);
    }
};

people.init();
