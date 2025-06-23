// ===================================================================================================
// Função para preencher o campo hd_B4_tipo com base em outros campos do formulário
function caminhoProcesso() {
  var tipo = $('#B4_tipoHidden').val();
  var nutriAnimal = $('#hd_B4_nutriAnimalOp').val();
  if ((tipo == 'MP' && nutriAnimal == 'S') || (tipo == 'PA' && nutriAnimal == 'S')) {
    $('#hd_B4_tipo').val('caminho1');
  }
  if ((tipo == 'MP' && nutriAnimal == 'N') || (tipo == 'PA' && nutriAnimal == 'N') || tipo == 'EM') {
    $('#hd_B4_tipo').val('caminho2');
  }
  if (tipo == 'AI' || tipo == 'MC' || tipo == 'SV') {
    $('#hd_B4_tipo').val('caminho3');
  }

  preencheFatorConv();
}

function preenchePosIpiNcm() {
  var tipo = $('#B4_tipoHidden').val();
  if (tipo == 'SV') {
    $('#F4_pos_ipi').val('00000000 - MATERIAL OU OPERACAO NAO CLASSIFICADOS');
    $('#F_divQualidade #F4_pos_ipi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  } else {
    $('#F4_pos_ipi').val('');
    $('#F_divQualidade #F4_pos_ipi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
  }
}
// ===================================================================================================
// Função para preencher o campo B2_descricao com base em outros campos do formulário
function preencheDescricao() {
  // Obter valores dos campos
  var catalogo = $('#B3_catalogoProduto').val() ?? '';
  catalogo = catalogo.split(' - ');
  var tipo = $('#B4_tipoHidden').val() ?? '';
  var qntdeEmbalagens = $('#B7_qntdeEmbalagens').val() ?? '';
  var unidadeMedida1 = $('#B5_unidadeMedida1Hidden').val() ?? '';
  var centroCusto = $('#B11_centroCustoHidden').val() ?? '';

  // Preencher descrição conforme a lógica
  if (tipo === 'MP' || tipo === 'PA') {
    if (!catalogo[1]) {
      Swal.fire({
        title: 'Atenção',
        html: 'O campo "Catálogo de Produto" é obrigatório.',
        icon: 'warning',
      });
      return;
    } else {
      $('#B2_descricao').val(catalogo[1] + ' ' + tipo + ' ' + qntdeEmbalagens + ' ' + unidadeMedida1).trigger('change');
    }
  } else {
    $('#B2_descricao').val(catalogo[1]).trigger('change');
  }

  // Chamar funções complementares
  bloqueiaQntdeEmbalagens();
  preencheFatorConv();
  // Exemplo de uso com validação
  try {
    const resultado = definirArmazemPadrao(tipo, centroCusto, qntdeEmbalagens);
    console.log('Armazém Padrão:', resultado);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

function ocultaNutriAnimal() {
  var tipo = $('#B4_tipoHidden').val();
  if (tipo == 'MP' || tipo == 'PA') {
    $('#B_divCampoNutriAnimal').show();
  } else {
    $('#B_divCampoNutriAnimal').hide();
  }
}

// ===================================================================================================
// Função para preencher o campo B8_fatorConversao com base em outros campos do formulário
function preencheFatorConv() {
  var qntdeEmbalagens = $('#B7_qntdeEmbalagens').val();
  var unidadeMedida1 = $('#B5_unidadeMedida1Hidden').val();
  if (unidadeMedida1 == 'KG') {
    $('#B8_fatorConversao').val(qntdeEmbalagens);
  }
}

// ===================================================================================================
// Função para preencher o campo B12_rastroOpcoes com base no tipo selecionado
function bloqueiaOrigem() {
  var tipo = $('#B4_tipoHidden').val();
  if (tipo == 'SV') {
    $('#C3_origem').val('0 - Nacional');
    $('#C3_origemHidden').val('0');
    $('#C_divCompras #C3_origem').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
    preencheProdImport();
  } else {
    $('#C_divCompras #C3_origem').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
    if ($('#C3_origem').val() == '') {
      $('#C3_origem').val('');
      $('#C3_origemHidden').val('');
    }
    preencheProdImport();
  }
}
function bloqueiaQntdeEmbalagens() {
  var tipo = $('#B4_tipoHidden').val();

  if (tipo != 'SV' || tipo != 'AI') {
    $('#B7_qntdeEmbalagens').prop('readonly', false);
  } else {
    $('#B7_qntdeEmbalagens').val('1');
    $('#B7_qntdeEmbalagens').prop('readonly', true);
  }
}
// ===================================================================================================
// Função para preencher o campo C3_origem com base no tipo selecionado
function preencheRastro() {
  var tipo = $('#B4_tipoHidden').val();

  var radios = document.getElementsByName('B12_rastroOpcoes');
  var selectedValue;

  if (tipo == 'MP' || tipo == 'EM' || tipo == 'PA') {
    selectedValue = 'L'; // Defina o valor correto para este tipo
    $('#hd_B12_rastroOpcoes').val('L');
  } else if (tipo == 'AI' || tipo == 'MC' || tipo == 'SV') {
    selectedValue = 'N'; // Defina o valor correto para este tipo
    $('#hd_B12_rastroOpcoes').val('N');
  }
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].value == selectedValue) {
      radios[i].checked = true;
      break;
    }
  }
}
// ===================================================================================================
// Função para preencher o campo C4_prod_importado com base no tipo selecionado
function preencheProdImport() {
  var origem = $('#C3_origemHidden').val();

  var radios = document.getElementsByName('C4_prod_importado');
  var selectedValue;

  if (origem == '1' || origem == '6') {
    selectedValue = 'S'; // Defina o valor correto para este tipo
    $('#hd_C4_prod_importado').val('S');
  } else {
    selectedValue = 'N'; // Defina o valor correto para este tipo
    $('#hd_C4_prod_importado').val('N');
  }
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].value == selectedValue) {
      radios[i].checked = true;
      break;
    }
  }
}

