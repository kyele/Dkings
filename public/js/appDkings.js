angular.module( 'appDkings' ,
    [ 'ngSanitize' , 'modelOptions' , 'ui.router', 'angular-loading-bar' , 'ezfb' , 'ngLodash' , 'ngResource' , ] )


.config(
    [ '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider' , 'ezfbProvider' , '$locationProvider' ,
    function( $stateProvider , $urlRouterProvider , cfpLoadingBarProvider , ezfbProvider , $locationProvider ) {
            'use strict';
            ezfbProvider.setInitParams({
                appId: '1862370520653764',
                version: 'v2.3'
            });

            cfpLoadingBarProvider.latencyThreshold = 500;
            //$locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/index.html');
            $stateProvider
            .state('pagina' , {
                url:            '/',
                templateUrl:    'public/views/pagina//pagina.html'
            })
                .state('inicio', {
                    parent:         'pagina',
                    url:            '^/index.html',
                    templateUrl:    'public/views/pagina/inicio.html',
                    controller:     'mainCtrl',
                })
                .state('servicios', {
                    parent:         'pagina',
                    url:            '^/servicios.html',
                    templateUrl:    'public/views/pagina/servicios.html',
                    controller:     'mainCtrl',
                })
                .state('galeria', {
                    parent:         'pagina',
                    url:            '^/galeria.html',
                    templateUrl:    'public/views/pagina/galeria.html',
                    controller:     'mainCtrl',
                })
                .state('paquetes', {
                    parent:         'pagina',
                    url:            '^/paquetes.html',
                    templateUrl:    'public/views/pagina/paquetes.html',
                    controller:     'mainCtrl',
                })
                .state('contacto', {
                    parent:         'pagina',
                    url:            '^/contacto.html',
                    templateUrl:    'public/views/pagina/contacto.html',
                    controller:     'mainCtrl',
                })
            .state('cms' , {
                url:            '/cms',
                templateUrl:    'public/views/cms/cms.html',
            })

    }
])
.run([
    '$location' , '$rootScope' , '$state' , 'cfpLoadingBar' ,
    function( $location , $rootScope, $state , cfpLoadingBar ) {
    'use strict';
    //debugger;
    $rootScope.pluginOn = true;
    $rootScope.rendering = false;

    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function() {
        cfpLoadingBar.start();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        cfpLoadingBar.complete();
        document.body.scrollTop = 0;
    });

    $rootScope.rendered = function () {
        $rootScope.rendering = false;
    };
    $rootScope.$watch('pluginOn', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $rootScope.rendering = true;
        }
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.rendering = true;
    });
}]);

angular.module( 'appDkings' )
    .controller( 'mainCtrl' , mainCtrl )
    mainCtrl.$inject = []
