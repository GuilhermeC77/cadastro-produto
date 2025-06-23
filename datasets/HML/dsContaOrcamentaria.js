function createDataset(fields, constraints, sortFields) {
  log.info("(GUILHERME) Executando dataset dsContaOrcamentaria");
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("CODIGO");
  dataset.addColumn("DESCRICAO");
  try {
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/CONTAORCAMENTARIA",
      dataType: "json",
      method: "GET",
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsContaOrcamentaria) Antes de realizar a chamada ao REST fluig");
      log.info("(dsContaOrcamentaria) Parametros da chamada ao REST fluig");
      log.dir(data);
      var restCall = clientService.invoke(JSON.stringify(data));
      log.info("(dsContaOrcamentaria) Depois da chamada ao REST fluig");
      log.dir(restCall);
      if (restCall.result == "") return datasetError("(dsContaOrcamentaria) REST retornou vazio.");
      else if (restCall.httpStatusResult != 200) return datasetError(restCall.result);
      var result = JSON.parse(restCall.result);
      result = result.contaorcamentaria;
      log.info("(dsContaOrcamentaria) Chamada realizada com sucesso!");
      log.info("(dsContaOrcamentaria) Retorno chamada REST");
      log.dir(result);
      for (var i = 0; i < result.length; i++) {
        dataset.addRow([false, result[i].codigo, result[i].descricao]);
      }
    } catch (e) {
      log.info("GUILHERME-log | Erro na chamada do DataSet dsContaOrcamentaria.js");
      log.dir(e);
      return datasetError(e.message ? e.message : e);
    }

    return dataset;
  } catch (e) {
    return datasetError(e);
  }
}

function datasetError(msg) {
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("MSG");
  dataset.addRow([true, String(msg)]);

  return dataset;
}

if (!String.prototype.includes) {
  String.prototype.includes = function () {
    "use strict";
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