function preencheRadiosComHd() {
  // Seleciona todos os campos hidden que começam com 'hd_'
  $('input[type="hidden"][id^="hd_"]').each(function () {
    var hiddenField = $(this);
    var hiddenValue = hiddenField.val();
    var radioName = hiddenField.attr('id').replace('hd_', '');

    // Se o campo hidden tiver um valor, preenche o radiobutton correspondente
    if (hiddenValue) {
      $('input[name="' + radioName + '"][value="' + hiddenValue + '"]').prop('checked', true);
    }
  });
}

function definirArmazemPadrao(tipo, centroCusto, qntdeEmbalagens) {
  // Verificação de campos obrigatórios
  if (!tipo || !centroCusto || qntdeEmbalagens === undefined || qntdeEmbalagens === null) {
    throw new Error('Os campos "tipo", "centroCusto" e "qntdeEmbalagens" são obrigatórios.');
  }

  let armazemPadrao = '';
  let respTecnico = '';
  let codRespTecnico = '';

  if (tipo === 'MP' && centroCusto === '050102') {
    armazemPadrao = 'FM - MERCADO- PREMIX';
  } else if (tipo === 'PA' && centroCusto === '050102') {
    armazemPadrao = 'F1 - REV- P.A PREMIX';
  } else if ((tipo === 'MP' || tipo === 'PA') && ['050101', '050103', '050104'].includes(centroCusto)) {
    armazemPadrao = 'G1 - REV- P.A NUT ANIMAL';
  } else if ((tipo === 'MP' || tipo === 'PA') && centroCusto === '050105') {
    armazemPadrao = 'E1 - REV- P.A PET FOOD';
  } else if ((tipo === 'MP' || tipo === 'PA') && centroCusto === '050201') {
    armazemPadrao = 'A1 - REV- P.A ALIMENTICIO';
  } else if ((tipo === 'MP' || tipo === 'PA') && centroCusto === '050301') {
    armazemPadrao = 'B1 - REV- P.A FARMA';
  } else if ((tipo === 'MP' || tipo === 'PA') && centroCusto === '050401') {
    if (qntdeEmbalagens <= 5) {
      armazemPadrao = 'D1'; //falta no doc da vidara
    } else if (qntdeEmbalagens > 5) {
      armazemPadrao = 'C1 - REV- P.A F F';
    }
  } else if (tipo === 'EM' || centroCusto === '050401') {
    armazemPadrao = 'CM - MERCADO- F F';
  } else if (centroCusto === '050301') {
    armazemPadrao = 'B2 - EMB II- FARMA';
  } else if (centroCusto === '050201') {
    armazemPadrao = 'AM'; //falta no doc da vidara
  } else if (centroCusto === '050102') {
    armazemPadrao = 'FM - MERCADO- PREMIX';
  } else if (['AI', 'MC', 'SV'].includes(tipo)) {
    armazemPadrao = 'ZZ - SERV ATIVOS USO COMS';
  } else {
    armazemPadrao = '';
  }
  if (!armazemPadrao === false) {
    $('#B10_armPadrao').val(armazemPadrao);
    var codArmPadrao = armazemPadrao.split(' - ')[0];
    $('#B10_armPadraoHidden').val(codArmPadrao);

    var filtros = [DatasetFactory.createConstraint('CODIGO', codArmPadrao, codArmPadrao, ConstraintType.MUST)];
    var consultaRespTecnico = DatasetFactory.getDataset('dsRespTecnic', null, filtros, null);
    consultaRespTecnico = consultaRespTecnico.values;
    if (consultaRespTecnico.length > 0) {
      respTecnico = consultaRespTecnico[0]['CODIGO'] + ' - ' + consultaRespTecnico[0]['DESCRICAO'];
      codRespTecnico = consultaRespTecnico[0]['CODIGO'];
      $('#F29_resp_tecnico').val(respTecnico);
      $('#F29_resp_tecnicoHidden').val(codRespTecnico);
    }
  }
  return armazemPadrao;
}

function exibeDesc() {
  $('.exibeDesc').click(function () {
    var ATIVIDADE = getTask();
    var targetDiv = $($(this).data('target'));
    var buttonId = $(this).attr('id');
    // if (buttonId === 'F8_desc_rot_ff' && ATIVIDADE !== 25) {
    //   Swal.fire({
    //     title: 'Atenção',
    //     html: `Você não possui permissão para incluir novos registros nesta atividade.`,
    //     icon: 'error',
    //   });
    //   return;
    // }
    // if (buttonId === 'F56_restricao_uso' && ATIVIDADE !== 25) {
    //   Swal.fire({
    //     title: 'Atenção',
    //     html: `Você não possui permissão para incluir novos registros nesta atividade.`,
    //     icon: 'error',
    //   });
    //   return;
    // }
    // if (buttonId === 'G19_mostrarDescServ' && ATIVIDADE !== 17) {
    //   Swal.fire({
    //     title: 'Atenção',
    //     html: `Você não possui permissão para incluir novos registros nesta atividade.`,
    //     icon: 'error',
    //   });
    //   return;
    // }

    if (targetDiv.is(':visible')) {
      targetDiv.hide();
    } else {
      targetDiv.show();
    }
  });
}

