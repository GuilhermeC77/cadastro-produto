function createDataset(fields, constraints, sortFields) {
  log.info("(GUILHERME) Executando dataset dsTipoServ");
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("CODIGO");
  dataset.addColumn("DESCRICAO");
  try {
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/TIPOSERVICO",
      dataType: "json",
      method: "GET",
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsTipoServ) Antes de realizar a chamada ao REST fluig");
      log.info("(dsTipoServ) Parametros da chamada ao REST fluig");
      log.dir(data);
      var restCall = clientService.invoke(JSON.stringify(data));
      log.info("(dsTipoServ) Depois da chamada ao REST fluig");
      log.dir(restCall);
      if (restCall.result == "") return datasetError("(dsTipoServ) REST retornou vazio.");
      else if (restCall.httpStatusResult != 200) return datasetError(restCall.result);
      var result = JSON.parse(restCall.result);
      result = result.tiposervico;
      log.info("(dsTipoServ) Chamada realizada com sucesso!");
      log.info("(dsTipoServ) Retorno chamada REST");
      log.dir(result);
      for (var i = 0; i < result.length; i++) {
        dataset.addRow([false, result[i].codigo, result[i].descricao]);
      }
    } catch (e) {
      log.info("GUILHERME-log | Erro na chamada do DataSet dsTipoServ.js");
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
