function createDataset(fields, constraints, sortFields) {
  log.info("(GUILHERME) Executando dataset dsCadastroProdutos");
  try {
    if (!fields) return error("Parametro fields vazio.");
    if (!fields[0]) return error("Parametro fields[0] enviado incorretamente, favor informar o JSON para ser enviado ao Protheus.");
    var obj = JSON.parse(fields[0]);

    // consulta a API do OCR
    var clientService = fluigAPI.getAuthorizeClientService();
    var data = {
      companyId: String(getValue("WKCompany")),
      serviceCode: "Protheus",
      endpoint: "/PRODUTO",
      dataType: "json",
      method: "POST",
      params: obj,
      options: {
        encoding: "UTF-8"
      },
      timeoutService: "600" // segundos
    };

    try {
      log.info("(dsCadastroProdutos) Antes de realizar a chamada ao Protheus");
      var post = clientService.invoke(JSON.stringify(data));
      log.info("(dsCadastroProdutos) Depois da chamada");
      log.dir(post);
      if (post.result == "") return error("WS retornou vazio.");
      else if (post.httpStatusResult != 200) return error(post.result);
      log.info("(dsCadastroProdutos) Chamada realizada com sucesso!");
      var result = JSON.parse(post.result);

      var dataset = DatasetBuilder.newDataset();
      dataset.addColumn("ERROR");
      dataset.addColumn("MSG");
      dataset.addColumn("CODPRODUTO");
      dataset.addRow([result.status == 200 ? false : true, result.descricao, result.codProduto ? result.codigoProduto : null]);
    } catch (e) {
      log.info("uf-log | Erro na chamada do DataSet dsClientePOST.js");
      return error(e.message ? e.message : e);
    }

    return dataset;
  } catch (e) {
    return error(e);
  }
}

function error(msg) {
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