function bloqueiaAddFoto() {
  var ATIVIDADE = getTask(); // Supondo que getTask() retorna o valor de ATIVIDADE
  if (ATIVIDADE === 21) {
    // Adiciona o evento de clique para abrir o modal de foto apenas se ATIVIDADE for 21
    $('#openModalE9').on('click', function () {
      openFotoModal('E9');
    });
  } else if (ATIVIDADE === 25) {
    $('#openModalF14').on('click', function () {
      openFotoModal('F14');
    });
  } else {
    // Remove o evento de clique se ATIVIDADE for diferente de 21
    $('[id^="openModal"]').on('click', function () {
      Swal.fire({
        title: 'Atenção',
        html: `Você não possui permissão para incluir imagens nesta atividade.`,
        icon: 'error',
      });
      return;
    });
  }
}

function menuInterativo() {
  // Função para rolar a tela até a div correspondente
  function scrollToDiv(divId) {
    $('html, body').animate(
      {
        scrollTop: $(divId).offset().top,
      },
      500,
    );
  }

  // Adiciona eventos de clique aos botões do menu
  // Adiciona eventos de clique aos botões do menu
  $('#stepCompras').on('click', function () {
    scrollToDiv('#C_divCompras');
  });

  $('#stepComercial').on('click', function () {
    scrollToDiv('#D_divComercial');
  });

  $('#stepTecnico').on('click', function () {
    scrollToDiv('#E_divTecnico');
  });

  $('#stepQualidade').on('click', function () {
    scrollToDiv('#F_divQualidade');
  });

  $('#stepFiscal').on('click', function () {
    scrollToDiv('#G_divFiscal');
  });

  $('#stepComex').on('click', function () {
    scrollToDiv('#H_divComex');
  });

  $('#stepContabil').on('click', function () {
    scrollToDiv('#I_divContabil');
  });

  $('#stepCustos').on('click', function () {
    scrollToDiv('#J_divCustos');
  });

  $('#stepLogistica').on('click', function () {
    scrollToDiv('#K_divLogistica');
  });

  $('#stepPlanejamento').on('click', function () {
    scrollToDiv('#L_divPlanejamento');
  });

  // Função para exibir o botão "Retornar ao Início" ao rolar a página
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('#btnRetornarInicio').fadeIn();
    } else {
      $('#btnRetornarInicio').fadeOut();
    }
  });

  // Evento de clique para rolar a página de volta ao topo
  $('#btnRetornarInicio').on('click', function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      500,
    );
  });
}

function bloqueiaCampoCod() {
  let codTipoSolicitacao = $('#codTipoSolicitacao').val();
  if (codTipoSolicitacao == 'I') {
    limparCampos();
    $('#B_divAbertura #B1_codProduto').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
    $('input[name="tipoSolicitacao"][value="I"]').prop('checked', true);
    $('#codTipoSolicitacao').val('I');
  }
  if (codTipoSolicitacao == 'A') {
    $('#B_divAbertura #B1_codProduto').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
  }
}

function pesquisaCampoCod() {
  var loadingScreen = FLUIGC.loading(window);
  loadingScreen.show();

  let codProduto = $('#B1_codProduto').val();
  let filters = [DatasetFactory.createConstraint('CODIGO', codProduto, codProduto, ConstraintType.MUST)];
  let dsProdutos = DatasetFactory.getDataset('dsProdutos', null, filters, null);
  dsProdutos = dsProdutos.values;

  if (dsProdutos.length > 0) {
    $('#B1_codProduto').val(dsProdutos[0]['CODIGO']);
    $('#B2_descricao').val(dsProdutos[0]['DESCRICAO']).trigger('change');
    loadingScreen.hide();
  } else {
    $('#B1_codProduto').val('');
    $('#B2_descricao').val('').trigger('change');
    $('#codTipoSolicitacao').val('I');
    atualizarCampoHidden('tipoSolicitacao', 'codTipoSolicitacao');
    loadingScreen.hide();
  }
}

function limparCampos() {
  $('#formCadastroProduto')
    .find('input')
    .each(function () {
      if ($(this).attr('type') === 'radio') {
        $(this).prop('checked', false);
      } else {
        $(this).val('');
      }
    });
}

async function preencheEdicaoCampos() {
  const loading = FLUIGC.loading(window, {
    textMessage: 'Buscando informações do produto, por favor aguarde...',
  });
  try {
    loading.show();
    let codProduto = $('#B1_codProduto').val();
    if (codProduto) {
      let produto = await carregaDatasetDinamico('dsBuscaProduto', [codProduto]);
      if (produto.length && produto[0].JSON) {
        produto = JSON.parse(produto[0].JSON);
        await preencheDadosEdicao(produto);
        Swal.fire({
          title: `Produto ${codProduto} encontrado`,
          html: `Descrição: ${produto.descricao}`,
          icon: 'success',
        });
        console.log(produto);
      } else {
        Swal.fire({
          title: 'Atenção',
          html: `Erro ao buscar produto: ${codProduto}`,
          icon: 'error',
        });
        console.error('Erro ao buscar produto:', produto[0].JSON);
        $('input[name="tipoSolicitacao"][value="A"]').prop('checked', true);
        $('#codTipoSolicitacao').val('A');
      }
    } else {
      Swal.fire({
        title: 'Atenção',
        html: `Informe um código de produto para realizar a busca.`,
        icon: 'warning',
      });
      $('input[name="tipoSolicitacao"][value="A"]').prop('checked', true);
      $('#codTipoSolicitacao').val('A');
    }
  } catch (error) {
    console.error('Erro ao preencher os campos de edição:', error);
    Swal.fire({
      title: 'Erro',
      html: `Ocorreu um erro ao preencher os campos de edição.`,
      icon: 'error',
    });
  } finally {
    // Esconder o loading
    loading.hide();
  }
}

