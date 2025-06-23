function servicetask57(attempt, message) {
  try {
    var body = montaJsonEnvio();
    var datasetCriacao = DatasetFactory.getDataset('dsCadastroProdutos', [JSONUtil.toJSON(body)], null, null);
    if (datasetCriacao.getRowsCount() == 0) throw 'Dataset de Cadastro do Produto retornou vazio';
    var existeErro = datasetCriacao.getValue(0, 'ERROR');
    if (existeErro == true || existeErro == 'true') {
      throw datasetCriacao.getValue(0, 'MSG') || 'Dataset de Cadastro do Produto retornou um erro não identificado';
    }
    if (existeErro == false || existeErro == 'false') {
      var codigoProduto = datasetCriacao.getValue(0, 'CODPRODUTO');
      hAPI.setCardValue('B1_codProduto', codigoProduto);
      var usuario = getValue('WKUser');
      var numSolicitacao = getValue('WKNumProces');
      var complemento =
        '<div style="background: yellow;">Produto cadastrado com sucesso no Protheus. Código do Produto gerado: ' + codigoProduto + '</div>';
      hAPI.setTaskComments(usuario, numSolicitacao, 0, complemento);
      var descricao = hAPI.getCardValue('B2_descricao');
      hAPI.setCardValue('identificador', codigoProduto + ' - ' + descricao);
      hAPI.setCardValue("validaEdicao", "2");
      return;
    }
    throw datasetCriacao.getValue(0, 'MSG') || 'Erro não identificado';
  } catch (error) {
    log.info('Erro ao executar a integração com o Cadastro de Produtos');
    log.dir(error);
    throw error;
  }
}

