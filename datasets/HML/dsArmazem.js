// ===================================================================================================
// Função principal para criar o dataset
function createDataset(fields, constraints, sortFields) {
  log.info("(GUILHERME) Executando dataset dsArmazem");
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("CODIGO");
  dataset.addColumn("DESCRICAO");
  dataset.addColumn("RESPONSAVEL");
  dataset.addColumn("CODRESP");
  try {
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/ARMAZEM",
      dataType: "json",
      method: "GET",
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsArmazem) Antes de realizar a chamada ao REST fluig");
      log.info("(dsArmazem) Parametros da chamada ao REST fluig");
      log.dir(data);
      var restCall = clientService.invoke(JSON.stringify(data));
      log.info("(dsArmazem) Depois da chamada ao REST fluig");
      log.dir(restCall);
      if (restCall.result == "") return datasetError("(dsArmazem) REST retornou vazio.");
      else if (restCall.httpStatusResult != 200) return datasetError(restCall.result);
      var result = JSON.parse(restCall.result);
      result = result.armazem;
      log.info("(dsArmazem) Chamada realizada com sucesso!");
      log.info("(dsArmazem) Retorno chamada REST");
      log.dir(result);
      for (var i = 0; i < result.length; i++) {
        dataset.addRow([false, result[i].codigo, result[i].descricao, result[i].responsavel, result[i].codresp]);
      }
    } catch (e) {
      log.info("GUILHERME-log | Erro na chamada do DataSet dsArmazem.js");
      log.dir(e);
      return datasetError(e.message ? e.message : e);
    }

    return dataset;
  } catch (e) {
    return datasetError(e);
  }
}

// ===================================================================================================
// Função para retornar um dataset de erro
function datasetError(msg) {
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("MSG");
  dataset.addRow([true, String(msg)]);

  return dataset;
}

// ===================================================================================================
// Polyfill para String.prototype.includes para compatibilidade com navegadores antigos
if (!String.prototype.includes) {
  String.prototype.includes = function () {
    "use strict";
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
