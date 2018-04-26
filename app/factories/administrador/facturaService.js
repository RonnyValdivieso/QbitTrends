angular.module('ProUrban')
.factory("FacturaService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {

		var service = {};

		service.buscarCabeceraFactura = buscarCabeceraFactura;
		service.buscarDetalleFactura = buscarDetalleFactura;
		service.pagarFactura = pagarFactura;
		service.guardarCabeceraFactura = guardarCabeceraFactura;
		service.guardarDetalleFactura = guardarDetalleFactura;
		service.guardarAsiento = guardarAsiento;
		service.guardarAsientoProveedores = guardarAsientoProveedores;

		service.init = init;

		return service;

		function init(id, conceptopago) {
			localStorageService.set('idCabeceraFactura', id);
			localStorageService.set('idconceptopago', conceptopago);
		}

		function buscarCabeceraFactura(id) {
			return $soap.post(AppConfig.apiUrl, "CabeceraFactura",
				{ id: id });
		}

		function buscarDetalleFactura(id) {
			return $soap.post(AppConfig.apiUrl, "DetalleFactura",
				{ id: id });
		}

		function pagarFactura(id) {
			return $soap.post(AppConfig.apiUrl, "PagarFactura",
					{ id: id });
		}

		function guardarCabeceraFactura(fecha_factura, numero_factura, subtotal, iva, total, formapago_id, usuario_id) {
			return $soap.post(AppConfig.apiUrl, "GuardarCabeceraFactura",
					{ fecha_factura: fecha_factura, numero_factura: numero_factura, subtotal: subtotal, iva: iva, total: total, formapago_id: formapago_id, usuario_id: usuario_id });
		}

		function guardarDetalleFactura(valor, conceptopago_id, factura_id) {
			return $soap.post(AppConfig.apiUrl, "GuardarDetalleFactura",
					{ valor: valor, conceptopago_id: conceptopago_id, factura_id: factura_id});
		}

		function guardarAsiento(fecha, valor, conceptoPago, factura_id) {
			return $soap.post(AppConfig.apiUrl, "GuardarAsiento",
					{ fecha:fecha, valor: valor, conceptoPago: conceptoPago, factura_id: factura_id});
		}

		function guardarAsientoProveedores(fecha, valor, conceptoPago, numero_referencia, cuenta_id) {
			return $soap.post(AppConfig.apiUrl, "GuardarAsientoProveedores",
					{ fecha:fecha, valor: valor, conceptoPago: conceptoPago, numero_referencia: numero_referencia, cuentaxpagar_id: cuenta_id });
		}

}]);