function montaJsonEnvio() {
  var arrayClientes = getClientesArray();
  var arrayFornecedores = getFornecedoresArray();
  var arrayEnsaios = getEnsaiosArray();
  var body = {
<<<<<<< HEAD
    cod_produto: pegaValue('B1_codProduto'),
    '1_unidade': pegaValue('B5_unidadeMedida1Hidden'),
    '2_unidade': pegaValue('B6_unidadeMedida2Hidden'),
    aliq_ipi: pegarFloat('G3_aliqIpi'),
    aliq_iss: pegarFloat('G10_aliqIss'),
    amostra_inspecao: pegaValue('hd_F79_amostra_insp'),
    anuente: pegaValue('hd_H5_anuenteOpcoes'),
    aplicacao: pegaValue('F27_aplicacao'),
    armazem_padrao: pegaValue('B10_armPadraoHidden'),
=======
    cod_produto: getCardValue('B1_codProduto'),
    '1_unidade': getCardValue('B5_unidadeMedida1Hidden'),
    '2_unidade': getCardValue('B6_unidadeMedida2Hidden'),
    aliq_ipi: getCardValueFloat('G3_aliqIpi'),
    aliq_iss: getCardValueFloat('G10_aliqIss'),
    anuente: getCardValue('hd_H5_anuenteOpcoes'),
    aplicacao: getCardValue('F27_aplicacao'),
    armazem_padrao: getCardValue('B10_armPadraoHidden'),
>>>>>>> 7aacc3792a5cb4f50ab056547e849bc32cb61698
    bloqueado: '2',
    catalogo: getCardValue('B3_catalogoProdutoHidden'),
    categoria_prod: getCardValue('F80_categoria_prdHidden'),
    centro_custo: getCardValue('B11_centroCustoHidden'),
    classif_ind_prod: getCardValue('E5_clasIndProd'),
    classe_valor: getCardValue('I5_classeValorHidden'),
    clientes: arrayClientes,
<<<<<<< HEAD
    cod_allix: pegaValue('L4_codigo_allix'),
    cod_espanha: pegaValue('L6_codigo_espanha'),
    cod_especificador_st: pegaValue('G12_cestHidden'),
    cod_gemba: pegaValue('L5_codigo_gemba'),
    cod_gtin: pegaValue('F3_codigo_gtin'),
    codigo_ean: pegaValue('F15_codigo_ean'),
    coloracao_imp: pegaValue('F42_color_imp'),
    concentra_prd_control: pegaValue('F22_concentracao_prod'),
    concentracao: pegarFloat('F58_concentracao'),
    conta_contabil: pegaValue('I3_contaContabilHidden'),
    conta_orcamentaria: pegaValue('J4_contaOrcamentHidden'),
    controle_wms: pegaValue('hd_K4_wmsOpcoes'),
    convenio_prod: pegaValue('F81_convenio'),
    densidade: pegarFloat('F59_densidade'),
    descricao: pegaValue('B2_descricao'),
    descricao_ingles: pegaValue('H6_descIngles'),
    descricao_li: pegaValue('H7_descLi'),
    descricao_portugues: pegaValue('H8_descPortg'),
    descricao_qualidade: pegaValue('F54_desc_qualidade'),
    descricao_servico: pegaValue('G20_textDescServ'),
    desc_aux_qualidade: pegaValue('F55_desc_aux_qualidade'),
    desc_rotulo_ff: pegaValue('F9_desc_rot_ff_text'),
    descric_espec_prod: pegaValue('F67_descricao'),
    descric_esp_espec_prod: pegaValue('F69_desc_espanhol'),
    descric_ing_espec_prod: pegaValue('F68_desc_ingles'),
    dias_calc_es: pegarFloat('L8_dias_es'),
    dias_valid_prod: pegarFloat('E6_diasValidade'),
    embalagem_premix: pegaValue('E3_embalagemPremixHidden'),
    entra_mrp: pegaValue('hd_L23_entra_mrp'),
    entrega: pegarFloat('L19_entrega'),
    especie_doadora_premix: pegaValue('F53_especie_doadora_premix'),
    estado_fisico: pegaValue('hd_F16_estado_fisicoOp'),
    est_seguranca: pegarFloat('L16_seguranca'),
    estoque_maximo: pegarFloat('L25_estoque_maximo'),
    exclui_risco_camb: '2',
    ex_ncm: pegaValue('F5_ex_ncmHidden'),
    fator_conv: pegarFloat('B8_fatorConversao'),
    finali_dade_qualidade: pegaValue('F47_finalidadeHidden'),
    finalidade_venda: pegaValue('D3_finalidadeHidden'),
    foto: pegaValue('E9_fotoDescHidden'),
    form_est_segur: pegaValue('L17_form_est_segHidden'),
    form_prazo: pegaValue('L18_form_prazoHidden'),
    formula_molecular: pegaValue('F48_forma_molecular'),
=======
    cod_allix: getCardValue('L4_codigo_allix'),
    cod_espanha: getCardValue('L6_codigo_espanha'),
    cod_especificador_st: getCardValue('G12_cestHidden'),
    cod_gemba: getCardValue('L5_codigo_gemba'),
    cod_gtin: getCardValue('F3_codigo_gtin'),
    codigo_ean: getCardValue('F15_codigo_ean'),
    coloracao_imp: getCardValue('F42_color_imp'),
    concentracao: getCardValueFloat('F58_concentracao'),
    conta_contabil: getCardValue('I3_contaContabilHidden'),
    conta_orcamentaria: getCardValue('J4_contaOrcamentHidden'),
    controle_wms: getCardValue('hd_K4_wmsOpcoes'),
    convenio_prod: getCardValue('F81_convenio'),
    densidade: getCardValueFloat('F59_densidade'),
    descricao: getCardValue('B2_descricao'),
    descricao_ingles: getCardValue('H6_descIngles'),
    descricao_li: getCardValue('H7_descLi'),
    descricao_portugues: getCardValue('H8_descPortg'),
    descricao_qualidade: getCardValue('F54_desc_qualidade'),
    descricao_servico: getCardValue('G20_textDescServ'),
    desc_aux_qualidade: getCardValue('F55_desc_aux_qualidade'),
    desc_rotulo_ff: getCardValue('F9_desc_rot_ff_text'),
    descric_espec_prod: getCardValue('F67_descricao'),
    descric_esp_espec_prod: getCardValue('F69_desc_espanhol'),
    descric_ing_espec_prod: getCardValue('F68_desc_ingles'),
    dias_calc_es: getCardValueFloat('L8_dias_es'),
    dias_valid_prod: getCardValueFloat('E6_diasValidade'),
    embalagem_premix: getCardValue('E3_embalagemPremixHidden'),
    entra_mrp: getCardValue('hd_L23_entra_mrp'),
    entrega: getCardValueFloat('L19_entrega'),
    especie_doadora_premix: getCardValue('F53_especie_doadora_premix'),
    estado_fisico: getCardValue('hd_F16_estado_fisicoOp'),
    est_seguranca: getCardValueFloat('L16_seguranca'),
    estoque_maximo: getCardValueFloat('L25_estoque_maximo'),
    exclui_risco_camb: 'N',
    ex_ncm: getCardValue('F5_ex_ncmHidden'),
    fator_conv: getCardValueFloat('B8_fatorConversao'),
    finalidade_venda: getCardValue('D3_finalidadeHidden'),
    foto: getCardValue('E9_fotoDescHidden'),
    form_est_segur: getCardValue('L17_form_est_segHidden'),
    form_prazo: getCardValue('L18_form_prazoHidden'),
    formula_molecular: getCardValue('F48_forma_molecular'),
>>>>>>> 7aacc3792a5cb4f50ab056547e849bc32cb61698
    fornecedores: arrayFornecedores,
    grupo: getCardValue('L3_grupoHidden'),
    grupo_epi: getCardValue('F36_grupo_epi'),
    grupo_trib: getCardValue('G4_grupoTribHidden'),
    imposto_renda: getCardValue('hd_G5_impostoRendaOpcoes'),
    ini_vigencia_espec_prod: getLocaleDateString(),
<<<<<<< HEAD
    instrucao_operac_ff: pegaValue('F33_intrucao_operacional'),
    item_conta: pegaValue('I4_itemContaHidden'),
    kit: pegaValue('F35_kit'),
    lote_economico: pegarFloat('C6_lote_econom'),
    lote_minimo: pegarFloat('C5_lote_minimo'),
    modo_de_uso: pegaValue('E7_modoUso'),
    moeda: pegaValue('hd_J3_moeda'),
    moeda_comercial: pegaValue('hd_D4_moeda_comercial'),
    nbs: pegaValue('G18_nbsHidden'),
    ncm: pegaValue('F4_pos_ipiHidden'),
    nome_cientif_rotulo: pegaValue('F52_nome_cient_rotulo'),
    nome_cientifico: pegaValue('H3_nomeCientif'),
    nome_rotulo_premix: pegaValue('F51_nome_rotulo_premix'),
    nota_minima: pegarFloat('F6_nota_minima'),
    numero_cas: pegaValue('F25_numero_cas'),
    nro_proc_fluig: pegaValue('A2_numSolicitacao'),
    obs_periculosidade: pegaValue('F39_obs_periculosidade'),
    origem: pegaValue('C3_origemHidden'),
    perc_grau_pureza: pegarFloat('F44_grau_pureza'),
    perc_margem_brut: pegarFloat('D5_margem_bruto'),
    perc_var_cambial: pegarFloat('J6_varCambial'),
    per_cofins: pegarFloat('G8_cofins'),
    per_csll: pegarFloat('G7_csll'),
    per_pis: pegarFloat('G9_pis'),
    peso_bruto: pegarFloat('B9_pesoBruto'),
    ponto_pedido: pegarFloat('L15_ponto_pedido'),
    prazo_cq: pegarFloat('F60_prazo_cq'),
    prazo_valid: pegarFloat('L24_prazo_validade'),
    prod_importado: pegaValue('hd_C4_prod_importado'),
    prod_incompativel: pegaValue('F23_prod_incompativel'),
    qtd_embalagem: pegarFloat('B7_qntdeEmbalagens'),
    rastro: pegaValue('hd_B12_rastroOpcoes'),
    registro_sif: pegaValue('F24_registro_sif'),
    restricao_uso: pegaValue('F24_registro_sif'),
    rotulos_espec_ff: pegaValue('F24_registro_sif'),
    solicitante: pegaValue('A5_solicitante'),
    sub_classe_risco: pegaValue('F41_sub_classe_risco'),
    subtitulo: pegaValue('F41_sub_classe_risco'),
    texto_espec_prod: pegaValue('F78_texto'),
    tipo: pegaValue('B4_tipoHidden'),
    tipo_conv: pegaValue('hd_K3_tipoConversao'),
    tipo_espec_prod: pegaValue('B4_tipoHidden'),
    tipo_prazo: pegaValue('hd_L20_tipo_prazo'),
    tolerancia: pegarFloat('L21_tolerancia'),
    uni_medida_espec_prod: pegaValue('F71_un_medida'),
=======
    instrucao_operac_ff: getCardValue('F33_intrucao_operacional'),
    item_conta: getCardValue('I4_itemContaHidden'),
    lote_economico: getCardValueFloat('C6_lote_econom'),
    lote_minimo: getCardValueFloat('C5_lote_minimo'),
    modo_de_uso: getCardValue('E7_modoUso'),
    moeda: getCardValue('hd_J3_moeda'),
    moeda_comercial: getCardValue('hd_D4_moeda_comercial'),
    nbs: getCardValue('G18_nbsHidden'),
    ncm: getCardValue('F4_pos_ipiHidden'),
    nome_cientif_rotulo: getCardValue('F52_nome_cient_rotulo'),
    nome_cientifico: getCardValue('H3_nomeCientif'),
    nome_rotulo_premix: getCardValue('F51_nome_rotulo_premix'),
    nota_minima: getCardValue('F6_nota_minima'),
    numero_cas: getCardValue('F25_numero_cas'),
    nro_proc_fluig: getCardValue('A2_numSolicitacao'),
    obs_periculosidade: getCardValue('F39_obs_periculosidade'),
    origem: getCardValue('C3_origemHidden'),
    perc_grau_pureza: getCardValueFloat('F44_grau_pureza'),
    perc_margem_brut: getCardValueFloat('D5_margem_bruto'),
    perc_var_cambial: getCardValueFloat('J6_varCambial'),
    per_cofins: getCardValueFloat('G8_cofins'),
    per_csll: getCardValueFloat('G7_csll'),
    per_pis: getCardValueFloat('G9_pis'),
    peso_bruto: getCardValueFloat('B9_pesoBruto'),
    ponto_pedido: getCardValueFloat('L15_ponto_pedido'),
    prazo_cq: getCardValueFloat('F60_prazo_cq'),
    prazo_valid: getCardValueFloat('L24_prazo_validade'),
    prod_importado: getCardValue('hd_C4_prod_importado'),
    prod_incompativel: getCardValue('F23_prod_incompativel'),
    qtd_embalagem: getCardValueFloat('B7_qntdeEmbalagens'),
    rastro: getCardValue('hd_B12_rastroOpcoes'),
    registro_sif: getCardValue('F24_registro_sif'),
    restricao_uso: getCardValue('F24_registro_sif'),
    rotulos_espec_ff: getCardValue('F24_registro_sif'),
    solicitante: getCardValue('A5_solicitante'),
    sub_classe_risco: getCardValue('F41_sub_classe_risco'),
    subtitulo: getCardValue('F41_sub_classe_risco'),
    texto_espec_prod: getCardValue('F78_texto'),
    tipo: getCardValue('B4_tipoHidden'),
    tipo_conv: getCardValue('hd_K3_tipoConversao'),
    tipo_espec_prod: getCardValue('F70_tipo'),
    tipo_prazo: getCardValue('hd_L20_tipo_prazo'),
    tolerancia: getCardValueFloat('L21_tolerancia'),
    uni_medida_espec_prod: getCardValue('F71_un_medida'),
    
    //ULTIMAS ALTERACOES SOLICITADAS
    B1_MSBLQL: "2",

    // ALTERACOES DIA 01/05/2025 - MIT006
    numero_onu: getCardValue('F17_num_onuHidden'),
    codigo_dcb: getCardValue('F26_codigo_dcbHidden'),
    ibama: getCardValue('F34_codigo_IBAMAHidden'),
    periculosidade: getCardValue('hd_F37_periculosidadeOp'),
    material_embalagem: getCardValue('hd_F38_mat_embalagemOp'),
    origem_produto: getCardValue('hd_F40_origem_prdOp'),
    classe_imp: getCardValue('F43_classe_impHidden'),
    aplicacao_imp: getCardValue('F46_aplicacao_impHidden'),
    finalidade: getCardValue('F47_finalidadeHidden'),
    obs_qualidade: getCardValue('F50_condicao_armzHidden'),
    produto_alergenico: getCardValue('hd_F82_prod_alergenicoOp'),
    mensagem_prod_alergenico: getCardValue('F83_mensagem_alergenico'),
    kit: getCardValue('F35_kit'),
    // concentra_prd_control: getCardValue('F22_concentracao_prod'), //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Marina
    // amostra_inspecao: getCardValue('hd_F79_amostra_insp'), //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Chiari

    // ALTERACOES DIA 06/05/2025 - MIT006
    ensaios: arrayEnsaios,
    apontamento_prod: getCardValue('hd_L7_apontamento_produto'),
    formato_mrp:  getCardValue('hd_L9_form_mrp'),
    aglutinacao_mrp: getCardValue('L10_aglu_mrpHidden'),
    zona_armazenagem: getCardValue('K10_zonaArmazHidden'),
    servico_entrada: getCardValue('K11_servEntrHidden'),
    servico_transf: getCardValue('K12_servTransHidden'),
    servico_saida: getCardValue('K13_servSaidaHidden'),
    pulmao_wms: getCardValue('hd_K14_pulmaoOpcoes'),
    servico_embalagem: getCardValue('K15_servEmbHidden'),
    endereco_saida: getCardValue('K16_endSaidaHidden'),
    endereco_entrada: getCardValue('K18_endereco_entradaHidden'),
    prod_origem_gmo: getCardValue('hd_F49_prd_or_gmoOp'),
    classif_tipo_servico: getCardValue('G16_tipoServicoHidden'),
    // descricao_servico: '', //ja tinha
    // nbs: '', //ja tinha
    // categoria_prod: '', //ja tinha
    // convenio_prod: '', //ja tinha
    tipo_rotulo: getCardValue('L12_tipo_rotuloHidden'),
    tipo_ensaque: getCardValue('E4_tipoEnsaqueHidden'),
    BZ_ZZDRV : "",
    B5_LARG: getCardValue('K7_largura'),
    B5_COMPR : getCardValue('K8_comprimento'),
    B5_ALTURA: getCardValue('K9_altura'),
>>>>>>> 7aacc3792a5cb4f50ab056547e849bc32cb61698
  };

  log.info('BODY MONTADO - Cadastro de Produtos');
  log.dir(body);
  return body;
}

