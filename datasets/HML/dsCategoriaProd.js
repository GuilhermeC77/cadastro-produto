function createDataset(fields, constraints, sortFields) {
  log.info("(GUILHERME) Executando dataset dsCategoriaProd");
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("CLASSIFICACAOPROD");
  dataset.addColumn("CONVENIO");
  dataset.addColumn("DIVISAO");
  try {
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/CATEGORIAPROD",
      dataType: "json",
      method: "GET",
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsCategoriaProd) Antes de realizar a chamada ao REST fluig");
      log.info("(dsCategoriaProd) Parametros da chamada ao REST fluig");
      log.dir(data);
      var restCall = clientService.invoke(JSON.stringify(data));
      log.info("(dsCategoriaProd) Depois da chamada ao REST fluig");
      log.dir(restCall);
      if (restCall.result == "") return datasetError("(dsCategoriaProd) REST retornou vazio.");
      else if (restCall.httpStatusResult != 200) return datasetError(restCall.result);
      var result = JSON.parse(restCall.result);
      result = result.categoriaproduto;
      log.info("(dsCategoriaProd) Chamada realizada com sucesso!");
      log.info("(dsCategoriaProd) Retorno chamada REST");
      log.dir(result);
      for (var i = 0; i < result.length; i++) {
        dataset.addRow([false, result[i].clprod, result[i].convenio, result[i].divisao]);
      }
    } catch (e) {
      log.info("GUILHERME-log | Erro na chamada do DataSet dsCategoriaProd.js");
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
