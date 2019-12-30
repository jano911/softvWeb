'use strict';
angular.module('softvApp')
  .factory('ContratoMaestroFactory', function ($http, $q, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetContratoList: '/ContratoMaestroFac/GetContratos_CS',
      BuscarContratos: '/ContratoMaestroFac/GetBusquedaContratoMaestroFac',
      GetDistribuidores: '/DomicilioFiscal/GetDistribuidores',
      GetCiudadList: '/DomicilioFiscal/GetListaCiudadesPorPlaza',
      GetMuestraFacturasMaestroList: '/MuestraFacturasMaestro/GetMuestraFacturasMaestroList',
      BuscaFacturasMaestro: '/BuscaFacturasMaestro/GetBuscaFacturasMaestroList',
      UploadFile: '/ContratoMaestroFac/GetLayoutFac',
      UploadFileDesconexion: '/ContratoMaestroFac/GetValidarContratosLayout',
      ProcesaDesconexion: '/ContratoMaestroFac/GetProcesaContratosLayout',
      FiltrosBusquedaNotasDeCredito: '/NotasDeCredito_ContraMaeFac/GetBusquedaNotasList',
      DAME_FACTURASDECLIENTE: '/DAME_FACTURASDECLIENTE/GetDAME_FACTURASDECLIENTEList',
      GetObtieneDatosTicketList: '/NotasDeCredito_ContraMaeFac/GetObtieneDatosTicketList',
      GetDetalle_NotasdeCreditoList: '/Detalle_NotasdeCredito/GetDetalle_NotasdeCreditoList',
      GetCalcula_monto: '/Calcula_monto/GetCalcula_monto',
      StatusNotadeCredito: '/StatusNotadeCredito/GetStatusNotadeCreditoList',
      GetAddNotaCredito: '/NotasDeCredito_ContraMaeFac/GetAddNotaCredito',
      AddMovSist: '/MovSist/AddMovSist',
      DeleteNotasDeCredito_ContraMaeFac: '/NotasDeCredito_ContraMaeFac/DeleteNotasDeCredito_ContraMaeFac',
      GetGuarda_DetalleNota: '/NotasDeCredito_ContraMaeFac/GetGuarda_DetalleNota',
      GetNotasDeCredito_ContraMaeFacList: '/NotasDeCredito_ContraMaeFac/GetNotasDeCredito_ContraMaeFacList',
      GetProcedimientoCancelar: '/NotasDeCredito_ContraMaeFac/GetProcedimientoCancelar',
      GetCrearNotaCreditoCM: '/CrearNotaCredito/GetCrearNotaCreditoCM',
      ConceptosTicketNotasCredito: '/ConceptosTicketNotasCredito/GetConceptosTicketNotasCreditoCM',
      GetGeneraRefBanamexMaestro: '/GeneraRefBanamexMaestro/GetGeneraRefBanamexMaestro',
      ReporteEstadoCuentaNuevo: '/ReporteEstadoCuentaNuevo/GetReporteEdoCuenta_CM',
      TblNotasMaestraOpciones: '/TblNotasMaestraOpciones/AddTblNotasMaestraOpciones',
      ValidaCancelacionFactura: '/ValidaCancelacionFactura/GetValidaCancelacionFacturaCM',
      MUESTRAMOTIVOS: '/MUESTRAMOTIVOS/GetMUESTRAMOTIVOSList',
      GuardaMotivos: '/GuardaMotivos/GetGuardaMotivosCM',
      AddBitacoraTickets: '/Bitacora/AddBitacoraTickets',
      TblFacturasOpcionesCM: '/TblFacturasOpciones/AddTblFacturasOpcionesCM',
      Sp_DameDetalleFacturaMaestra: '/Sp_DameDetalleFacturaMaestra/GetSp_DameDetalleFacturaMaestraList',
      uspHaz_Pregunta: '/uspHaz_Pregunta/GetDeepuspHaz_Pregunta_CM',
      GetDeeAfirmacionPregunta_CM: '/uspHaz_Pregunta/GetDeeAfirmacionPregunta_CM',
      DetalleContratosFM: '/DetalleContratosFM/GetDetalleContratosFMList',
      DameDetalle_FacturaporCli: '/DameDetalle_FacturaporCli/GetDameDetalle_FacturaporCliList',
      GetAgregaDetalleNotaDeCreditoMaestroList: '/AgregaDetalleNotaDeCreditoMaestro/GetAgregaDetalleNotaDeCreditoMaestroList',
      GetCANCELA_FACTURASMAESTRA_PRINCIPAL: '/NotasDeCredito_ContraMaeFac/GetCANCELA_FACTURASMAESTRA_PRINCIPAL',
      GetCancelaPagoFacturaMaestro: '/ContratoMaestroFac/GetCancelaPagoFacturaMaestro',
      GetValidaSipuedohacerPagoc: '/ContratoMaestroFac/GetValidaSipuedohacerPagoc',
      GetGeneraFacturaMaestroPrueba: '/ContratoMaestroFac/GetGeneraFacturaMaestroPrueba',
      GetValidaSipuedoCancelarPago: '/ContratoMaestroFac/GetValidaSipuedoCancelarPago',
      GetDetalle_NotasdeCreditoVerHistorialList: '/Detalle_NotasdeCredito/GetDetalle_NotasdeCreditoVerHistorialList',
      UpdateMarcaTodoNotaCreditoCM: '/NotasDeCredito_ContraMaeFac/UpdateMarcaTodoNotaCreditoCM',
      UpdateDesmarcaTodoNotaCreditoCM: '/NotasDeCredito_ContraMaeFac/UpdateDesmarcaTodoNotaCreditoCM',
      BuscaFacturasFisca: '/BuscaFacturasFisca/GetBuscaFacturasFiscaList',
      DameDetalle_FacturaMaestroFiscal: '/DameDetalle_FacturaMaestroFiscal/GetDameDetalle_FacturaMaestroFiscalList',
      GetAddDetalleFacFiscal: '/BuscaFacturasFisca/GetAddDetalleFacFiscal',
      ActualizaFacturaGeneraFiscal: '/ActualizaFacturaGeneraFiscal/UpdateActualizaFacturaGeneraFiscal',
      GetCuentaCableMaestro: '/ContratoMaestroFac/GetCuentaCableMaestro',
      GetReporteMaestroPorVencer: '/ContratoMaestroFac/GetReporteMaestroPorVencer',
      GetNotificacionContratoPorVencer: '/ContratoMaestroFac/GetNotificacionContratoPorVencer',
      GetCodigosPostalesMizar: '/ContratoMaestroFac/GetCodigosPostalesMizar',
      GetColoniasMizar: '/ContratoMaestroFac/GetColoniasMizar',
      GetEstadosMizar: '/ContratoMaestroFac/GetEstadosMizar',
      GetMunicipiosMizar: '/ContratoMaestroFac/GetMunicipiosMizar',
      GetPaisesMizar: '/ContratoMaestroFac/GetPaisesMizar',
      GetGraba_Factura_DigitalPago: '/FacturacionSoftv/GetGraba_Factura_DigitalPago',
      GetGraba_Factura_DigitalMaestrotvzac: '/FacturacionSoftv/GetGraba_Factura_DigitalMaestrotvzac',
      GetImprimeFacturaFiscal: '/FacturacionSoftv/GetImprimeFacturaFiscal',
      GetEnviaFacturaFiscal: '/FacturacionSoftv/GetEnviaFacturaFiscal',
      GetImprimeFacturaFiscalpago: '/FacturacionSoftv/GetImprimeFacturaFiscalpago',
      GetEnviaFacturaFiscalpago: '/FacturacionSoftv/GetEnviaFacturaFiscalpago',
      GetGraba_Factura_NotaMaestro: '/FacturacionSoftv/GetGraba_Factura_NotaMaestro',
      GetCancelacion_Factura_CFDMaestro: '/FacturacionSoftv/GetCancelacion_Factura_CFDMaestro',
      GetValidaCoordenadasCAMDO: '/CAMDOFAC/GetValidaCoordenadasCAMDO',
      GetNUECAMDOFACnoInt: '/CAMDOFAC/GetNUECAMDOFACnoInt',
      GetUsoCFDI:'/ContratoMaestroFac/GetUsoCFDI',
      GetUsoCFDI_NC:'/ContratoMaestroFac/GetUsoCFDI_NC', 
      GetFormaPago:'/ContratoMaestroFac/GetFormaPago', 
      GetDetallePagos:'/RelacionIngresosMaestro/GetDetallePagos',
      GetDetalleContratoPrefactura:'/BuscaFacturasFisca/GetDetalleContratoPrefactura',
      GetDetalleContratoPrefacturaExcel:'/BuscaFacturasFisca/GetDetalleContratoPrefacturaExcel',
      GetObtieneContratosLigadosPorStatus: '/ContratoMaestroFac/GetObtieneContratosLigadosPorStatus',
      GetAgregaBitacoraMaestro: '/Bitacora/GetAgregaBitacoraMaestro',
      GetBuscaBitacoraMaestro: '/Bitacora/GetBuscaBitacoraMaestro',
      GetImprimeFacturaFiscalNotaMaestro:'/FacturacionSoftv/GetImprimeFacturaFiscalNotaMaestro',
      GetOrdenesGeneradasContratoMaestro:'/ReporteCortesFac/GetOrdenesGeneradasContratoMaestro',
      GetGuardarCalleNuevaCAMDO: '/CobraContratoMaestro/GetGuardarCalleNuevaCAMDO',
      GetObtieneContratosNoFacturaPreliminar: '/BuscaFacturasFisca/GetObtieneContratosNoFacturaPreliminar',
      GetAgregaContratosFacturaPreliminar: '/BuscaFacturasFisca/GetAgregaContratosFacturaPreliminar',
      GetObtieneContratosFacturaPreliminar: '/BuscaFacturasFisca/GetObtieneContratosFacturaPreliminar',
      GetEliminaContratosFacturaPreliminar: '/BuscaFacturasFisca/GetEliminaContratosFacturaPreliminar'
    };

    factory.GetEliminaContratosFacturaPreliminar = function (parametros) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
 
      $http.post(globalService.getUrl() + paths.GetEliminaContratosFacturaPreliminar, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    };

    factory.GetObtieneContratosFacturaPreliminar = function (parametros) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
 
      $http.post(globalService.getUrl() + paths.GetObtieneContratosFacturaPreliminar, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    };

    factory.GetAgregaContratosFacturaPreliminar = function (parametros) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
 
      $http.post(globalService.getUrl() + paths.GetAgregaContratosFacturaPreliminar, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    };

    factory.GetObtieneContratosNoFacturaPreliminar = function (parametros) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
 
      $http.post(globalService.getUrl() + paths.GetObtieneContratosNoFacturaPreliminar, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    };

    factory.GetGuardarCalleNuevaCAMDO = function (parametros) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
 
      $http.post(globalService.getUrl() + paths.GetGuardarCalleNuevaCAMDO, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 

    factory.GetOrdenesGeneradasContratoMaestro = function (parametros) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
 
      $http.post(globalService.getUrl() + paths.GetOrdenesGeneradasContratoMaestro, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 

    factory.GetBuscaBitacoraMaestro = function (Clv_Usuario, Modulo, Descripcion, Op, Fecha) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      var parametros = { 
        'Clv_Usuario': Clv_Usuario,
        'Modulo': Modulo,
        'Descripcion': Descripcion,
        'Op': Op,
        'Fecha': Fecha
      }; 
      console.log(parametros);
      $http.post(globalService.getUrl() + paths.GetBuscaBitacoraMaestro, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 
    
    factory.GetAgregaBitacoraMaestro = function (Clv_Usuario, Modulo, Descripcion) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      var parametros = { 
        'Clv_Usuario': Clv_Usuario,
        'Modulo': Modulo,
        'Descripcion': Descripcion
      }; 
 
      $http.post(globalService.getUrl() + paths.GetAgregaBitacoraMaestro, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 

    factory.GetObtieneContratosLigadosPorStatus = function (IdContratoMaestro, Status) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      var parametros = { 
        'IdContratoMaestro': IdContratoMaestro,
        'Status': Status
      }; 
 
      $http.post(globalService.getUrl() + paths.GetObtieneContratosLigadosPorStatus, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 

    factory.GetDetalleContratoPrefacturaExcel = function (Clv_FacturaMaestro) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      var parametros = { 
        'Clv_FacturaMaestro': Clv_FacturaMaestro
      }; 
 
      $http.post(globalService.getUrl() + paths.GetDetalleContratoPrefacturaExcel, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 

    factory.GetDetalleContratoPrefactura = function (Clv_FacturaMaestro) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      var parametros = { 
        'Clv_FacturaMaestro': Clv_FacturaMaestro
      }; 
 
      $http.post(globalService.getUrl() + paths.GetDetalleContratoPrefactura, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 


    factory.GetDetallePagos = function (Distribuidores, FechaInicial,FechaFinal,Dolares) { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      var parametros = { 
        'Distribuidores': Distribuidores, 
        'FechaInicial': FechaInicial, 
        'FechaFinal':FechaFinal,
        'Dolares':Dolares
      }; 
 
 
      $http.post(globalService.getUrl() + paths.GetDetallePagos, JSON.stringify(parametros), config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
 
    }; 


    factory.GetUsoCFDI = function () { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      $http.get(globalService.getUrl() + paths.GetUsoCFDI, config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
    }; 

    factory.GetUsoCFDI_NC = function () { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      $http.get(globalService.getUrl() + paths.GetUsoCFDI_NC, config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
    }; 

    factory.GetFormaPago = function () { 
      var deferred = $q.defer(); 
      var config = { 
        headers: { 
          'Authorization': $localStorage.currentUser.token 
        } 
      }; 
      $http.get(globalService.getUrl() + paths.GetFormaPago, config).then(function (response) { 
 
        deferred.resolve(response.data); 
      }).catch(function (response) { 
        deferred.reject(response); 
      }); 
      return deferred.promise; 
    }; 

    factory.GetNUECAMDOFACnoInt = function (parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.post(globalService.getUrl() + paths.GetNUECAMDOFACnoInt, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };
    
    factory.GetValidaCoordenadasCAMDO = function (parametros) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.post(globalService.getUrl() + paths.GetValidaCoordenadasCAMDO, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    


    factory.GetImprimeFacturaFiscalNotaMaestro = function (oClv_Nota) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Nota': oClv_Nota        
      };
      $http.post(globalService.getUrlMizar() + paths.GetImprimeFacturaFiscalNotaMaestro, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetCancelacion_Factura_CFDMaestro = function (oClv_FacturaCFD, tipo) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_FacturaCFD': oClv_FacturaCFD,
        'tipo': tipo
      };


      $http.post(globalService.getUrlMizar() + paths.GetCancelacion_Factura_CFDMaestro, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetGraba_Factura_NotaMaestro = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura
      };


      $http.post(globalService.getUrlMizar() + paths.GetGraba_Factura_NotaMaestro, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetEnviaFacturaFiscalpago = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura
      };


      $http.post(globalService.getUrlMizar() + paths.GetEnviaFacturaFiscalpago, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetImprimeFacturaFiscalpago = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura
      };


      $http.post(globalService.getUrlMizar() + paths.GetImprimeFacturaFiscalpago, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };





    factory.GetEnviaFacturaFiscal = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura
      };


      $http.post(globalService.getUrlMizar() + paths.GetEnviaFacturaFiscal, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetEnviaFacturaFiscal = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura
      };


      $http.post(globalService.getUrlMizar() + paths.GetEnviaFacturaFiscal, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetImprimeFacturaFiscal = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura
      };


      $http.post(globalService.getUrlMizar() + paths.GetImprimeFacturaFiscal, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetGraba_Factura_DigitalPago = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura,
        'oIden': 0
      };


      $http.post(globalService.getUrlMizar() + paths.GetGraba_Factura_DigitalPago, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetGraba_Factura_DigitalMaestrotvzac = function (oClv_Factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'oClv_Factura': oClv_Factura,
        'oIden': 0
      };


      $http.post(globalService.getUrlMizar() + paths.GetGraba_Factura_DigitalMaestrotvzac, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetPaisesMizar = function (id_CodigoPostal) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'id_CodigoPostal': id_CodigoPostal
      };


      $http.post(globalService.getUrl() + paths.GetPaisesMizar, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetMunicipiosMizar = function (id_CodigoPostal, id_Estado) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'id_CodigoPostal': id_CodigoPostal,
        'id_Estado': id_Estado
      };


      $http.post(globalService.getUrl() + paths.GetMunicipiosMizar, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetEstadosMizar = function (id_CodigoPostal) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'id_CodigoPostal': id_CodigoPostal
      };


      $http.post(globalService.getUrl() + paths.GetEstadosMizar, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetColoniasMizar = function (id_CodigoPostal) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'id_CodigoPostal': id_CodigoPostal
      };


      $http.post(globalService.getUrl() + paths.GetColoniasMizar, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetCodigosPostalesMizar = function (query) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        query : query
      };
      $http.post(globalService.getUrl() + paths.GetCodigosPostalesMizar, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetNotificacionContratoPorVencer = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetNotificacionContratoPorVencer, config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetReporteMaestroPorVencer = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Op': obj.Op,
        'FechaVencimiento': obj.FechaVencimiento.replace('/', '').replace('/', ''),
        'ContratoMaestro': obj.ContratoMaestro,
        'IdDistribuidor': obj.IdDistribuidor
      };
      console.log(parametros);

      $http.post(globalService.getUrl() + paths.GetReporteMaestroPorVencer, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.ActualizaFacturaGeneraFiscal = function (Clv_FacturaMaestro, tipo) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objActualizaFacturaGeneraFiscal': {
          'Clv_FacturaMaestro': Clv_FacturaMaestro,
          'Tipo': tipo
        }


      };

      $http.post(globalService.getUrl() + paths.ActualizaFacturaGeneraFiscal, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetAddDetalleFacFiscal = function (Clv_FacturaMaestro, conceptos_array) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Obj': {
          Clv_FacturaMaestro: Clv_FacturaMaestro
        },
        Lst: conceptos_array

      };

      $http.post(globalService.getUrl() + paths.GetAddDetalleFacFiscal, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.DameDetalle_FacturaMaestroFiscal = function (Clv_FacturaMaestro) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_FacturaMaestro': Clv_FacturaMaestro
      };

      $http.post(globalService.getUrl() + paths.DameDetalle_FacturaMaestroFiscal, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.BuscaFacturasFisca = function (obj) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': obj.Factura,
        'Fecha': obj.Fecha,
        'Todas': obj.Todas,
        'ContratoMaestro': obj.ContratoMaestro,
        'Opcion': obj.Opcion
      };

      $http.post(globalService.getUrl() + paths.BuscaFacturasFisca, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };





    factory.ProcesaDesconexion = function (contratos) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        objprocesa: contratos.objprocesa,
        Usuario: $localStorage.currentUser.usuario
      };
      $http.post(globalService.getUrl() + paths.ProcesaDesconexion, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.GetContratoList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetContratoList, config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };






    factory.GetMuestraFacturasMaestroList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetMuestraFacturasMaestroList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.UpdateDesmarcaTodoNotaCreditoCM = function (session) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objDesmarcaTodoNotaCreditoCM': {
          'Clv_Session': session
        }
      };
      $http.post(globalService.getUrl() + paths.UpdateDesmarcaTodoNotaCreditoCM, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.UpdateMarcaTodoNotaCreditoCM = function (session) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {

        'objMarcaTodoNotaCreditoCM': {
          'Clv_Session': session
        }



      };

      $http.post(globalService.getUrl() + paths.UpdateMarcaTodoNotaCreditoCM, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.BuscaFacturasMaestro = function (objeto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Fecha': objeto.Fecha,
        'FechaFinal': objeto.FechaFinal,
        'Ticket': objeto.Ticket,
        'ContratoMaestro': objeto.ContratoMaestro,
        'Cliente': objeto.Cliente,
        'Op': objeto.Op,
        'Saldada': objeto.Saldada
      };

      $http.post(globalService.getUrl() + paths.BuscaFacturasMaestro, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetValidaSipuedoCancelarPago = function (Clv_Pago) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Pago': Clv_Pago
      };

      $http.post(globalService.getUrl() + paths.GetValidaSipuedoCancelarPago, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.GetDetalle_NotasdeCreditoVerHistorialList = function (Clv_NotadeCredito) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_NotadeCredito': Clv_NotadeCredito
      };

      $http.post(globalService.getUrl() + paths.GetDetalle_NotasdeCreditoVerHistorialList, JSON.stringify(parametros), config).then(function (response) {

        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };







    factory.BuscarContratos = function (objeto) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'RazonSocial': objeto.RazonSocial,
        'NombreComercial': objeto.NombreComercial,
        'ClvCiudad': objeto.ClvCiudad,
        'Op': objeto.Op
      };
      $http.post(globalService.getUrl() + paths.BuscarContratos, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetDistribuidores = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetDistribuidores, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };

    factory.GetCiudadList = function (Clv_Plaza) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Plaza': Clv_Plaza
      };
      $http.post(globalService.getUrl() + paths.GetCiudadList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetObtieneDatosTicketList = function (Factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': Factura,

      };
      $http.post(globalService.getUrl() + paths.GetObtieneDatosTicketList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.DAME_FACTURASDECLIENTE = function (contrato) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ContratoMaestro': contrato,
        'ClvNota': 0
      };
      $http.post(globalService.getUrl() + paths.DAME_FACTURASDECLIENTE, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetDetalle_NotasdeCreditoList = function (clv_session) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Session': clv_session,

      };

      $http.post(globalService.getUrl() + paths.GetDetalle_NotasdeCreditoList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.GetCalcula_monto = function (factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ClvFactura': factura,
        'Op': 0
      };
      $http.post(globalService.getUrl() + paths.GetCalcula_monto, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };



    factory.StatusNotadeCredito = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.get(globalService.getUrl() + paths.StatusNotadeCredito, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetAddNotaCredito = function (data) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      $http.post(globalService.getUrl() + paths.GetAddNotaCredito, JSON.stringify(data), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };


    factory.AddMovSist = function (factura, monto) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'objMovSist': {
          'usuario': $localStorage.currentUser.usuario,
          'contrato': factura,
          'Sistema': 'Facturación',
          'Pantalla': 'FrmNotasdeCredito',
          'control': 'Se Hizo una Nueva nota de Crédito',
          'valorant': 0,
          'valornuevo': monto
        }
      };
      $http.post(globalService.getUrl() + paths.AddMovSist, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };





    factory.FiltrosBusquedaNotasDeCredito = function (data) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Op': data.Op,
        'Clv_NotadeCredito': data.Clv_NotadeCredito,
        'Fecha': data.Fecha,
        'FechaFin': data.FechaFin,
        'ContratoMaestro': data.ContratoMaestro
      };


      $http.post(globalService.getUrl() + paths.FiltrosBusquedaNotasDeCredito, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetNotasDeCredito_ContraMaeFacList = function (nota) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_NotadeCredito': nota
      };
      $http.post(globalService.getUrl() + paths.GetNotasDeCredito_ContraMaeFacList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };






    factory.GetGuarda_DetalleNota = function (factura, nota) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': factura,
        'Clv_NotadeCredito': nota,
      };


      $http.post(globalService.getUrl() + paths.GetGuarda_DetalleNota, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };




    factory.GetProcedimientoCancelar = function (factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': factura,
        'Op': 0,
      };
      $http.post(globalService.getUrl() + paths.GetProcedimientoCancelar, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DeleteNotasDeCredito_ContraMaeFac = function (factura, nota) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Factura': factura,
        'Clv_NotadeCredito': nota,
      };
      $http.post(globalService.getUrl() + paths.DeleteNotasDeCredito_ContraMaeFac, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetCrearNotaCreditoCM = function (factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Factura': factura
      };
      $http.post(globalService.getUrl() + paths.GetCrearNotaCreditoCM, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.ConceptosTicketNotasCredito = function (factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Factura': factura
      };
      $http.post(globalService.getUrl() + paths.ConceptosTicketNotasCredito, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.MUESTRAMOTIVOS = function (op) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Op': op
      };
      $http.post(globalService.getUrl() + paths.MUESTRAMOTIVOS, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };





    factory.ReporteEstadoCuentaNuevo = function (ClvSessionPadre, ContratoMaestro, Referencia) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ClvSessionPadre': ClvSessionPadre,
        'ContratoMaestro': ContratoMaestro,
        'Referencia': Referencia
      };
      $http.post(globalService.getUrl() + paths.ReporteEstadoCuentaNuevo, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;

    };





    factory.TblNotasMaestraOpciones = function (nota, cancelar, OpReimprimir, OpCorreo) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'objTblNotasMaestraOpciones': {
          'Clv_NotaMaestra': nota,
          'OpCancelar': 0,
          'OpReimprimir': OpReimprimir,
          'OpCorreo': OpCorreo
        }

      };
      $http.post(globalService.getUrl() + paths.TblNotasMaestraOpciones, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };







    factory.GetGeneraRefBanamexMaestro = function (ContratoMaestro, Importe) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ContratoMaestro': ContratoMaestro,
        'Importe': Importe
      };
      $http.post(globalService.getUrl() + paths.GetGeneraRefBanamexMaestro, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.ValidaCancelacionFactura = function (factura) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'ClvFactura': factura,

      };
      $http.post(globalService.getUrl() + paths.ValidaCancelacionFactura, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GuardaMotivos = function (factura, Motivo) {

      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'ClvFactura': factura,
        'ClvMotivo': Motivo,
        'Usuario': $localStorage.currentUser.usuario
      };

      $http.post(globalService.getUrl() + paths.GuardaMotivos, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.AddBitacoraTickets = function (factura, contrato, op) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'objBitacora': {
          'Usuario': $localStorage.currentUser.usuario,
          'ContratoCom': '' + contrato + '',
          'Op': op,
          'ClvFactura': factura
        }

      };

      $http.post(globalService.getUrl() + paths.AddBitacoraTickets, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.Sp_DameDetalleFacturaMaestra = function (clv_sesion) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'ClvSessionPadre': clv_sesion
      };

      $http.post(globalService.getUrl() + paths.Sp_DameDetalleFacturaMaestra, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetDeeAfirmacionPregunta_CM = function (contrato, MesesAdelantados, op, ClvSession) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'Contrato': contrato,
        'MesesAdelantados': MesesAdelantados,
        'Op': op,
        'ClvSession': ClvSession,
        'Op2': 1

      };

      $http.post(globalService.getUrl() + paths.GetDeeAfirmacionPregunta_CM, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };





    factory.uspHaz_Pregunta = function (contrato, op) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'Contrato': contrato,
        'Op': op
      };

      $http.post(globalService.getUrl() + paths.uspHaz_Pregunta, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetAgregaDetalleNotaDeCreditoMaestroList = function (ContratoCom, ClvSession, ClvFacturaCli, claves) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'ObjDetalle': {
          'ContratoCom': ContratoCom,
          'ClvSession': ClvSession,
          'ClvFacturaCli': ClvFacturaCli
        },
        'lstDetalle': claves
      };

      $http.post(globalService.getUrl() + paths.GetAgregaDetalleNotaDeCreditoMaestroList, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };



    factory.TblFacturasOpcionesCM = function (factura, cancelar, reimprimir, correo, OpRefacturar) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'objTblFacturasOpcionesCM': {
          'Clv_Factura': factura,
          'OpCancelar': cancelar,
          'OpReimprimir': reimprimir,
          'OpCorreo': correo,
          'OpRefacturar': OpRefacturar
        }

      };

      $http.post(globalService.getUrl() + paths.TblFacturasOpcionesCM, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };







    factory.GetCANCELA_FACTURASMAESTRA_PRINCIPAL = function (factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'ClvFacturaMaestro': factura

      };

      $http.post(globalService.getUrl() + paths.GetCANCELA_FACTURASMAESTRA_PRINCIPAL, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };


    factory.GetCancelaPagoFacturaMaestro = function (Clv_Pago) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      var parametros = {
        'Clv_Pago': Clv_Pago
      };
      $http.post(globalService.getUrl() + paths.GetCancelaPagoFacturaMaestro, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    factory.DetalleContratosFM = function (factura) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'Clv_FacturaMaestro': factura

      };

      $http.post(globalService.getUrl() + paths.DetalleContratosFM, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };




    factory.GetValidaSipuedohacerPagoc = function (ContratoMaestro, Clv_FacturaMaestro) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'ContratoMaestro': ContratoMaestro,
        'Clv_FacturaMaestro': Clv_FacturaMaestro
      };

      $http.post(globalService.getUrl() + paths.GetValidaSipuedohacerPagoc, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };





    factory.DameDetalle_FacturaporCli = function (factura, session) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var parametros = {
        'Clv_FacturaCli': factura,
        'Clv_Session': session

      };

      $http.post(globalService.getUrl() + paths.DameDetalle_FacturaporCli, JSON.stringify(parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };













    factory.UpdateFile = function (file, contrato, distribuidor) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('Distrib', distribuidor);
      data.append('idcontrato', contrato);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      $http.post(globalService.getUrl() + paths.UploadFile, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    factory.UploadFileDesconexion = function (file, contrato) {
      var deferred = $q.defer();
      var data = new FormData();
      for (var i = 0; i < file.length; i++) {
        data.append('file' + i, file[i]);
      }
      data.append('idcontrato', contrato);
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token,
          'Content-Type': undefined
        }
      };
      $http.post(globalService.getUrl() + paths.UploadFileDesconexion, data, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    factory.GetGeneraFacturaMaestroPrueba = function (contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'IdContratoMaestro': contrato
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetGeneraFacturaMaestroPrueba, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    factory.GetCuentaCableMaestro = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetCuentaCableMaestro, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (response) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    return factory;


  });