function getLocaleDateString() {
  var SimpleDateFormat = java.text.SimpleDateFormat;
  var Date = java.util.Date;
  // Formato de data padrão (dd/MM/yyyy para o Brasil)
  var dateFormat = new SimpleDateFormat('dd/MM/yyyy');
  var currentDate = new Date();
  return dateFormat.format(currentDate);
}

function getCardValueFloat(id) {
  var valor = hAPI.getCardValue(id);
  valor = valor.replace(',', '.');
  var number = parseFloat(valor);
  if (!number || isNaN(number)) return 0;
  return number;
}

function getCardValue(id) {
  var value = hAPI.getCardValue(id) || '';
  if (!value || value == null || value == 'null' || value == 'undefined' || value == undefined) return '';
  return value;
}

function getClientesArray() {
  var tableClientes = hAPI.getChildrenIndexes('tbCliente');
  log.info('Tabela de Clientes');
  log.dir(tableClientes);
  var clientes = [];
  for (var i = 0; i < tableClientes.length; i++) {
    var cliente = {
      cod_cliente: getCardValue('D7_clienteHidden___' + tableClientes[i]),
      loja_cliente: getCardValue('D8_loja___' + tableClientes[i]),
      produt_cliente: getCardValue('D9_codProdutoCliente___' + tableClientes[i]),
      desc_prod_cliente: getCardValue('D10_descricaoCliente___' + tableClientes[i]),
      cod_fabric_cliente: getCardValue('D11_clienteCodFabricanteHidden___' + tableClientes[i]),
      loja_fabric_cliente: getCardValue('D12_lojaFabricante___' + tableClientes[i]),
      centro_custo_cliente: getCardValue('D13_clienteCentroCustoHidden___' + tableClientes[i]),
    };
    clientes.push(cliente);
  }
  return clientes;
}

