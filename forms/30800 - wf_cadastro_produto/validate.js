// Função principal de validação antes do envio
var beforeSendValidate = function (numState, nextState) {
  // Verifica se os campos obrigatórios estão preenchidos
  const camposObrigatoriosPreenchidos = validaCamposObrigatorios();
  if (!camposObrigatoriosPreenchidos) return false;

};

// Função para verificar se os campos obrigatórios estão preenchidos
const camposObrigatorios = () => {
  const ATIVIDADE = getTask();
  let tipo = $('#B4_tipo').val();
  tipo = tipo.split(' - ');
  const idCamposObrigatorios = [];
  const qntdeEmbgalagens = parseInt($('#B7_qntdeEmbalagens').val(), 10);
  const unidadeMedida1 = $('#B5_unidadeMedida1').val();
  const unidadeMedida2 = $('#B6_unidadeMedida2').val();
  const produtoImport = $('#hd_C4_prod_importado').val();
  const decisaoCompras = $('#hd_C18_decisao').val();
  const decisaoComercial = $('#hd_D14_decisao').val();
  const decisaoTecnico = $('#hd_E10_decisaoOpcoes').val();
  const decisaoQualidade = $('#hd_F84_decisaoOpcoes').val();
  const decisaoFiscal = $('#hd_G21_decisaoOpcoes').val();
  const decisaoComex = $('#hd_H9_decisaoOpcoes').val();
  const decisaoContabil = $('#hd_I7_decisaoOpcoes').val();
  const decisaoCustos = $('#hd_J7_decisaoOpcoes').val();
  const decisaoLogistica = $('#hd_K16_decisaoOpcoes').val();
  const decisaoPlanejamento = $('#hd_L27_decisaoOpcoes').val();

  // Verificação de campos obrigatórios na atividade de abertura
  if (ATIVIDADE == ATIVIDADES.ABERTURA) {
    idCamposObrigatorios.push({ id: 'B2_descricao', nome: 'Descrição' });
    idCamposObrigatorios.push({ id: 'B3_catalogoProduto', nome: 'Catálogo de Produto' });
    idCamposObrigatorios.push({ id: 'B4_tipo', nome: 'Tipo' });
    idCamposObrigatorios.push({ id: 'B5_unidadeMedida1', nome: '1ª Unidade Medida' });
    idCamposObrigatorios.push({ id: 'B7_qntdeEmbalagens', nome: 'Quantidade Embalagem' });
    if (qntdeEmbgalagens > 1) {
      idCamposObrigatorios.push({ id: 'B6_unidadeMedida2', nome: '2ª Unidade Medida' });
    }
    if (unidadeMedida1 !== unidadeMedida2) {
      idCamposObrigatorios.push({ id: 'B8_fatorConversao', nome: 'Fator de Conversão' });
    }
    if (tipo[0] == 'MP' || tipo[0] == 'PA') {
      idCamposObrigatorios.push({ id: 'hd_B4_nutriAnimalOp', nome: 'Nutrição Animal?' });
      idCamposObrigatorios.push({ id: 'B9_pesoBruto', nome: 'Peso Bruto' });
    }
    idCamposObrigatorios.push({ id: 'B10_armPadrao', nome: 'Armazém Padrão' });
    idCamposObrigatorios.push({ id: 'B11_centroCusto', nome: 'Centro de Custo' });
  }
  // Verificação de campos obrigatórios na atividade de compras
  if (ATIVIDADE == ATIVIDADES.ANALISE_COMPRAS) {
    idCamposObrigatorios.push({ id: 'C3_origem', nome: 'Origem' });
    idCamposObrigatorios.push({ id: 'hd_C4_prod_importado', nome: 'Produto Importado?' });

    if (tipo[0] == 'AI') {
      idCamposObrigatorios.push({ id: 'F4_pos_ipi', nome: 'Pos. IPI/NCM (Painel QUALIDADE)' });
      idCamposObrigatorios.push({ id: 'F5_ex_ncm', nome: 'Ex. NCM (Painel QUALIDADE)' });
    }
    if (!decisaoCompras) {
      idCamposObrigatorios.push({ id: 'hd_C18_decisao', nome: 'Decisão' });
    }
    if (decisaoCompras == 'ajuste') {
      idCamposObrigatorios.push({ id: 'C19_justificativa', nome: 'Justificativa' });
    }

    var fornecedores = $("input[name^='C8_fornecedor___']");

    if (fornecedores.length === 0) {
      Swal.fire({
        title: 'Atenção',
        html: `É necessário adicionar pelo menos um fornecedor.`,
        icon: 'error',
      });
      return;
    }
    $("input[name^='C8_fornecedor___']").each((index, element) => {
      const id = $(element).attr('id').split('___')[1];
      const arrayCamposFornecedorCompras = [
        {
          id: 'C8_fornecedorHidden___' + id,
          nome: 'Fornecedor (Fornecedor)',
        },
        {
          id: 'C9_loja___' + id,
          nome: 'Loja Fornecedor (Fornecedor)',
        },
        {
          id: 'C11_fabricanteHidden___' + id,
          nome: 'Fabricante (Fornecedor)',
        },
        {
          id: 'C12_loja_fabricante___' + id,
          nome: 'Loja Fabricante (Fornecedor)',
        },
        {
          id: 'hd_C13_fab_rev_perm___' + id,
          nome: 'Fab/Rev/Perm (Fornecedor)',
        },
        {
          id: 'C15_unidadeHidden___' + id,
          nome: 'Unidade (Fornecedor)',
        },
        {
          id: 'hd_C17_tipoConversao___' + id,
          nome: 'Tipo de Conversão (Fornecedor)',
        },
      ];
      idCamposObrigatorios.push(...arrayCamposFornecedorCompras);
    });
  }
  // Verificação de campos obrigatórios na atividade de comercial
  if (ATIVIDADE == ATIVIDADES.ANALISE_COMERCIAL) {
    idCamposObrigatorios.push({ id: 'D3_finalidade', nome: 'Finalidade' });
    idCamposObrigatorios.push({ id: 'hd_D4_moeda_comercial', nome: 'Moeda Comercial' });
    idCamposObrigatorios.push({ id: 'hd_D14_decisao', nome: 'Decisão' });
    if (decisaoComercial == 'ajuste') {
      idCamposObrigatorios.push({ id: 'D15_justificativa', nome: 'Justificativa' });
    }

    var clientes = $("input[name^='D7_cliente___']");

    if (clientes.length === 0) {
      Swal.fire({
        title: 'Atenção',
        html: `É necessário adicionar pelo menos um cliente.`,
        icon: 'error',
      });
      return;
    }

    $("input[name^='D7_cliente___']").each((index, element) => {
      const id = $(element).attr('id').split('___')[1];
      const arrayCamposClienteComercial = [
        {
          id: 'D7_clienteHidden___' + id,
          nome: 'Cliente (Cliente)',
        },
        {
          id: 'D13_clienteCentroCusto___' + id,
          nome: 'C. Custo (Cliente)',
        },
      ];
      idCamposObrigatorios.push(...arrayCamposClienteComercial);
    });
  }
  // Verificação de campos obrigatórios na atividade de tecnico
  if (ATIVIDADE == ATIVIDADES.ANALISE_TECNICO) {
    idCamposObrigatorios.push({ id: 'F51_nome_rotulo_premix', nome: 'Nome Rótulo Premix' });
    idCamposObrigatorios.push({ id: 'E3_embalagemPremix', nome: 'Embalagem Premix' });
    idCamposObrigatorios.push({ id: 'E4_tipoEnsaque', nome: 'Tipo Ensaque' });
    if (tipo[0] == 'PA') {
      idCamposObrigatorios.push({ id: 'E5_clasIndProd', nome: 'Classificação Indicação Prod.' });
      idCamposObrigatorios.push({ id: 'E6_diasValidade', nome: 'Dias Validade' });
      idCamposObrigatorios.push({ id: 'E7_modoUso', nome: 'Modo de Uso' });
      idCamposObrigatorios.push({ id: 'E8_especieDest', nome: 'Espécie Dest.' });
    }
    idCamposObrigatorios.push({ id: 'E9_fotoHidden', nome: 'Foto Opções' });
    idCamposObrigatorios.push({ id: 'hd_E10_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoTecnico == 'ajuste') {
      idCamposObrigatorios.push({ id: 'E11_justificativa', nome: 'Justificativa' });
    }
  }
  // Verificação de campos obrigatórios na atividade de qualidade
  if (ATIVIDADE == ATIVIDADES.ANALISE_QUALIDADE) {
    if (tipo[0] == 'MP' || tipo[0] == 'EM' || tipo[0] == 'PA') {
      idCamposObrigatorios.push({ id: 'hd_F38_mat_embalagemOp', nome: 'Material Embalagem' });
    } else if (tipo[0] == 'PA') {
      idCamposObrigatorios.push({ id: 'F10_classificacao_prod', nome: 'Classificação Indicação Prod.' });
      // idCamposObrigatorios.push({ id: 'F11_dias_validade', nome: 'Dias Validade' }); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Arcanjo ID178
      // idCamposObrigatorios.push({ id: 'F12_modo_uso', nome: 'Modo de Uso' }); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Chiari
      idCamposObrigatorios.push({ id: 'F13_especie_dest', nome: 'Espécie Dest.' });
    }
    // idCamposObrigatorios.push({ id: 'F3_codigo_gtin', nome: 'Código GTIN' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE MIT006 - Marina
    idCamposObrigatorios.push({ id: 'F4_pos_ipi', nome: 'Pos. IPI/NCM' });
    idCamposObrigatorios.push({ id: 'F5_ex_ncm', nome: 'Ex. NCM' });
    if ($("#F7_tipo_cqOp").val() == 'M') { // Se o tipo de controle de qualidade for "M" (Materiais), o campo nota mínima é obrigatório
      idCamposObrigatorios.push({ id: 'F6_nota_minima', nome: 'Nota Mínima' });
    }
    idCamposObrigatorios.push({ id: 'hd_F7_tipo_cqOp', nome: 'Tipo de Controle Qualidade' });
    
    // idCamposObrigatorios.push({ id: 'F15_codigo_ean', nome: 'Código EAN' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE MIT006 - Marina
    idCamposObrigatorios.push({ id: 'hd_F16_estado_fisicoOp', nome: 'Estado Físico' });
    // idCamposObrigatorios.push({ id: 'F17_num_onu', nome: 'N° ONU' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE MIT006 - Marina
    idCamposObrigatorios.push({ id: 'hd_F18_control_pf', nome: 'Control PF' });
    idCamposObrigatorios.push({ id: 'hd_F19_control_pc', nome: 'Control PC' });
    idCamposObrigatorios.push({ id: 'hd_F20_control_ex', nome: 'Control EX' });
    idCamposObrigatorios.push({ id: 'hd_F21_fisic_pc', nome: 'Físico PC' });
    // idCamposObrigatorios.push({ id: 'F22_concentracao_prod', nome: 'Concentração Prod. Controlado' }); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F23_prod_incompativel', nome: 'Prod. Incompatível' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F24_registro_sif', nome: 'Registro SIF' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F25_numero_cas', nome: 'Número CAS' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Chiari
    // idCamposObrigatorios.push({ id: 'F26_codigo_dcb', nome: 'Código DCB' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F27_aplicacao', nome: 'Aplicação' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F28_classe_familia_prd', nome: 'Classe Família Prod.' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    idCamposObrigatorios.push({ id: 'hd_F30_uso_vetOp', nome: 'Uso Vet' });
    idCamposObrigatorios.push({ id: 'hd_F31_controle_anvisaOp', nome: 'Controle Anvisa' });
    idCamposObrigatorios.push({ id: 'F32_rotulos_especiais', nome: 'Rótulos Especiais F&F' });
    idCamposObrigatorios.push({ id: 'F33_intrucao_operacional', nome: 'Instrução Operacional F&F' });
    // idCamposObrigatorios.push({ id: 'F34_codigo_IBAMA', nome: 'Código IBAMA' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    idCamposObrigatorios.push({ id: 'hd_F37_periculosidadeOp', nome: 'Periculosidade' });
    
    idCamposObrigatorios.push({ id: 'F39_obs_periculosidade', nome: 'Observação da Periculosidade' });
    idCamposObrigatorios.push({ id: 'hd_F40_origem_prdOp', nome: 'Origem Produto' });
    idCamposObrigatorios.push({ id: 'F42_color_imp', nome: 'Color IMP' });
    // idCamposObrigatorios.push({ id: 'F43_classe_imp', nome: 'Classe IMP' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F44_grau_pureza', nome: '% Grau Pureza' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F45_processo_obtencao', nome: 'Processo Obtenção' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F46_aplicacao_imp', nome: 'Aplicação IMP' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F47_finalidade', nome: 'Finalidade' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F48_forma_molecular', nome: 'Fórmula Molecular' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    idCamposObrigatorios.push({ id: 'hd_F49_prd_or_gmoOp', nome: 'Produto GMO' });
    // idCamposObrigatorios.push({ id: 'F50_condicao_armz', nome: 'Condição de Armazenamento' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F52_nome_cient_rotulo', nome: 'Nome Científico no Rótulo' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F53_especie_doadora_premix', nome: 'Espécie Doadora no Premix' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F54_desc_qualidade', nome: 'Descrição da Qualidade' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F55_desc_aux_qualidade', nome: 'Descrição Auxiliar da Qualidade' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    
    idCamposObrigatorios.push({ id: 'F59_densidade', nome: 'Densidade' });
    // idCamposObrigatorios.push({ id: 'F60_prazo_cq', nome: 'Prazo de Controle de Qualidade' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F67_descricao', nome: 'Descrição' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F68_desc_ingles', nome: 'Descrição em Inglês' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F69_desc_espanhol', nome: 'Descrição em Espanhol' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F70_tipo', nome: 'Tipo' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F71_un_medida', nome: 'Unidade de Medida' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    idCamposObrigatorios.push({ id: 'F72_un_med_amostra', nome: 'Unidade de Medida da Amostra' });
    // idCamposObrigatorios.push({ id: 'F80_categoria_prd', nome: 'Categoria Produto' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    // idCamposObrigatorios.push({ id: 'F81_convenio', nome: 'Convênio' }); //! SOLICITADO REMOCAO OBRIGATORIEDADE - MIT006 - Marina
    idCamposObrigatorios.push({ id: 'hd_F82_prod_alergenicoOp', nome: 'Produto Alergênico' });
    if ($('#hd_F82_prod_alergenicoOp').val() == 'S') {
      idCamposObrigatorios.push({ id: 'F83_mensagem_alergenico', nome: 'Mensagem Alergênico' });
    }
    idCamposObrigatorios.push({ id: 'hd_F84_decisaoOpcoes', nome: 'Decisão' });

    const possuiNumeroONU = $("#F17_num_onu").val() ?? '';
    if (possuiNumeroONU) { //! SOLICITADO OBRIGATORIEDADE APENAS QUANDO O CAMPO 'NUMERO ONU' ESTIVER PREENCHIDO - MIT006 - Marina
      idCamposObrigatorios.push({ id: 'F35_kit', nome: 'Kit' });
      idCamposObrigatorios.push({ id: 'F36_grupo_epi', nome: 'Grupo EPI' });
      idCamposObrigatorios.push({ id: 'F41_sub_classe_risco', nome: 'Sub Classe Risco' });
    }
	
	const F18_control_pf = $('input[name="F18_control_pf"][value="Sim"]').is(':checked');
    if (F18_control_pf) { //! SOLICITADO OBRIGATORIEDADE APENAS QUANDO O CAMPO 'Fisic. PC' ESTIVER PREENCHIDO COMO SIM - MIT006 - Marina
      idCamposObrigatorios.push({ id: 'F58_concentracao', nome: 'Concentração' });
      $("label[for='F58_concentracao']").addClass("required");
    }else{
    	$("label[for='F58_concentracao']").removeClass("required");
    }
    
    const marcadoFisicPC = $('input[name="F21_fisic_pc"][value="Sim"]').is(':checked');
    if (marcadoFisicPC) { //! SOLICITADO OBRIGATORIEDADE APENAS QUANDO O CAMPO 'Fisic. PC' ESTIVER PREENCHIDO COMO SIM - MIT006 - Marina
      idCamposObrigatorios.push({ id: 'F58_concentracao', nome: 'Concentração' });
    }

    if (decisaoQualidade == 'ajuste') {
      idCamposObrigatorios.push({ id: 'hd_F85_retornoOpcoes', nome: 'Retorno Opções' });
      idCamposObrigatorios.push({ id: 'F86_justificativa', nome: 'Justificativa' });
    }

    $("input[name^='F73_ensaio___']").each((index, element) => {
      const row = $(element).attr('id').split('___')[1];
      const sequencia = $("#sequenciaEnsaio___" + row).val() ?? '';
      idCamposObrigatorios.push({ id: 'F73_ensaio___'+row, nome: 'Ensaio ' + sequencia });
      idCamposObrigatorios.push({ id: 'F75_laboratorio___'+row, nome: 'Laboratório ' + sequencia });
      idCamposObrigatorios.push({ id: 'F78_texto___'+row, nome: 'Texto ' + sequencia });
    });


    $("input[name^='C8_fornecedor___']").each((index, element) => {
      const id = $(element).attr('id').split('___')[1];
      let arrayCamposFornecedorQualidade = [];
      if ($(`#hd_F61_homologacao___${id}`).val() == '1') {
        arrayCamposFornecedorQualidade = [
          {
            id: 'hd_F61_homologacao___' + id,
            nome: 'Homologação (Fornecedor)',
          },
          {
            id: 'F62_data_expiracao___' + id,
            nome: 'Data de Expiração (Fornecedor)',
          },
          {
            id: 'hd_F65_aviso_3meses___' + id,
            nome: 'Aviso (Fornecedor)',
          },
          {
            id: 'hd_F66_envio_email___' + id,
            nome: 'Envio Email Exp. (Fornecedor)',
          },
        ];
      } else {
        arrayCamposFornecedorQualidade = [
          {
            id: 'hd_F61_homologacao___' + id,
            nome: 'Homologação (Fornecedor)',
          },
        ];
      }

      idCamposObrigatorios.push(...arrayCamposFornecedorQualidade);
    });
  }
  // Verificação de campos obrigatórios na atividade de fiscal
  if (ATIVIDADE == ATIVIDADES.ANALISE_FISCAL) {
    let hd_G5_impostoRendaOpcoes = $('#hd_G5_impostoRendaOpcoes').val();
    idCamposObrigatorios.push({ id: 'G3_aliqIpi', nome: 'Alíq. IPI' });
    idCamposObrigatorios.push({ id: 'G4_grupoTrib', nome: 'Grupo Trib.' });
    idCamposObrigatorios.push({ id: 'hd_G5_impostoRendaOpcoes', nome: 'Imposto Renda Opções' });
    idCamposObrigatorios.push({ id: 'hd_G6_calculaInssOpcoes', nome: 'Calcula INSS Opções' });
    if (hd_G5_impostoRendaOpcoes == 'S') {
      idCamposObrigatorios.push({ id: 'G7_csll', nome: '%CSLL' });
      idCamposObrigatorios.push({ id: 'G8_cofins', nome: '%COFINS' });
      idCamposObrigatorios.push({ id: 'G9_pis', nome: '%PIS' });
    }
    idCamposObrigatorios.push({ id: 'G10_aliqIss', nome: 'Alíq. ISS' });
    if ($('#B4_tipo').val() == 'SV'){
    	idCamposObrigatorios.push({ id: 'G11_codServIss', nome: 'Cód. Serv. ISS' });
    }
    idCamposObrigatorios.push({ id: 'G12_cest', nome: 'CEST' });
    idCamposObrigatorios.push({ id: 'hd_G13_estCredIpiOpcoes', nome: 'Est. Cred. IPI Opções' });
    idCamposObrigatorios.push({ id: 'hd_G14_icmsOpcoes', nome: 'ICMS Opções' });
    //idCamposObrigatorios.push({ id: 'hd_G15_exeServicoOpcoes', nome: 'Exe. Serviço Opções' });
    idCamposObrigatorios.push({ id: 'hd_G21_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoFiscal == 'ajuste') {
      idCamposObrigatorios.push({ id: 'hd_G22_retornoOpcoes', nome: 'Retorno Opções' });
      idCamposObrigatorios.push({ id: 'G23_justificativa', nome: 'Justificativa' });
    }
  }
  // Verificação de campos obrigatórios na atividade de comex
  if (ATIVIDADE == ATIVIDADES.ANALISE_COMEX) {
    if (produtoImport == 'S') {
      idCamposObrigatorios.push({ id: 'H3_nomeCientif', nome: 'Nome Científ. ' });
    }
    idCamposObrigatorios.push({ id: 'hd_H9_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoComex == 'ajuste') {
      idCamposObrigatorios.push({ id: 'hd_H10_retornoOpcoes', nome: 'Retorno Opções' });
      idCamposObrigatorios.push({ id: 'H11_justificativa', nome: 'Justificativa' });
    }
  }
  // Verificação de campos obrigatórios na atividade de contábil
  if (ATIVIDADE == ATIVIDADES.ANALISE_CONTABIL) {
    idCamposObrigatorios.push({ id: 'I3_contaContabil', nome: 'Conta Contábil' });
    idCamposObrigatorios.push({ id: 'hd_I7_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoContabil == 'ajuste') {
      idCamposObrigatorios.push({ id: 'I8_justificativa', nome: 'Justificativa' });
    }
  }
  // Verificação de campos obrigatórios na atividade de custos
  if (ATIVIDADE == ATIVIDADES.ANALISE_CUSTOS) {
    idCamposObrigatorios.push({ id: 'J4_contaOrcament', nome: 'Conta Orçamentária' }); /*  */
    idCamposObrigatorios.push({ id: 'hd_J5_exRiscCambOpcoes', nome: 'Es.Risc.Camb.' }); /*  */
    idCamposObrigatorios.push({ id: 'hd_J7_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoCustos == 'ajuste') {
      idCamposObrigatorios.push({ id: 'J8_justificativa', nome: 'Justificativa' });
    }
  }
  // Verificação de campos obrigatórios na atividade de logística
  if (ATIVIDADE == ATIVIDADES.ANALISE_LOGISTICA) {
    /* idCamposObrigatorios.push({ id: 'hd_K4_wmsOpcoes', nome: 'WMS Opções' });
    idCamposObrigatorios.push({ id: 'hd_K5_enderecoOpcoes', nome: 'Endereço Opções' });
    idCamposObrigatorios.push({ id: 'hd_K6_armDriveOpcoes', nome: 'Arm. Drive Opções' });
    idCamposObrigatorios.push({ id: 'hd_K14_pulmaoOpcoes', nome: 'Pulmão Opções' }); */
    if (qntdeEmbgalagens > 1) {
      idCamposObrigatorios.push({ id: 'hd_K3_tipoConversao', nome: 'Tipo Conversão' }); /*  */
    }
    idCamposObrigatorios.push({ id: 'K11_servEntr', nome: 'Serv. Entrada' });
    idCamposObrigatorios.push({ id: 'hd_K16_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoLogistica != 'aprovado') {
      idCamposObrigatorios.push({ id: 'K17_justificativa', nome: 'Justificativa' });
    }
  }
  // Verificação de campos obrigatórios na atividade de planejamento
  if (ATIVIDADE == ATIVIDADES.ANALISE_PLANEJAMENTO) {
    idCamposObrigatorios.push({ id: 'L3_grupo', nome: 'Grupo' });
    idCamposObrigatorios.push({ id: 'hd_L11_um_industria', nome: 'UM Indústria' });
    idCamposObrigatorios.push({ id: 'hd_L26_atende_necessidade', nome: 'Atende Necessidade' });
    idCamposObrigatorios.push({ id: 'hd_L27_decisaoOpcoes', nome: 'Decisão' });
    if (decisaoPlanejamento == 'ajuste') {
      idCamposObrigatorios.push({ id: 'hd_L28_retornoOpcoes', nome: 'Retorno Opções' });
      idCamposObrigatorios.push({ id: 'L29_justificativa', nome: 'Justificativa' });
    }
  }

  if (ATIVIDADE == ATIVIDADES.INTEGRACAO_PROTHEUS) {
    /* idCamposObrigatorios.push({ id: 'hd_B12_rastroOpcoes', nome: 'Rastro Opções' }); */
  }

  if (ATIVIDADE == ATIVIDADES.TI) {
    /* idCamposObrigatorios.push({ id: 'hd_B12_rastroOpcoes', nome: 'Rastro Opções' }); */
  }
  return idCamposObrigatorios;
}

function validaCamposObrigatorios() {
  // Verifica se todos os campos obrigatórios estão preenchidos
  let idCamposObrigatorios = camposObrigatorios();
  let listaCampos = [];
  for (const campo of idCamposObrigatorios) {
    const valor = $('#' + campo.id).val() ?? '';
    if (!valor) {
      listaCampos.push(campo.nome);
    }
  }
  if (listaCampos.length == 0) return true;

  // Exibe alerta se algum campo obrigatório não estiver preenchido
  Swal.fire({
    title: 'Atenção',
    html: `Por favor, preencha o(s) seguinte(s) campo(s): <br><br> <span style="text-align: center">${listaCampos.join('<br>')}</span>`,
    icon: 'warning',
  });
  return false;
};
