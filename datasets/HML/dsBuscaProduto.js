// ===================================================================================================
// Função principal para criar o dataset
function createDataset(fields, constraints, sortFields) {
  try {
    log.info("(GUILHERME) Executando dataset dsBuscaProduto");
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("ERROR");
    dataset.addColumn("JSON");
    if (!fields[0]) throw new Error("CODIGO OBRIGATORIO");
    var codigoProduto = fields[0];
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/PRODUTO?codigo=" + codigoProduto,
      dataType: "json",
      method: "GET",
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsBuscaProduto) Antes de realizar a chamada ao REST fluig");
      log.info("(dsBuscaProduto) Parametros da chamada ao REST fluig");
      log.dir(data);
      var restCall = clientService.invoke(JSON.stringify(data));
      log.info("(dsBuscaProduto) Depois da chamada ao REST fluig");
      log.dir(restCall);
      if (restCall.result == "") return datasetError("(dsBuscaProduto) REST retornou vazio.");
      else if (restCall.httpStatusResult != 200) return datasetError(restCall.result);
      var result = JSON.parse(restCall.result);
      log.info("(dsBuscaProduto) Chamada realizada com sucesso!");
      log.info("(dsBuscaProduto) Retorno chamada REST");
      log.dir(result);
      dataset.addRow([false, JSON.stringify(result)]);
    } catch (e) {
      log.info("GUILHERME-log | Erro na chamada do DataSet dsBuscaProduto.js");
      log.dir(e);
      return datasetError(e.message ? e.message : e);
    }

    return dataset;
  } catch (e) {
    return datasetError(e);
  }
}

// ===================================================================================================
// Função para retornar erro no dataset
function datasetError(msg) {
  var dataset = DatasetBuilder.newDataset();
  dataset.addColumn("ERROR");
  dataset.addColumn("MSG");
  dataset.addRow([true, String(msg)]);

  return dataset;
}

// ===================================================================================================
// Polyfill para String.prototype.includes
if (!String.prototype.includes) {
  String.prototype.includes = function () {
    "use strict";
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