function getFornecedoresArray() {
  var tableFornecedores = hAPI.getChildrenIndexes('tbFornecedor');
  log.info('Tabela de Fornecedores');
  log.dir(tableFornecedores);
  var fornecedores = [];
  for (var i = 0; i < tableFornecedores.length; i++) {
    var fornecedor = {
      cod_fornec: getCardValue('C8_fornecedorHidden___' + tableFornecedores[i]),
      loja_fornec: getCardValue('C9_loja___' + tableFornecedores[i]),
      produt_fornec: getCardValue('C10_codProdutoFornecedor___' + tableFornecedores[i]),
      fator_conv_fornec: getCardValueFloat('C16_fatorConversao___' + tableFornecedores[i]),
      data_expiracao: getCardValue('F62_dFata_expiracao___' + tableFornecedores[i]),
      tempo_limite: getCardValueFloat('F64_tempo_limite___' + tableFornecedores[i]),
      situacao: getCardValue('C14_situacaoHidden___' + tableFornecedores[i]),
      fabric_reven_perm: getCardValue('hd_C13_fab_rev_perm___' + tableFornecedores[i]),
      //ADICIONADOS NO DIA 06/05/2025 - MIT006
      loja_fabric_fornec: getCardValue('C12_loja_fabricante___' + tableFornecedores[i]),
      skip_lote: getCardValue("F63_skip_loteHidden___" + tableFornecedores[i]),
      homologacao: getCardValue("hd_F61_homologacao___" + tableFornecedores[i]),
      cod_fabric_fornec: getCardValue('C10_codProdutoFornecedor___' + tableFornecedores[i]),
      unid_medida_fornec: getCardValue('C15_unidadeHidden___' + tableFornecedores[i]),
      tipo_conv_fornec: getCardValue('hd_C17_tipoConversao___' + tableFornecedores[i]),
    };
    fornecedores.push(fornecedor);
  }
  return fornecedores;
}

