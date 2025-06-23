function displayFields(form, customHTML) {
  //Mostra os campos bloqueados, mesmo que o usuário não possa editar
  form.setShowDisabledFields(true);
  //Oculta o botão de imprimir
  form.setHidePrintLink(true);

  //Bucas valores de atividade e estado do processo
  var ATIVIDADE = getValue('WKNumState');
  var modo = form.getFormMode();
  var numSolicitacao = getValue('WKNumProces');

  //Adiciona ao HTML Funções que retornam valores exclusivos do Back-End FLUIG
  customHTML.append('<script>function getTask(){ return ' + ATIVIDADE + '; }</script>');
  customHTML.append("<script>function getMode(){ return '" + modo + "'; }</script>");
  customHTML.append("<script>function getUser(){ return '" + getValue('WKUser') + "'; }</script>");
  customHTML.append("<script>function getEmail(){ return '" + getValue('WKUser') + "'; }</script>");
  customHTML.append('<script>function getCompany(){ return ' + getValue('WKCompany') + '; }</script>');
  customHTML.append('<script>function getMobile(){ return ' + form.getMobile() + '; }</script>');

  var usuario = fluigAPI.getUserService().getCurrent();

  if (modo == 'ADD') {
    form.setValue('matriculaSolicitante', usuario.getCode());
  }

  if (ATIVIDADE == ATIVIDADES.ABERTURA) {
    var data = obterData();
    form.setValue('nomeSolicitante', usuario.getFullName());
    form.setValue('emailSolicitante', usuario.getEmail());
    form.setValue('dataSolicitacao', data);
    form.setValue('A1_dataSolicitacao', data);
    form.setValue('A3_empresa', 'SESCOOP/GO');
    form.setValue('A5_solicitante', usuario.getFullName());
    form.setValue('A6_email', usuario.getEmail());
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_COMPRAS) {
    var data = obterDataHora(); /*  */
    form.setValue('numeroSolicitacao', numSolicitacao);
    form.setValue('A2_numSolicitacao', numSolicitacao);
    form.setValue('C1_responsavel', usuario.getFullName());
    form.setValue('C2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_COMERCIAL) {
    var data = obterDataHora();
    form.setValue('D1_responsavel', usuario.getFullName());
    form.setValue('D2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_TECNICO) {
    var data = obterDataHora();
    form.setValue('E1_responsavel', usuario.getFullName());
    form.setValue('E2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_QUALIDADE) {
    var data = obterDataHora();
    form.setValue('F1_responsavel', usuario.getFullName());
    form.setValue('F2_data', data);
    customHTML.append('<script>function getCurrentDate(){ return ' + obterData() + '; }</script>');
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_FISCAL) {
    var data = obterDataHora();
    form.setValue('G1_responsavel', usuario.getFullName());
    form.setValue('G2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_COMEX) {
    var data = obterDataHora();
    form.setValue('H1_responsavel', usuario.getFullName());
    form.setValue('H2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_CONTABIL) {
    var data = obterDataHora();
    form.setValue('I1_responsavel', usuario.getFullName());
    form.setValue('I2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_CUSTOS) {
    var data = obterDataHora();
    form.setValue('J1_responsavel', usuario.getFullName());
    form.setValue('J2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_LOGISTICA) {
    var data = obterDataHora();
    form.setValue('K1_responsavel', usuario.getFullName());
    form.setValue('K2_data', data);
  }
  if (ATIVIDADE == ATIVIDADES.ANALISE_PLANEJAMENTO) {
    var data = obterDataHora();
    form.setValue('L1_responsavel', usuario.getFullName());
    form.setValue('L2_data', data);
  }

  //Adiquiri a Data do sistema
  function obterData() {
    var dateCorrente = new Date();
    var formatoData = new java.text.SimpleDateFormat('dd/MM/yyyy');
    return formatoData.format(dateCorrente);
  }
  function obterDataHora() {
    var dateCorrente = new Date();
    var formatoData = new java.text.SimpleDateFormat('dd/MM/yyyy HH:mm');
    return formatoData.format(dateCorrente);
  }

  // //Exibi as notificações
  // customHTML.append('<script>exibirNotificacoes()</script>')
}