async function carregaDatasetDinamico(name, fields, constraints, orderBy) {
  return new Promise((resolve, reject) => {
    try {
      DatasetFactory.getDataset(name, fields, constraints, orderBy, {
        success: function (content) {
          return resolve(content.values);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(jqXHR, textStatus, errorThrown);
          throw reject(new Error(errorThrown));
        },
      });
    } catch (e) {
      return reject(new Error(e));
    }
  });
}

async function preencheDadosEdicao(produto) {
  // Preenchendo os campos com valores do produto ou vazio se não houver valor
  const dsUnidade1 = await carregaDatasetDinamico('dsUnidadeMedida1', ['CODIGO'], [], null);
  const unidade1 = dsUnidade1.find((item) => item.CODIGO == produto['1_unidade']);
  $('#B5_unidadeMedida1').val(unidade1 ? `${unidade1.CODIGO} - ${unidade1.DESCRICAO}` : '');
  $('#B5_unidadeMedida1Hidden').val(unidade1 ? unidade1.CODIGO : '');

  const dsUnidade2 = await carregaDatasetDinamico('dsUnidadeMedida2', ['CODIGO'], [], null);
  const unidade2 = dsUnidade2.find((item) => item.CODIGO == produto['2_unidade']);
  $('#B6_unidadeMedida2').val(unidade2 ? `${unidade2.CODIGO} - ${unidade2.DESCRICAO}` : '');
  $('#B6_unidadeMedida2Hidden').val(unidade2 ? unidade2.CODIGO : '');

  $('#G3_aliqIpi').val(produto.aliq_ipi);
  $('#G10_aliqIss').val(produto.aliq_iss);

  $('#hd_H5_anuenteOpcoes').val(produto.anuente);
  $('input[name="H5_anuenteOpcoes"][value="' + produto.anuente + '"]').prop('checked', true);

  $('#F27_aplicacao').val(produto.aplicacao);

  const dsArmazem = await carregaDatasetDinamico('dsArmazem', ['CODIGO'], [], null);
  const armPadrao = dsArmazem.find((item) => item.CODIGO == produto.armazem_padrao);
  $('#B10_armPadrao').val(armPadrao ? `${armPadrao.CODIGO} - ${armPadrao.DESCRICAO}` : '');
  $('#B10_armPadraoHidden').val(armPadrao ? armPadrao.CODIGO : '');
  $('#F29_resp_tecnico').val(armPadrao ? `${armPadrao.CODRESP} - ${armPadrao.RESPONSAVEL}` : '');
  $('#F29_resp_tecnicoHidden').val(armPadrao ? armPadrao.CODRESP : '');

  const dsCatalogoProd = await carregaDatasetDinamico('dsCatalogoProd', ['CODIGO'], [], null);
  const catalogoProduto = dsCatalogoProd.find((item) => item.CODIGO == produto.catalogo);
  $('#B3_catalogoProduto').val(catalogoProduto ? `${catalogoProduto.CODIGO} - ${catalogoProduto.DESCRICAO}` : '');
  $('#B3_catalogoProdutoHidden').val(catalogoProduto ? catalogoProduto.CODIGO : '');

  const dsCategoriaProd = await carregaDatasetDinamico('dsCategoriaProd', ['CLASSIFICACAOPROD'], [], null);
  const categoria_prd = dsCategoriaProd.find((item) => item.CLASSIFICACAOPROD == produto.categoria_prod);
  $('#F80_categoria_prd').val(categoria_prd ? categoria_prd.CLASSIFICACAOPROD : '');
  $('#F80_categoria_prdHidden').val(categoria_prd ? categoria_prd.CLASSIFICACAOPROD : '');
  $('#F81_convenio').val(categoria_prd ? categoria_prd.CONVENIO : '');

  const dsCentroCusto = await carregaDatasetDinamico('dsCentroCusto', ['CODIGO'], [], null);
  const centroCusto = dsCentroCusto.find((item) => item.CODIGO == produto.centro_custo);
  $('#B11_centroCusto').val(centroCusto ? `${centroCusto.CODIGO} - ${centroCusto.DESCRICAO}` : '');
  $('#B11_centroCustoHidden').val(centroCusto ? centroCusto.CODIGO : '');

  $('#E5_clasIndProd').val(produto.classif_ind_prod);

  const dsClasseValor = await carregaDatasetDinamico('dsClasseValor', ['CODIGO'], [], null);
  const classeValor = dsClasseValor.find((item) => item.CODIGO == produto.classe_valor);
  $('#I5_classeValor').val(classeValor ? `${classeValor.CODIGO} - ${classeValor.DESCRICAO}` : '');
  $('#I5_classeValorHidden').val(classeValor ? classeValor.CODIGO : '');

  $('#L4_codigo_allix').val(produto.cod_allix);
  $('#L6_codigo_espanha').val(produto.cod_espanha);

  const dsCest = await carregaDatasetDinamico('dsCest', ['CODIGO'], [], null);
  const cest = dsCest.find((item) => item.CODIGO == produto.cod_especificador_st);
  $('#G12_cest').val(cest ? `${cest.CODIGO} - ${cest.DESCRICAO}` : '');
  $('#G12_cestHidden').val(cest ? cest.CODIGO : '');

  $('#L5_codigo_gemba').val(produto.cod_gemba);
  $('#F3_codigo_gtin').val(produto.cod_gtin);
  $('#F15_codigo_ean').val(produto.codigo_ean);
  $('#F42_color_imp').val(produto.coloracao_imp);
  // $('#F22_concentracao_prod').val(produto.concentra_prd_control); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Marina
  $('#F58_concentracao').val(produto.concentracao);

  const dsContaContabil = await carregaDatasetDinamico('dsContaContabil', ['CODIGO'], [], null);
  const contaContabil = dsContaContabil.find((item) => item.CODIGO == produto.conta_contabil);
  $('#I3_contaContabil').val(contaContabil ? `${contaContabil.CODIGO} - ${contaContabil.DESCRICAO}` : '');
  $('#I3_contaContabilHidden').val(contaContabil ? contaContabil.CODIGO : '');

  const dsContaOrcamentaria = await carregaDatasetDinamico('dsContaOrcamentaria', ['CODIGO'], [], null);
  const contaOrcamentaria = dsContaOrcamentaria.find((item) => item.CODIGO == produto.conta_orcamentaria);
  $('#J4_contaOrcament').val(contaOrcamentaria ? `${contaOrcamentaria.CODIGO} - ${contaOrcamentaria.DESCRICAO}` : '');
  $('#J4_contaOrcamentHidden').val(contaOrcamentaria ? contaOrcamentaria.CODIGO : '');

  $('#hd_K4_wmsOpcoes').val(produto.controle_wms);
  $('input[name="K4_wmsOpcoes"][value="' + produto.controle_wms + '"]').prop('checked', true);

  $('#F81_convenio').val(produto.convenio_prod);
  $('#F59_densidade').val(produto.densidade);
  $('#B2_descricao').val(produto.descricao).trigger('change');
  $('#H6_descIngles').val(produto.descricao_ingles);
  $('#H7_descLi').val(produto.descricao_li);
  $('#H8_descPortg').val(produto.descricao_portugues);
  $('#F54_desc_qualidade').val(produto.descricao_qualidade);
  $('#G20_textDescServ').val(produto.descricao_servico);
  $('#F55_desc_aux_qualidade').val(produto.desc_aux_qualidade);
  $('#F9_desc_rot_ff_text').val(produto.desc_rotulo_ff);
  $('#F67_descricao').val(produto.descric_espec_prod);
  $('#F69_desc_espanhol').val(produto.descric_esp_espec_prod);
  $('#F68_desc_ingles').val(produto.descric_ing_espec_prod);
  $('#L8_dias_es').val(produto.dias_calc_es);
  $('#E6_diasValidade').val(produto.dias_valid_prod);

  const dsEmbalagemPremix = await carregaDatasetDinamico('dsEmbalagemPremix', ['CODIGO'], [], null);
  const embalagemPremix = dsEmbalagemPremix.find((item) => item.CODIGO == produto.embalagem_premix);
  $('#E3_embalagemPremix').val(embalagemPremix ? `${embalagemPremix.CODIGO} - ${embalagemPremix.DESCRICAO}` : '');
  $('#E3_embalagemPremixHidden').val(embalagemPremix ? embalagemPremix.CODIGO : '');

  $('#hd_L23_entra_mrp').val(produto.entra_mrp);
  $('input[name="L23_entra_mrp"][value="' + produto.entra_mrp + '"]').prop('checked', true);

  $('#L19_entrega').val(produto.entrega);
  $('#F53_especie_doadora_premix').val(produto.especie_doadora_premix);

  $('#hd_F16_estado_fisicoOp').val(produto.estado_fisico);
  $('input[name="F16_estado_fisicoOp"][value="' + produto.estado_fisico + '"]').prop('checked', true);

  $('#L16_seguranca').val(produto.est_seguranca);
  $('#L25_estoque_maximo').val(produto.estoque_maximo);

  const dsExNcm = await carregaDatasetDinamico('dsExNcm', ['CODIGO'], [], null);
  const exNcm = dsExNcm.find((item) => item.CODIGO == produto.ex_ncm);
  $('#F5_ex_ncm').val(exNcm ? `${exNcm.CODIGO} - ${exNcm.DESCRICAO}` : '');
  $('#F5_ex_ncmHidden').val(exNcm ? exNcm.CODIGO : '');

  $('#B8_fatorConversao').val(produto.fator_conv);

  const dsFinalidadeVenda = await carregaDatasetDinamico('dsFinalidadeVenda', ['CODIGO'], [], null);
  const finalidadeVenda = dsFinalidadeVenda.find((item) => item.CODIGO == produto.finalidade_venda);
  $('#D3_finalidade').val(finalidadeVenda ? `${finalidadeVenda.CODIGO} - ${finalidadeVenda.DESCRICAO}` : '');
  $('#D3_finalidadeHidden').val(finalidadeVenda ? finalidadeVenda.CODIGO : '');

  /* const dsEmbalagemPremix = await carregaDatasetDinamico('dsEmbalagemPremix', ['CODIGO'], [], null);
  const embalagemPremix = dsEmbalagemPremix.find((item) => item.CODIGO == produto.foto);
  $('#E9_fotoDesc').val(embalagemPremix ? `${embalagemPremix.CODIGO} - ${embalagemPremix.DESCRICAO}` : '');
  $('#E9_fotoDescHidden').val(embalagemPremix ? embalagemPremix.CODIGO : ''); */

  const dsFormulas = await carregaDatasetDinamico('dsFormulas', ['CODIGO'], [], null);
  const formEstSeg = dsFormulas.find((item) => item.CODIGO == produto.form_est_segur);
  $('#L17_form_est_seg').val(formEstSeg ? `${formEstSeg.CODIGO} - ${formEstSeg.DESCRICAO}` : '');
  $('#L17_form_est_segHidden').val(formEstSeg ? formEstSeg.CODIGO : '');

  const dsFormulas2 = await carregaDatasetDinamico('dsFormulas', ['CODIGO'], [], null);
  const formPrazo = dsFormulas2.find((item) => item.CODIGO == produto.form_prazo);
  $('#L18_form_prazo').val(formPrazo ? `${formPrazo.CODIGO} - ${formPrazo.DESCRICAO}` : '');
  $('#L18_form_prazoHidden').val(formPrazo ? formPrazo.CODIGO : '');

  $('#F48_forma_molecular').val(produto.formula_molecular);

  const dsGrupoProd = await carregaDatasetDinamico('dsGrupoProd', ['CODIGO'], [], null);
  const grupoProd = dsGrupoProd.find((item) => item.CODIGO == produto.grupo);
  $('#L3_grupo').val(grupoProd ? `${grupoProd.CODIGO} - ${grupoProd.DESCRICAO}` : '');
  $('#L3_grupoHidden').val(grupoProd ? grupoProd.CODIGO : '');

  $('#F36_grupo_epi').val(produto.grupo_epi);

  const dsGrupoTributario = await carregaDatasetDinamico('dsGrupoTributario', ['CODIGO'], [], null);
  const grupoTrib = dsGrupoTributario.find((item) => item.CODIGO == produto.grupo_trib);
  $('#G4_grupoTrib').val(grupoTrib ? `${grupoTrib.CODIGO} - ${grupoTrib.DESCRICAO}` : '');
  $('#G4_grupoTribHidden').val(grupoTrib ? grupoTrib.CODIGO : '');

  $('#hd_G5_impostoRendaOpcoes').val(produto.imposto_renda);
  $('input[name="G5_impostoRendaOpcoes"][value="' + produto.imposto_renda + '"]').prop('checked', true);

  $('#F33_intrucao_operacional').val(produto.instrucao_operac_ff);

  const dsItemConta = await carregaDatasetDinamico('dsItemConta', ['CODIGO'], [], null);
  const itemConta = dsItemConta.find((item) => item.CODIGO == produto.item_conta);
  $('#I4_itemConta').val(itemConta ? `${itemConta.CODIGO} - ${itemConta.DESCRICAO}` : '');
  $('#I4_itemContaHidden').val(itemConta ? itemConta.CODIGO : '');

  $('#F35_kit').val(produto.kit);
  $('#C6_lote_econom').val(produto.lote_economico);
  $('#C5_lote_minimo').val(produto.lote_minimo);
  $('#E7_modoUso').val(produto.modo_de_uso);

  $('#hd_J3_moeda').val(produto.moeda);
  $('input[name="J3_moeda"][value="' + produto.moeda + '"]').prop('checked', true);

  $('#hd_D4_moeda_comercial').val(produto.moeda_comercial);
  $('input[name="D4_moeda_comercial"][value="' + produto.moeda_comercial + '"]').prop('checked', true);

  const dsNbs = await carregaDatasetDinamico('dsNbs', ['CODIGO'], [], null);
  const nbs = dsNbs.find((item) => item.CODIGO == produto.nbs);
  $('#G18_nbs').val(nbs ? `${nbs.CODIGO} - ${nbs.DESCRICAO}` : '');
  $('#G18_nbsHidden').val(nbs ? nbs.CODIGO : '');

  const dsPosNCM = await carregaDatasetDinamico('dsPosNCM', ['CODIGO'], [], null);
  const ncm = dsPosNCM.find((item) => item.CODIGO == produto.ncm);
  $('#F4_pos_ipi').val(ncm ? `${ncm.CODIGO} - ${ncm.DESCRICAO}` : '');
  $('#F4_pos_ipiHidden').val(ncm ? ncm.CODIGO : '');

  $('#F52_nome_cient_rotulo').val(produto.nome_cientif_rotulo);
  $('#H3_nomeCientif').val(produto.nome_cientifico);
  $('#F51_nome_rotulo_premix').val(produto.nome_rotulo_premix);
  $('#F6_nota_minima').val(produto.nota_minima);
  $('#F25_numero_cas').val(produto.numero_cas);
  $('#A2_numSolicitacao').val(produto.nro_proc_fluig);
  $('#F39_obs_periculosidade').val(produto.obs_periculosidade);

  const dsOrigemProd = await carregaDatasetDinamico('dsOrigemProd', ['CODIGO'], [], null);
  const origem = dsOrigemProd.find((item) => item.CODIGO == produto.origem);
  $('#C3_origem').val(origem ? `${origem.CODIGO} - ${origem.DESCRICAO}` : '');
  $('#C3_origemHidden').val(origem ? origem.CODIGO : '');

  $('#F44_grau_pureza').val(produto.perc_grau_pureza);
  $('#D5_margem_bruto').val(produto.perc_margem_brut);
  $('#J6_varCambial').val(produto.perc_var_cambial);
  $('#G8_cofins').val(produto.per_cofins);
  $('#G7_csll').val(produto.per_csll);
  $('#G9_pis').val(produto.per_pis);
  $('#B9_pesoBruto').val(produto.peso_bruto);
  $('#L15_ponto_pedido').val(produto.ponto_pedido);
  $('#F60_prazo_cq').val(produto.prazo_cq);
  $('#L24_prazo_validade').val(produto.prazo_valid);

  $('#hd_C4_prod_importado').val(produto.prod_importado);
  $('input[name="C4_prod_importado"][value="' + produto.prod_importado + '"]').prop('checked', true);

  $('#F23_prod_incompativel').val(produto.prod_incompativel);
  $('#B7_qntdeEmbalagens').val(produto.qtd_embalagem);

  $('#hd_B12_rastroOpcoes').val(produto.rastro);
  $('input[name="B12_rastroOpcoes"][value="' + produto.rastro + '"]').prop('checked', true);

  $('#F24_registro_sif').val(produto.registro_sif);
  $('#F24_registro_sif').val(produto.restricao_uso);
  $('#F24_registro_sif').val(produto.rotulos_espec_ff);
  $('#A5_solicitante').val(produto.solicitante);
  $('#F41_sub_classe_risco').val(produto.sub_classe_risco);
  $('#F41_sub_classe_risco').val(produto.subtitulo);
  $('#F78_texto').val(produto.texto_espec_prod);

  const dsTipos = await carregaDatasetDinamico('dsTipos', ['CODIGO'], [], null);
  const tipo = dsTipos.find((item) => item.CODIGO == produto.tipo);
  $('#B4_tipo').val(tipo ? `${tipo.CODIGO} - ${tipo.DESCRICAO}` : '');
  $('#B4_tipoHidden').val(tipo ? tipo.CODIGO : '');
  ocultaNutriAnimal();

  $('#hd_K3_tipoConversao').val(produto.tipo_conv);
  $('input[name="K3_tipoConversao"][value="' + produto.tipo_conv + '"]').prop('checked', true);

  $('#F70_tipo').val(produto.tipo_espec_prod);

  $('#hd_L20_tipo_prazo').val(produto.tipo_prazo);
  $('input[name="L20_tipo_prazo"][value="' + produto.tipo_prazo + '"]').prop('checked', true);

  $('#L21_tolerancia').val(produto.tolerancia);
  $('#F71_un_medida').val(produto.uni_medida_espec_prod);
  if (produto.foto !== '') {
    await preencheRetornoFoto(produto.foto);
  }

  // Alterações 01/05/2025 - MIT006
  const dsDCB = await carregaDatasetDinamico('dsCodigoDcb', ['CODIGO'], [], null);
  const dcb = dsDCB.find((item) => item.CODIGO == produto.codigo_dcb);
  $('#F26_codigo_dcb').val(dcb ? `${dcb.CODIGO} - ${dcb.DESCRICAO}` : '');
  $('#F26_codigo_dcbHidden').val(dcb ? dcb.CODIGO : '');

  const dsOnu = await carregaDatasetDinamico('dsOnu', ['CODIGO'], [], null);
  const onu = dsOnu.find((item) => item.CODIGO == produto.numero_onu);
  $('#F17_num_onu').val(onu ? `${onu.CODIGO} - ${onu.DESCRICAO}` : '');
  $('#F17_num_onuHidden').val(onu ? onu.CODIGO : '');

  $("#hd_F37_periculosidadeOp").val(produto.periculosidade ?? '');
  atualizarCampoRadio('F37_periculosidadeOp', 'hd_F37_periculosidadeOp');

  $("#hd_F38_mat_embalagemOp").val(produto.material_embalagem ?? '');
  atualizarCampoRadio('F38_mat_embalagemOp', 'hd_F38_mat_embalagemOp');

  $("#hd_F40_origem_prdOp").val(produto.origem_produto ?? '');
  atualizarCampoRadio('F40_origem_prdOp', 'hd_F40_origem_prdOp');

  $("#F43_classe_impHidden").val(produto.classe_imp ?? '');
  atualizarCampoRadio('F43_classe_imp', 'F43_classe_impHidden');

  $("#hd_F82_prod_alergenicoOp").val(produto.produto_alergenico ?? '');
  atualizarCampoRadio('F82_prod_alergenicoOp', 'hd_F82_prod_alergenicoOp');
  $("#F83_mensagem_alergenico").val(produto.mensagem_prod_alergenico ?? '');

  $("#hd_L7_apontamento_produto").val(produto.apontamento_prod ?? '');
  atualizarCampoRadio('L7_apontamento_produto', 'hd_L7_apontamento_produto');

  const dsAplicacaoImp = await carregaDatasetDinamico('dsAplicacaoImp', ['CODIGO'], [], null);
  const aplicacaoImp = dsAplicacaoImp.find((item) => item.CODIGO == produto.aplicacao_imp);
  $('#F46_aplicacao_imp').val(aplicacaoImp ? `${aplicacaoImp.CODIGO} - ${aplicacaoImp.DESCRICAO}` : '');
  $('#F46_aplicacao_impHidden').val(aplicacaoImp ? aplicacaoImp.CODIGO : '');

  const dsFinalidadeQualidade = await carregaDatasetDinamico('dsFinalidadeQualidade', ['CODIGO'], [], null);
  const finalidadeQualidade = dsFinalidadeQualidade.find((item) => item.CODIGO == produto.finalidade);
  $('#F47_finalidade').val(finalidadeQualidade ? `${finalidadeQualidade.CODIGO} - ${finalidadeQualidade.DESCRICAO}` : '');
  $('#F47_finalidadeHidden').val(finalidadeQualidade ? finalidadeQualidade.CODIGO : '');

  const dsCondicaoArmazenagem = await carregaDatasetDinamico('dsCondArmazenagem', ['CODIGO'], [], null);
  const condArmazenagem = dsCondicaoArmazenagem.find((item) => item.CODIGO == produto.obs_qualidade);
  $('#F50_condicao_armz').val(condArmazenagem ? `${condArmazenagem.CODIGO} - ${condArmazenagem.DESCRICAO}` : '');
  $('#F50_condicao_armzHidden').val(condArmazenagem ? condArmazenagem.CODIGO : '');

  const ensaios = produto.ensaios;
  for (const ensaio of ensaios) {
    const row = addNewTableRow('tbEnsaio')
    const dsEnsaio = await carregaDatasetDinamico('dsEnsaio', ['CODIGO'], [], null);
    const ensaioEncontrado = dsEnsaio.find((item) => item.CODIGO == produto.ensaio_espec_prod);
    const dsLaboratorio = await carregaDatasetDinamico('dsLaboratorio', ['CODIGO'], [], null);
    const laboratorioEncontrado = dsLaboratorio.find((item) => item.CODIGO == produto.laborat_espec_prod);
    $("#F73_ensaio___" + row).val(ensaio.ensaio_espec_prod);
    $("#F73_ensaioHidden___" + row).val(ensaio.ensaio_espec_prod);
    $("#F74_desc_ensaio___" + row).val(ensaioEncontrado.DESCRICAO ?? '');
    $("#F75_laboratorio___" + row).val(ensaio.laborat_espec_prod);
    $("#F75_laboratorioHidden___" + row).val(ensaio.laborat_espec_prod);
    $("#F76_desc_laboratorio___" + row).val(laboratorioEncontrado.DESCRICAO ?? '');
    $("#F77_seq_labor___" + row).val(ensaio.seq_lab_espec_prod);
    $("#F78_texto___" + row).val(ensaio.texto_espec_prod);
  }

  const fornecedores = produto.fornecedores;
  for (const fornecedor of fornecedores) {
    const row = addNewTableRow("tbFornecedor");
    $("#C8_fornecedor___" + row).val(fornecedor.cod_fornec);
    $("#C8_fornecedorHidden___" + row).val(fornecedor.cod_fornec);
    $("#C9_loja___" + row).val(fornecedor.loja_fornec);
    $("#C10_codProdutoFornecedor___" + row).val(fornecedor.produt_fornec);
    $("#C16_fatorConversao___" + row).val(fornecedor.fator_conv_fornec);
    $("#F62_dFata_expiracao___" + row).val(fornecedor.data_expiracao);
    $("#F64_tempo_limite___" + row).val(fornecedor.tempo_limite);
    $("#C14_situacao___" + row).val(fornecedor.situacao);
    $("#C14_situacaoHidden___" + row).val(fornecedor.situacao);
    $("#C12_loja_fabricante___" + row).val(fornecedor.loja_fabric_fornec);
    $("#F63_skip_lote___" + row).val(fornecedor.skip_lote);
    $("#F63_skip_loteHidden___" + row).val(fornecedor.skip_lote);
    $("#C15_unidadeHidden___" + row).val(fornecedor.unid_medida_fornec);
    $("#hd_F61_homologacao___" + row).val(fornecedor.homologacao);
    $("#hd_C13_fab_rev_perm___" + row).val(fornecedor.fabric_reven_perm);
    $("#hd_C17_tipoConversao___" + row).val(fornecedor.tipo_conv_fornec);
    atualizarCampoRadio("hd_F61_homologacao___" + row, "F61_homologacao___" + row);
    atualizarCampoRadio("hd_C13_fab_rev_perm___" + row, "C13_fab_rev_perm___" + row);
    atualizarCampoRadio("hd_C17_tipoConversao___" + row, "C17_tipoConversao___" + row);
  }

  const clientes = produto.clientes;
  for (const cliente of clientes) {
    const row = addNewTableRow("tbCliente");

    $("#D7_cliente___" + row).val(cliente.cod_cliente);
    $("#D7_clienteHidden___" + row).val(cliente.cod_cliente);
    $("#D8_loja___" + row).val(cliente.loja_cliente);
    $("#D9_codProdutoCliente___" + row).val(cliente.produt_cliente);
    $("#D10_descricaoCliente___" + row).val(cliente.desc_prod_cliente);
    $("#D12_lojaFabricante___" + row).val(cliente.loja_fabric_cliente);
    $("#D11_clienteCodFabricante___" + row).val(cliente.cod_fabric_cliente);
    $("#D11_clienteCodFabricanteHidden___" + row).val(cliente.cod_fabric_cliente);
    $("#D13_clienteCentroCustoHidden___" + row).val(cliente.centro_custo_cliente);
    $("#D14_clienteCentroCusto___" + row).val(cliente.centro_custo_cliente);
  }
}