function getEnsaiosArray() {
  var tableEnsaios = hAPI.getChildrenIndexes('tbEnsaio');
  log.info('Tabela de Ensaios');
  log.dir(tableEnsaios);
  var ensaios = [];
  for (var i = 0; i < tableEnsaios.length; i++) {
    var ensaio = {
      descric_espec_prod: getCardValue('F67_descricao'),
      descric_ing_espec_prod: getCardValue('F68_desc_ingles'),
      descric_esp_espec_prod: getCardValue('F69_desc_espanhol'),
      tipo_espec_prod: getCardValue('F70_tipo'),
      ini_vigencia_espec_prod: getLocaleDateString(),
      uni_medida_espec_prod: getCardValue('F71_un_medida'),
      uni_med_amostra_espec_prod: getCardValue('F72_un_med_amostraHidden'),
      ensaio_espec_prod: getCardValue('F73_ensaioHidden___' + tableEnsaios[i]),
      laborat_espec_prod: getCardValue('F75_laboratorioHidden___' + tableEnsaios[i]),
      seq_lab_espec_prod: getCardValue('F77_seq_labor___' + tableEnsaios[i]),
      texto_espec_prod: getCardValue('F78_texto___' + tableEnsaios[i]),
      amostra_inspecao: ''
    };
    ensaios.push(ensaio);
  }
  return ensaios;
}