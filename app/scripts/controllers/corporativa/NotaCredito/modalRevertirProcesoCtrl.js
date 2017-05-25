(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('modalRevertirProcesoCtrl', modalRevertirProcesoCtrl);

  modalRevertirProcesoCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', 'options'];

  function modalRevertirProcesoCtrl($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory, options) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;

    this.$onInit = function () {

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
    
     function ok() {

     
        ContratoMaestroFactory.GetProcedimientoCancelar(options.clvnota).then(function (data) {
            $uibModalInstance.dismiss('cancel');
          ngNotify.set(data.GetProcedimientoCancelarResult[0].Msg, 'success');
        })
      
      


    }
  }
})();