function mainCtrl() {
    'use strict',
    console.log()
    //#main-slider
    $(function(){
        $('#main-slider.carousel').carousel({
            interval: 8000
        });
    });


    // accordian
    $('.accordion-toggle').on('click', function(){
        $(this).closest('.panel-group').children().each(function(){
        $(this).find('>.panel-heading').removeClass('active');
         });

        $(this).closest('.panel-heading').toggleClass('active');
    });
    //Initiat WOW JS
    new WOW().init();
    // portfolio filter
    $(window).load(function(){'use strict';
        var $portfolio_selectors = $('.portfolio-filter >li>a');
        var $portfolio = $('.portfolio-items');
        $portfolio.isotope({
            itemSelector : '.portfolio-item',
            layoutMode : 'fitRows'
        });
        $portfolio_selectors.on('click', function(){
            $portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $portfolio.isotope({ filter: selector });
            return false;
        });
    });

    // Contact form
    var form = $('#main-contact-form');
    form.submit(function(event){
        event.preventDefault();
        var form_status = $('<div class="form_status"></div>');
        $.ajax({
            url: $(this).attr('action'),

            beforeSend: function(){
                form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
            }
        }).done(function(data){
            form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
        });
    });
    //goto top
    $('.gototop').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    }); 

    //Pretty Photo
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
}
/*angular.module( 'appPlaya' )
    .controller( 'ventas' , ventas )
    ventas.$inject = [ '$scope' ]
function ventas( $scope ) {
    'use strict';
    $scope.imagenes_ventas = [
        {
            nombre: "Ventas 1",
            url:    "images/venta/1.jpg",
        },
        {
            nombre: "Ventas 2",
            url:    "images/venta/2.jpg",
        },
        {
            nombre: "Ventas 3",
            url:    "images/venta/3.jpg",
        },
        {
            nombre: "Ventas 4",
            url:    "images/venta/4.jpg",
        },
        {
            nombre: "Ventas 5",
            url:    "images/venta/5.jpg",
        }
    ];
    $scope.imagenes = $scope.imagenes_ventas;
    // finally, initialize photobox on all retrieved images
    $('#gallery').photobox('a', { thumbs:true, loop:false }, callback);
    // using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
    setTimeout(window._photobox.history.load, 2000);
    function callback(){
        console.log('callback for loaded content:', this);
    };
};

angular.module( 'appPlaya' )
.controller( 'galeria' , galeria )

galeria.$inject = [ '$scope' ]

function galeria( $scope ) {
    'use strict';
    $scope.imagenes_exterior = [
        {
            nombre: "Exterior 1",
            url:    "images/portfolio/ext1.jpg",
        },
        {
            nombre: "Exterior 2",
            url:    "images/portfolio/ext2.jpg",
        },
        {
            nombre: "Exterior 3",
            url:    "images/portfolio/ext3.jpg",
        },
        {
            nombre: "Exterior 4",
            url:    "images/portfolio/ext4.jpg",
        },
        {
            nombre: "Exterior 5",
            url:    "images/portfolio/ext5.jpg",
        },
        {
            nombre: "Exterior 6",
            url:    "images/portfolio/ext6.jpg",
        },
        {
            nombre: "Exterior 7",
            url:    "images/portfolio/ext7.jpg",
        },
        {
            nombre: "Exterior 8",
            url:    "images/portfolio/ext8.jpg",
        },
        {
            nombre: "Exterior 9",
            url:    "images/portfolio/ext9.jpg",
        },
        {
            nombre: "Exterior 10",
            url:    "images/portfolio/ext10.jpg",
        },
        {
            nombre: "Exterior 11",
            url:    "images/portfolio/ext11.jpg",
        },
        {
            nombre: "Exterior 12",
            url:    "images/portfolio/ext12.jpg",
        },
        {
            nombre: "Exterior 13",
            url:    "images/portfolio/ext13.jpg",
        },
        {
            nombre: "Exterior 14",
            url:    "images/portfolio/ext14.jpg",
        },
        {
            nombre: "Exterior 15",
            url:    "images/portfolio/ext15.jpg",
        },
        {
            nombre: "Exterior 16",
            url:    "images/portfolio/ext16.jpg",
        }
    ];
    $scope.imagenes_interior = [
        {
            nombre: "Interior 1",
            url:    "images/portfolio/int1.jpg",
        },
        {
            nombre: "Interior 2",
            url:    "images/portfolio/int2.jpg",
        },
        {
            nombre: "Interior 3",
            url:    "images/portfolio/int3.jpg",
        },
        {
            nombre: "Interior 4",
            url:    "images/portfolio/int4.jpg",
        },
        {
            nombre: "Interior 5",
            url:    "images/portfolio/int5.jpg",
        },
        {
            nombre: "Interior 6",
            url:    "images/portfolio/int6.jpg",
        },
        {
            nombre: "Interior 7",
            url:    "images/portfolio/int7.jpg",
        }
    ];
    $scope.imagenes_crecimiento = [
        {
            nombre: "Planes de crecimiento 1",
            url:    "images/portfolio/ft1.jpg",
        },
        {
            nombre: "Planes de crecimiento 2",
            url:    "images/portfolio/ft2.jpg",
        },
        {
            nombre: "Planes de crecimiento 3",
            url:    "images/portfolio/ft3.jpg",
        },
        {
            nombre: "Planes de crecimiento 4",
            url:    "images/portfolio/ft4.jpg",
        },
        {
            nombre: "Planes de crecimiento 5",
            url:    "images/portfolio/ft5.jpg",
        },
        {
            nombre: "Planes de crecimiento 6",
            url:    "images/portfolio/ft6.jpg",
        },
        {
            nombre: "Planes de crecimiento 7",
            url:    "images/portfolio/ft7.jpg",
        }
    ];
    $scope.imagenes = $scope.imagenes_exterior;
        // finally, initialize photobox on all retrieved images
        $('#gallery').photobox('a', { thumbs:true, loop:false }, callback);
        // using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
        setTimeout(window._photobox.history.load, 2000);
        function callback(){
            console.log('callback for loaded content:', this);
        };
    //});
    $scope.cambia_categoria = function( categoria ){
        switch( categoria ) {
            case 'exterior':
                $scope.imagenes = $scope.imagenes_exterior;
            break;
            case 'interior':
                $scope.imagenes = $scope.imagenes_interior;
            break;
            case 'crecimiento':
                $scope.imagenes = $scope.imagenes_crecimiento;
            break;
            case 'todas':
                $scope.imagenes = $scope.imagenes_exterior.concat($scope.imagenes_interior , $scope.imagenes_crecimiento);
            break;
            default:
            break;
        }
    };
};*/