async function preencheRetornoFoto(descricaoImagem) {
  try {
    const pastaRaiz = await findFolder(0, 'protheus_reposit');
    if (!pastaRaiz || pastaRaiz.length === 0) {
      return Swal.fire({
        title: 'Atenção',
        html: `Pasta raiz das imagens Protheus não encontrada.`,
        icon: 'error',
      });
    }

    const imagens = await findFiles(pastaRaiz[0]['documentPK.documentId']);
    let id;
    let descricao;
    let url;
    let imagensHtml = '';
    for (const item of imagens) {
      if (item['documentDescription'].split('.')[0].toUpperCase() === descricaoImagem) {
        const physicalPath = await carregaDatasetDinamico('dsPhysicalFilePath', [String(item['documentPK.documentId'])]);
        if (!physicalPath || physicalPath.length === 0) continue;
        id = item['documentPK.documentId'];
        descricao = item['documentDescription'];
        url = physicalPath[0].URL;
      }
    }
    if (id && descricao && url) {
      console.log('ID Documento selecionado:', id);
      $(`#E9_fotoHidden`).val(id);
      $(`#E9_fotoUrlHidden`).val(url);
      $(`#E9_fotoDescHidden`).val(descricao.split('.')[0].toUpperCase());
      //remove div com miniatura da foto
      if ($(`#E9_divMiniatura`).length) {
        $(`#E9_divMiniatura`).remove();
      }
      //adiciona miniatura com base na url da imagem
      $(`#E9_divSelecionaFoto`).append(`
        <div id="E9_divMiniatura" class="media">
        <a class="pull-left" href="#">
        <img class="media-object" style="max-width: 100%; max-height: 500px; object-fit: contain;" src="${url}" alt="Imagem selecionada pelo usuário">
        </a>
        <div class="media-body">
            <h4 class="media-heading">Imagem selecionada</h4>
            <label>ID: ${id}</label>
        </div>
    </div>`);
    } else {
      $(`#E9_fotoHidden`).val('');
      $(`#E9_fotoUrlHidden`).val('');
      $(`#E9_fotoDescHidden`).val('');
      alert('Nenhuma imagem selecionada!');
    }
  } catch (error) {
    console.error(error);
  }
}
