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
            $urlRouterProvider
            .when( '/' , '/index.html' )
            .when( '/cms' , '/cms/inicio' )
            .otherwise('/index.html');
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
            .state('login' , {
                url:                '/login',
                templateUrl:        'public/views/login.html',
                controller :        'loginCtrl',
                controllerAs:       'login',
            })
            .state('cms' , {
                url:                '/cms',
                templateUrl:        'public/views/cms/cms.html',
            })
                .state('home' , {
                    parent:         'cms',
                    url:            '/inicio',
                    templateUrl:    'public/views/cms/inicio.html'
                })

    }
])
/*.run([
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
*/
.run([
    '$rootScope' , '$location' , 'authUsers' , '$state' , 'sesionesControl',
    function( $rootScope , $location , authUsers , $state , sesionesControl ){

        'use strict';
        $rootScope.$state = $state;
        var cacheSession        = function( email , id_empleado ) {
            sesionesControl.set( "userLogin" , true);
            sesionesControl.set( "email" , email );
            sesionesControl.set( "id" , id_empleado );
        };
        var unCacheSession      = function( ) {
            sesionesControl.unset( "userLogin" );
            sesionesControl.unset( "email" );
        };
        $rootScope.$on( '$stateChangeStart' , function( event, toState, toParams, from, fromParams ) {
            if( authUsers.isLoggedIn( )  != null ) {
                if( toState.name == 'login' ) {
                    event.preventDefault();
                    $state.go( 'home' );
                } else {
                    authUsers.verifica(
                        function( data ) {
                            if( data != null ){
                                    cacheSession( data.Email , data.IDEmpleado );
                            } else {
                                unCacheSession();
                                $state.go( 'login' );
                            }
                        }, function( data ) {
                            unCacheSession();
                            $rootScope.intento = true;
                            $state.go( 'login' );
                        }
                    );
                }
            } else {
                if( typeof $rootScope.intento == 'undefined' ) {
                    event.preventDefault();
                    $rootScope.intento = true;
                    authUsers.verifica(
                        function( data ) {
                            if( data != null ) {
                                cacheSession( data.Email , data.IDEmpleado );
                                if( toState.name != 'login' ) {
                                    $state.go( toState.name , toParams );
                                } else {
                                    $state.go( 'home' );
                                }
                            } else {
                                unCacheSession();
                                $state.go( 'login' );
                            }
                        }, function( data ) {
                            $state.go( 'login' );
                        }
                    );
                } else if( toState.name != 'login' ) {
                    event.preventDefault();
                    $state.go( 'login' );
                }
            }
        });
    }
]);

angular.module( 'appDkings' )
    .controller( 'mainCtrl' , mainCtrl )
    mainCtrl.$inject = []
function mainCtrl() {
    'use strict',
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