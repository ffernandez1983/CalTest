(function () {
    "use strict";

    angular
        .module('calendar.Directiva', [])       
        .directive('calendar', calendarDirectiva);

    function calendarDirectiva() {

        var directive = {
            restrict: 'E',
            scope: true,
            controller: calendarController,
            controllerAs: 'cactrl',
            templateUrl: '/app/calendar/calendar.html'
        };

        return directive;
    }
  
    calendarController.$inject = [];

    function calendarController() {
        var self= this;
        //En javascript los meses son:
        //0 Enero, 1 Febrero, 2 Marzo, 3 Abril, 4 Mayo, 5 Junio, 6 Julio, 7 Agosto, 8 Septiembre, 9 Octubre, 10 Noviembre, 11 Diciembre
        
        //Metodos Publicos

        self.meses = {
            "1":"Enero",
            "2":"Febrero",
            "3":"Marzo",
            "4":"Abril",
            "5":"Mayo",
            "6":"Junio",
            "7":"Julio",
            "8":"Agosto",
            "9":"Septiembre",
            "10":"Octubre",
            "11":"Noviembre",
            "12":"Diciembre"
        }
       
        
        var k = 1;
        var l = 1;

        var diasnumeral = [];
        
        var now = new Date();

        self.cambiarFecha = cambiarFecha;
    
        self.inicializar = inicializar;

        self.mes = EsteMes(now);       
        self.anyo = EsteAnyo(now);
        self.dia = EsteDiaMes(now);
        
        inicializar(self.mes, self.anyo, self.dia);
        
       

        function inicializar(mes, anyo, dia){
            k = 1;
            l = 1;
			
            //Cambia de a?o
			if (mes == 13){
				anyo= anyo+1;
				mes = 1;
			}			
			if(mes == 0){
				anyo = anyo -1;
				mes = 12;
			}
			
			self.mes = mes;
			self.anyo = anyo;
            self.semanas = [];
            self.posiciones = [];

            self.primerdiaSemana = getdiaSemana(mes + "/" + 1 + "/" + anyo) - 1;
            self.diasMes = calculaDiasMes(mes, anyo); //28,29,30 ó 31                            
            self.ultimoDiaMesAnterior = getultimodiaMesAnterior(mes, anyo);            
            self.NombreMesPedido = self.meses[mes]            
            self.mesActual = mes;
            self.ultimoDiaMesAnterior= self.ultimoDiaMesAnterior-self.primerdiaSemana+1;

            primeraSemana();
            siguientesSemanas();

        }
        
        
            
        function primeraSemana(){
            
            for(var j=0; j<self.primerdiaSemana;j++){
                self.posiciones[j] = {};
                self.posiciones[j].numeroDiaSemana = -1;
                
                self.posiciones[j].numeroMes = self.ultimoDiaMesAnterior++;           
            }

            for(var j=self.primerdiaSemana; j<7;j++){

               self.posiciones[j] = {};
               self.posiciones[j].numeroDiaSemana = j+1;
               self.posiciones[j].numeroMes = k++;   
            }

            self.semanas.push(self.posiciones.slice(0)); 
        }

        function siguientesSemanas(){
            
            for(var i=1; i<6;i++){
                for(var j=0;j<7;j++){
                    self.posiciones[j] = {};
                    self.posiciones[j].numeroDiaSemana = j+1;
                    self.posiciones[j].numeroMes = k++;

                     if(k>self.diasMes+1){
                        self.posiciones[j].numeroDiaSemana = -1;
                        self.posiciones[j].numeroMes = l++;
                    }
                }
                self.semanas.push(self.posiciones.slice(0)); 
            }

            
        }

            

    }

    function cambiarFecha (mes){
         inicializar(mes, self.anyo, self.dia);
    }

    function EsteMes(now){
        return now.getMonth()+1;
    }

    function EsteAnyo(now){
        return now.getFullYear();
    }

    function EsteDiaMes(now){
        return now.getDate();
    }

    function getdiaMes(fecha){
        return new Date(fecha).getDate();
    }

    function getultimodiaMesAnterior(mes, anyo){
        mes = mes-1;
        return calculaDiasMes(mes, anyo)        
    }

    function getdiaSemana(fecha){
        var diasemana = new Date(fecha).getDay();
        diasemana==0 ? diasemana = 7: diasemana = diasemana; 
        diasemana ? diasemana = diasemana: diasemana = 0;
        return  diasemana;
    }

    var compruebaDiaSemana = function (fechaCuadricula, diasemana){
        var diaReal = getdiaSemana(fechaCuadricula);
        if(diasemana == diaReal) {
            return true;
        }
        else false;
    }


    var calculaDiasMes = function (mes, anyo){
        
        var cantidadDias = 0;
        
        for(var i=1;i<32;i++){
            var fecha = mes +"/" + i + "/" + anyo; 
            var diaExiste = new Date(fecha);
            if (diaExiste.getMonth()+1 == mes){

                cantidadDias=cantidadDias+1;
            }

        }
        return cantidadDias;
    }


  

})();