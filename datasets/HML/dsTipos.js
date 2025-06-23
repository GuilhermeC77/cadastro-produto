function createDataset(fields, constraints, sortFields) {
  log.info("(GUILHERME) Executando dataset dsTipos");
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("CODIGO");
  dataset.addColumn("DESCRICAO");
  try {
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/TIPOS",
      dataType: "json",
      method: "GET",
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsTipos) Antes de realizar a chamada ao REST fluig");
      log.info("(dsTipos) Parametros da chamada ao REST fluig");
      log.dir(data);
      var restCall = clientService.invoke(JSON.stringify(data));
      log.info("(dsTipos) Depois da chamada ao REST fluig");
      log.dir(restCall);
      if (restCall.result == "") return datasetError("(dsTipos) REST retornou vazio.");
      else if (restCall.httpStatusResult != 200) return datasetError(restCall.result);
      var result = JSON.parse(restCall.result);
      result = result.tipo;
      log.info("(dsTipos) Chamada realizada com sucesso!");
      log.info("(dsTipos) Retorno chamada REST");
      log.dir(result);
      var trazer = ["MP", "AI", "PA", "SV", "MC", "EM"];
      for (var i = 0; i < result.length; i++) {
        if (trazer.includes(result[i].codigo)) dataset.addRow([false, result[i].codigo, result[i].descricao]);
      }
    } catch (e) {
      log.info("GUILHERME-log | Erro na chamada do DataSet dsTipos.js");
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

if (!Array.prototype.includes) {
  Array.prototype.includes = function () {
    "use strict";
    return Array.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
