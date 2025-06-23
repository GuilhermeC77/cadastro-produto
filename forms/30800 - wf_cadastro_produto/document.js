$(document).ready(function () {
  init();
  preencheRadiosComHd(); // Chama a função para preencher os radiobuttons com base nos campos hidden
  caminhoProcesso();
  verificaCaminhoProcesso();
  ocultaNutriAnimal();
  evitaDigitarZoom();
  removeTrash();
  bloqueiaAddFoto();
  exibeDesc();
  menuInterativo();
  aplicarMascaraNumerica();
  atualizaAsteriscosObrigatoriedadeDinamicamente();
});

function init() {
  var ATIVIDADE = getTask();
  var MODE = getMode();
  let descricao = $('#B2_descricao').val();
  let tipo = $('#B4_tipo').val();
  tipo = tipo.split(' - ');
  let unidadeMedida1 = $('#B5_unidadeMedida1').val();
  let J3_moeda = $('#hd_J3_moeda').val();
  let hd_K6_armDriveOpcoes = $('#hd_K6_armDriveOpcoes').val();
  let hd_L11_um_industria = $('#hd_L11_um_industria').val();
  let hd_L26_atende_necessidade = $('#hd_L26_atende_necessidade').val();
  marcarSteps(ATIVIDADE);
  $('#imgSolicitante').attr('src', `/social/api/rest/social/image/profile/${$('#matriculaSolicitante').val()}/SMALL_PICTURE`);
  if (MODE != 'VIEW') {
    switch (ATIVIDADE) {
      case ATIVIDADES.ABERTURA:
        /* steps trilha do processo */
        $("#validaEdicao").val("1");
        $('#stepInicio').addClass('done');
        /* validação painel a painel para travar os campos */
        visualizaEtapaInicio();
        $('input[name="tipoSolicitacao"]').prop('disabled', false);
        $('input[name="B4_nutriAnimalOp"]').prop('disabled', false);
        atualizarCampoHidden('B4_nutriAnimalOp', 'hd_B4_nutriAnimalOp');
        $('input[name="tipoSolicitacao"][value="I"]').prop('checked', true);
        $('#codTipoSolicitacao').val('I');
        atualizarCampoHidden('tipoSolicitacao', 'codTipoSolicitacao');
        $('#B_divAbertura #B1_codProduto').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });

        $('input[name="tipoSolicitacao"]').on('change', function () {
          bloqueiaCampoCod();
        });
        $('#B1_codProduto').on('change', function () {
          pesquisaCampoCod();
        });

        replicaInformacoesPainelQualidade();
        break;
      case ATIVIDADES.ANALISE_COMPRAS:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('#C_divCompras .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        if (tipo[0] == 'AI') {
          $('#F_divQualidade #F4_pos_ipi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
          $('#F_divQualidade #F5_ex_ncm').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        }
        $('input[name="C5_lote_minimo"]').prop('readonly', false);
        $('input[name="C6_lote_econom"]').prop('readonly', false);
        $('input[name="C18_decisao"]').prop('disabled', false);
        $('textarea[name="C19_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('C18_decisao', 'hd_C18_decisao');
        bloqueiaOrigem();
        $('#hd_C18_decisao').val('');
        $('#C19_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_COMERCIAL:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="D4_moeda_comercial"]').prop('disabled', false);
        $('input[name="D14_decisao"]').prop('disabled', false);
        $('input[name="D5_margem_bruto"]').prop('readonly', false);
        $('textarea[name="D15_justificativa"]').prop('readonly', false);
        $('#D_divComercial .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        atualizarCampoHidden('D4_moeda_comercial', 'hd_D4_moeda_comercial');
        atualizarCampoHidden('D14_decisao', 'hd_D14_decisao');
        $('#hd_D14_decisao').val('');
        $('#D15_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_TECNICO:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="F51_nome_rotulo_premix"]').prop('readonly', false);
        $('input[name="E10_decisaoOpcoes"]').prop('disabled', false);
        $('#E_divTecnico .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        atualizarCampoHidden('E10_decisaoOpcoes', 'hd_E10_decisaoOpcoes');
        $('input[name="E5_clasIndProd"]').prop('readonly', false);
        $('input[name="E6_diasValidade"]').prop('readonly', false);
        $('input[name="E7_modoUso"]').prop('readonly', false);
        $('textarea[name="E11_justificativa"]').prop('readonly', false);
        $('#hd_E10_decisaoOpcoes').val('');
        $('#E11_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_QUALIDADE:
        unidadeMedida1 = unidadeMedida1.split(' - ');
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="F16_estado_fisicoOp"]').prop('disabled', false);
        $('input[name="F7_tipo_cqOp"]').prop('disabled', false);
        $('input[name="F18_control_pf"]').prop('disabled', false);
        $('input[name="F20_control_ex"]').prop('disabled', false);
        $('input[name="F21_fisic_pc"]').prop('disabled', false);
        $('input[name="F19_control_pc"]').prop('disabled', false);
        $('input[name="F30_uso_vetOp"]').prop('disabled', false);
        $('input[name="F31_controle_anvisaOp"]').prop('disabled', false);
        $('input[name="F37_periculosidadeOp"]').prop('disabled', false);
        $('input[name="F38_mat_embalagemOp"]').prop('disabled', false);
        $('input[name="F40_origem_prdOp"]').prop('disabled', false);
        $('input[name="F49_prd_or_gmoOp"]').prop('disabled', false);
        $('input[name="F82_prod_alergenicoOp"]').prop('disabled', false);
        $('input[name="F84_decisaoOpcoes"]').prop('disabled', false);
        $('input[name="F85_retornoOpcoes"]').prop('disabled', false);
        $('#F_divQualidade .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('input[name="F3_codigo_gtin"]').prop('readonly', false);
        //$('input[name="F6_nota_minima"]').prop('readonly', false);
        $('textarea[name="F8_desc_rot_ff"]').prop('readonly', false);
        $('textarea[name="F9_desc_rot_ff_text"]').prop('readonly', false);
        $('input[name="F10_classificacao_prod"]').prop('readonly', false);
        // $('input[name="F11_dias_validade"]').prop('readonly', false); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Arcanjo ID178
        $('input[name="F12_modo_uso"]').prop('readonly', false);
        // $('input[name="F22_concentracao_prod"]').prop('readonly', false); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Marina
        $('input[name="F23_prod_incompativel"]').prop('readonly', false);
        $('input[name="F24_registro_sif"]').prop('readonly', false);
        $('input[name="F25_numero_cas"]').prop('readonly', false);
        $('#F25_numero_cas').on('input', function () {
          this.value = this.value.replace(/[^0-9]/g, '');
        });
        $('input[name="F27_aplicacao"]').prop('readonly', false);
        $('input[name="F32_rotulos_especiais"]').prop('readonly', false);
        $('input[name="F33_intrucao_operacional"]').prop('readonly', false);
        $('input[name="F35_kit"]').prop('readonly', false);
        $('input[name="F36_grupo_epi"]').prop('readonly', false);
        $('input[name="F39_obs_periculosidade"]').prop('readonly', false);
        $('input[name="F41_sub_classe_risco"]').prop('readonly', false);
        $('input[name="F42_color_imp"]').prop('readonly', false);
        $('input[name="F44_grau_pureza"]').prop('readonly', false);
        $('input[name="F48_forma_molecular"]').prop('readonly', false);
        $('input[name="F52_nome_cient_rotulo"]').prop('readonly', false);
        $('input[name="F53_especie_doadora_premix"]').prop('readonly', false);
        $('input[name="F54_desc_qualidade"]').prop('readonly', false);
        $('input[name="F55_desc_aux_qualidade"]').prop('readonly', false);
        $('textarea[name="F57_restricao_uso_txt"]').prop('readonly', false);
        $('input[name="F15_codigo_ean"]').prop('readonly', false);
        $('input[name="F58_concentracao"]').prop('readonly', false);
        $('input[name="F59_densidade"]').prop('readonly', false);
        $('input[name="F60_prazo_cq"]').prop('readonly', false);
        $('textarea[name="F83_mensagem_alergenico"]').prop('readonly', false);
        $('textarea[name="F86_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('F20_control_ex', 'hd_F20_control_ex');
        atualizarCampoHidden('F19_control_pc', 'hd_F19_control_pc');
        atualizarCampoHidden('F16_estado_fisicoOp', 'hd_F16_estado_fisicoOp');
        atualizarCampoHidden('F7_tipo_cqOp', 'hd_F7_tipo_cqOp');
        atualizarCampoHidden('F21_fisic_pc', 'hd_F21_fisic_pc');
        atualizarCampoHidden('F30_uso_vetOp', 'hd_F30_uso_vetOp');
        atualizarCampoHidden('F18_control_pf', 'hd_F18_control_pf');
        atualizarCampoHidden('F31_controle_anvisaOp', 'hd_F31_controle_anvisaOp');
        atualizarCampoHidden('F37_periculosidadeOp', 'hd_F37_periculosidadeOp');
        atualizarCampoHidden('F38_mat_embalagemOp', 'hd_F38_mat_embalagemOp');
        atualizarCampoHidden('F40_origem_prdOp', 'hd_F40_origem_prdOp');
        atualizarCampoHidden('F49_prd_or_gmoOp', 'hd_F49_prd_or_gmoOp');
        atualizarCampoHidden('F82_prod_alergenicoOp', 'hd_F82_prod_alergenicoOp');
        atualizarCampoHidden('F84_decisaoOpcoes', 'hd_F84_decisaoOpcoes');
        atualizarCampoHidden('F85_retornoOpcoes', 'hd_F85_retornoOpcoes');
        $('#F67_descricao').val(descricao);
        $('#F70_tipo').val(tipo[0] + ' - ' + tipo[1]);
        $('#F71_un_medida').val(unidadeMedida1[0]);
        $('#F72_un_med_amostra').val(unidadeMedida1[0] + ' - ' + unidadeMedida1[1]);
        $('#hd_F84_decisaoOpcoes').val('');
        $('#hd_F85_retornoOpcoes').val('');
        $('#F86_justificativa').val('');
        preenchePosIpiNcm();
        
        $('input[type=radio][name=F7_tipo_cqOp]').on('change', function() {
	  	  debugger;
	  	  if ($(this).val() == 'M'){
	  	  	$('input[name="F6_nota_minima"]').prop('readonly', false);
	  	  }else{
	  	  	$("#F6_nota_minima").val("")
	  	  	$('input[name="F6_nota_minima"]').prop('readonly', true);
	  	  }
	      
	    });
        $("input[name^='C8_fornecedor___']").each((index, element) => {
          const id = $(element).attr('id').split('___')[1];

          // Habilitar/desabilitar campos específicos com o id correto
          $(`input[name^='F64_tempo_limite']`).mask('00', { reverse: true });
          $(`input[name^='F61_homologacao___']`).prop('disabled', false);
          if ($(`input[name^='hd_F61_homologacao___']`).val() == '') {
            $(`input[name^='hd_F61_homologacao___']`).val('1');
          }
          $(`input[name^='F62_data_expiracao___']`).prop('readonly', false);
          $(`#C_divCompras input[name^='F63_skip_lote___']`).parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
          $(`input[name^='F64_tempo_limite___']`).prop('readonly', false);
          $(`input[name^='F65_aviso_3meses___']`).prop('disabled', false);
          $(`input[name^='F66_envio_email___']`).prop('disabled', false);

          // Inicializar o calendário com o id correto
          FLUIGC.calendar(`#F62_data_expiracao___${id}`, {
            pickDate: true,
            minDate: moment().format('DD/MM/YYYY'),
            pickTime: false,
            showToday: true,
            useCurrent: true,
          });

          // Atualizar campos hidden com o id correto
          atualizarCampoHidden(`F61_homologacao___${id}`, `hd_F61_homologacao___${id}`);
          atualizarCampoHidden(`F65_aviso_3meses___${id}`, `hd_F65_aviso_3meses___${id}`);
          atualizarCampoHidden(`F66_envio_email___${id}`, `hd_F66_envio_email___${id}`);

          atualizarCampoRadio('F7_tipo_cqOp', 'hd_F7_tipo_cqOp');
        });
        $('input[name="F90_nomeProdutoFornecedor"]').prop('readonly', false);
        $('input[name="F88_fatorConversao"]').prop('readonly', false);
        $('input[name="F87_quantidadeIsenta"]').prop('readonly', false);
        $('input[name="F89_tipoConversao"]').prop('disabled', false);
        break;
      case ATIVIDADES.ANALISE_FISCAL:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="G5_impostoRendaOpcoes"]').prop('disabled', false);
        $('input[name="G6_calculaInssOpcoes"]').prop('disabled', false);
        $('input[name="G13_estCredIpiOpcoes"]').prop('disabled', false);
        $('input[name="G14_icmsOpcoes"]').prop('disabled', false);
        $('input[name="G15_exeServicoOpcoes"]').prop('disabled', false);
        $('input[name="G21_decisaoOpcoes"]').prop('disabled', false);
        $('input[name="G22_retornoOpcoes"]').prop('disabled', false);
        $('#G_divFiscal .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('input[name="G3_aliqIpi"]').prop('readonly', false);
        $('input[name="G7_csll"]').prop('readonly', false);
        $('input[name="G8_cofins"]').prop('readonly', false);
        $('input[name="G9_pis"]').prop('readonly', false);
        $('input[name="G10_aliqIss"]').prop('readonly', false);
        $('input[name="G17_subtitulo"]').prop('readonly', false);
        $('input[name="G19_mostrarDescServ"]').prop('readonly', false);
        $('textarea[name="G20_textDescServ"]').prop('readonly', false);
        $('textarea[name="G23_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('G5_impostoRendaOpcoes', 'hd_G5_impostoRendaOpcoes');
        atualizarCampoHidden('G6_calculaInssOpcoes', 'hd_G6_calculaInssOpcoes');
        atualizarCampoHidden('G13_estCredIpiOpcoes', 'hd_G13_estCredIpiOpcoes');
        atualizarCampoHidden('G14_icmsOpcoes', 'hd_G14_icmsOpcoes');
        atualizarCampoHidden('G15_exeServicoOpcoes', 'hd_G15_exeServicoOpcoes');
        atualizarCampoHidden('G21_decisaoOpcoes', 'hd_G21_decisaoOpcoes');
        atualizarCampoHidden('G22_retornoOpcoes', 'hd_G22_retornoOpcoes');
        $('#hd_G5_impostoRendaOpcoes').val('S');
        $('#hd_G6_calculaInssOpcoes').val('S');
        $('#hd_G13_estCredIpiOpcoes').val('3');
        $('#hd_G14_icmsOpcoes').val('0');
        $('#G7_csll').val(1);
        // $('#G8_cofins').val(3); //! SOLICITADO REMOCAO PREENCHIMENTO AUTOMATICO - MIT006 - Chiari
        // $('#G9_pis').val(0.65); //! SOLICITADO REMOCAO PREENCHIMENTO AUTOMATICO - MIT006 - Chiari
        $('#hd_G22_retornoOpcoes').val('');
        $('#G23_justificativa').val('');
        if (tipo[0] == 'SV') {
          $('#G15_exeServicoOpcoes').parent().parent().show();
          $('#G16_tipoServico').parent().parent().show();
          $('#G17_subtitulo').parent().parent().show();
          $('#G19_mostrarDescServ').parent().parent().show();
          $('#G20_textDescServ').parent().parent().show();
        } else {
          $('#G15_exeServicoOpcoes').parent().parent().hide();
          $('#G16_tipoServico').parent().parent().hide();
          $('#G17_subtitulo').parent().parent().hide();
          $('#G19_mostrarDescServ').parent().parent().hide();
          $('#G20_textDescServ').parent().parent().hide();
        }
        break;
      case ATIVIDADES.ANALISE_COMEX:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="H4_despImportOpcoes"]').prop('disabled', false);
        $('input[name="H5_anuenteOpcoes"]').prop('disabled', false);
        $('input[name="H9_decisaoOpcoes"]').prop('disabled', false);
        $('input[name="H10_retornoOpcoes"]').prop('disabled', false);
        $('#H_divComex .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('input[name="H3_nomeCientif"]').prop('readonly', false);
        $('textarea[name="H6_descIngles"]').prop('readonly', false);
        $('textarea[name="H7_descLi"]').prop('readonly', false);
        $('textarea[name="H8_descPortg"]').prop('readonly', false);
        $('textarea[name="H11_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('H4_despImportOpcoes', 'hd_H4_despImportOpcoes');
        atualizarCampoHidden('H5_anuenteOpcoes', 'hd_H5_anuenteOpcoes');
        atualizarCampoHidden('H9_decisaoOpcoes', 'hd_H9_decisaoOpcoes');
        atualizarCampoHidden('H10_retornoOpcoes', 'hd_H10_retornoOpcoes');
        if ($('#hd_C4_prod_importado').val() == 'S') {
          $('#H3_nomeCientif').val(descricao);
        }
        $('#H8_descPortg').val(descricao);
        $('#hd_H9_decisaoOpcoes').val('');
        $('#hd_H10_retornoOpcoes').val('');
        $('#H11_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_CONTABIL:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="I7_decisaoOpcoes"]').prop('disabled', false);
        $('#I_divContabil .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('textarea[name="I8_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('I7_decisaoOpcoes', 'hd_I7_decisaoOpcoes');
        $('#hd_I7_decisaoOpcoes').val('');
        $('#I8_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_CUSTOS:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="J3_moeda"]').prop('disabled', false);
        $('input[name="J5_exRiscCambOpcoes"]').prop('disabled', false);
        $('input[name="J7_decisaoOpcoes"]').prop('disabled', false);
        $('#J_divCustos .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('input[name="J6_varCambial"]').prop('readonly', false);
        $('textarea[name="J8_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('J3_moeda', 'hd_J3_moeda');
        atualizarCampoHidden('J5_exRiscCambOpcoes', 'hd_J5_exRiscCambOpcoes');
        atualizarCampoHidden('J7_decisaoOpcoes', 'hd_J7_decisaoOpcoes');
        if (!J3_moeda) {
          $('#hd_J3_moeda').val('1');
        }
        $('#hd_J7_decisaoOpcoes').val('');
        $('#J8_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_LOGISTICA:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="K3_tipoConversao"]').prop('disabled', false);
        $('input[name="K6_armDriveOpcoes"]').prop('disabled', false);
        $('input[name="K14_pulmaoOpcoes"]').prop('disabled', false);
        $('input[name="K16_decisaoOpcoes"]').prop('disabled', false);
        $('#K_divLogistica .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('input[name="K7_largura"]').prop('readonly', false);
        $('input[name="K8_comprimento"]').prop('readonly', false);
        $('input[name="K9_altura"]').prop('readonly', false);
        $('input[name="K18_endereco_entrada"]').prop('readonly', false);
        $('textarea[name="K17_justificativa"]').prop('readonly', false);
        atualizarCampoHidden('K3_tipoConversao', 'hd_K3_tipoConversao');
        atualizarCampoHidden('K4_wmsOpcoes', 'hd_K4_wmsOpcoes');
        atualizarCampoHidden('K5_enderecoOpcoes', 'hd_K5_enderecoOpcoes');
        atualizarCampoHidden('K6_armDriveOpcoes', 'hd_K6_armDriveOpcoes');
        atualizarCampoHidden('K14_pulmaoOpcoes', 'hd_K14_pulmaoOpcoes');
        atualizarCampoHidden('K16_decisaoOpcoes', 'hd_K16_decisaoOpcoes');
        if ($('#hd_B12_rastroOpcoes').val() == 'L') {
          $('#hd_K4_wmsOpcoes').val('1');
          $('#hd_K5_enderecoOpcoes').val('1');
        } else {
          $('#hd_K4_wmsOpcoes').val('2');
          $('#hd_K5_enderecoOpcoes').val('2');
        }
        if (!hd_K6_armDriveOpcoes) {
          $('#hd_K6_armDriveOpcoes').val('N');
        }
        $('#hd_L11_um_industria').val('2');
        $('#hd_K16_decisaoOpcoes').val('');
        $('#K17_justificativa').val('');
        break;
      case ATIVIDADES.ANALISE_PLANEJAMENTO:
        visualizaEtapaInicio();
        ocultaPainelAbertura();
        $('input[name="L9_form_mrp"]').prop('disabled', false);
        $('input[name="L20_tipo_prazo"]').prop('disabled', false);
        $('input[name="L22_tipo_dec_op"]').prop('disabled', false);
        $('input[name="L23_entra_mrp"]').prop('disabled', false);
        $('input[name="L26_atende_necessidade"]').prop('disabled', false);
        $('input[name="L7_apontamento_produto"]').prop('disabled', false);
        $('input[name="L11_um_industria"]').prop('disabled', false);
        $('input[name="L27_decisaoOpcoes"]').prop('disabled', false);
        $('input[name="L28_retornoOpcoes"]').prop('disabled', false);
        $('#L_divPlanejamento .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': '', cursor: 'pointer' });
        $('input[name="L8_dias_es"]').prop('readonly', false);
        $('input[name="L15_ponto_pedido"]').prop('readonly', false);
        $('input[name="L16_seguranca"]').prop('readonly', false);
        $('input[name="L19_entrega"]').prop('readonly', false);
        $('input[name="L19_entrega"]').prop('readonly', false);
        $('input[name="L21_tolerancia"]').prop('readonly', false);
        $('input[name="L24_prazo_validade"]').prop('readonly', false);
        $('input[name="L25_estoque_maximo"]').prop('readonly', false);
        $('input[name="L4_codigo_allix"]').prop('readonly', false);
        $('input[name="L5_codigo_gemba"]').prop('readonly', false);
        $('input[name="L6_codigo_espanha"]').prop('readonly', false);
        $('textarea[name="L29_justificativa"]').prop('readonly', false);
        if (!hd_L11_um_industria) {
          $('#hd_L11_um_industria').val('2');
        }
        if (!hd_L26_atende_necessidade) {
          if (tipo[0] == 'PA') {
            $('#hd_L26_atende_necessidade').val('P');
          } else {
            $('#hd_L26_atende_necessidade').val('C');
          }
        }
        atualizarCampoHidden('L7_apontamento_produto', 'hd_L7_apontamento_produto');
        atualizarCampoHidden('L9_form_mrp', 'hd_L9_form_mrp');
        atualizarCampoHidden('L11_um_industria', 'hd_L11_um_industria');
        atualizarCampoHidden('L20_tipo_prazo', 'hd_L20_tipo_prazo');
        atualizarCampoHidden('L22_tipo_dec_op', 'hd_L22_tipo_dec_op');
        atualizarCampoHidden('L23_entra_mrp', 'hd_L23_entra_mrp');
        atualizarCampoHidden('L26_atende_necessidade', 'hd_hd_L26_atende_necessidade');
        atualizarCampoHidden('L27_decisaoOpcoes', 'hd_L27_decisaoOpcoes');
        atualizarCampoHidden('L28_retornoOpcoes', 'hd_L28_retornoOpcoes');
        $('#hd_L27_decisaoOpcoes').val('');
        $('#hd_L28_retornoOpcoes').val('');
        $('#L29_justificativa').val('');
        break;
      case ATIVIDADES.REVISAO:
        visualizaEtapaInicio();
        $('#stepRevisao').show();
        $('#stepRevisao').addClass('active');
        break;
      case ATIVIDADES.INTEGRACAO_PROTHEUS:
        visualizaEtapaFim();
        break;
      case ATIVIDADES.TI:
        visualizaEtapaFim();
        $('#stepTI').show();

        break;
      case ATIVIDADES.FIM:
        visualizaEtapaFim();
        break;
      default:
        break;
    }
  } else {
    visualizaEtapaFim();
  }
}

function ocultaPainelAbertura() {
  $('#B_divAbertura input:not(.zoom-tdi)').attr('readonly', true);
  $('#B_divAbertura textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#B_divAbertura .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
}

function visualizaEtapaInicio() {
  $('#C_divCompras input:not(.zoom-tdi)').attr('readonly', true);
  $('#C_divCompras textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#C_divCompras .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel comercial*/
  $('#D_divComercial input:not(.zoom-tdi)').attr('readonly', true);
  $('#D_divComercial textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#D_divComercial .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel tecnico */
  $('#E_divTecnico input:not(.zoom-tdi)').attr('readonly', true);
  $('#E_divTecnico textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#E_divTecnico .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel qualidade */
  $('#F_divQualidade input:not(.zoom-tdi)').attr('readonly', true);
  $('#F_divQualidade textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#F_divQualidade .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel fiscal */
  $('#G_divFiscal input:not(.zoom-tdi)').attr('readonly', true);
  $('#G_divFiscal textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#G_divFiscal .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel comex */
  $('#H_divComex input:not(.zoom-tdi)').attr('readonly', true);
  $('#H_divComex textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#H_divComex .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel contábil */
  $('#I_divContabil input:not(.zoom-tdi)').attr('readonly', true);
  $('#I_divContabil textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#I_divContabil .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel custos */
  $('#J_divCustos input:not(.zoom-tdi)').attr('readonly', true);
  $('#J_divCustos textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#J_divCustos .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel logistica */
  $('#K_divLogistica input:not(.zoom-tdi)').attr('readonly', true);
  $('#K_divLogistica textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#K_divLogistica .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel planejamento */
  $('#L_divPlanejamento input:not(.zoom-tdi)').attr('readonly', true);
  $('#L_divPlanejamento textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#L_divPlanejamento .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });

  /* bloqueia radios */
  var radioNames = [];
  $('input[type="radio"]').each(function () {
    var name = $(this).attr('name');
    $('input[name=' + name + ']').prop('disabled', true);
    if (radioNames.indexOf(name) === -1) {
      radioNames.push(name);
    }
  });
  console.log(radioNames);
}
function visualizaEtapaFim() {
  $('#B_divAbertura input:not(.zoom-tdi)').attr('readonly', true);
  $('#B_divAbertura textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#B_divAbertura .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel comercial*/
  $('#C_divCompras input:not(.zoom-tdi)').attr('readonly', true);
  $('#C_divCompras textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#C_divCompras .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel comercial*/
  $('#D_divComercial input:not(.zoom-tdi)').attr('readonly', true);
  $('#D_divComercial textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#D_divComercial .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel tecnico */
  $('#E_divTecnico input:not(.zoom-tdi)').attr('readonly', true);
  $('#E_divTecnico textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#E_divTecnico .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel qualidade */
  $('#F_divQualidade input:not(.zoom-tdi)').attr('readonly', true);
  $('#F_divQualidade textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#F_divQualidade .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel fiscal */
  $('#G_divFiscal input:not(.zoom-tdi)').attr('readonly', true);
  $('#G_divFiscal textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#G_divFiscal .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel comex */
  $('#H_divComex input:not(.zoom-tdi)').attr('readonly', true);
  $('#H_divComex textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#H_divComex .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel contábil */
  $('#I_divContabil input:not(.zoom-tdi)').attr('readonly', true);
  $('#I_divContabil textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#I_divContabil .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel custos */
  $('#J_divCustos input:not(.zoom-tdi)').attr('readonly', true);
  $('#J_divCustos textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#J_divCustos .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel logistica */
  $('#K_divLogistica input:not(.zoom-tdi)').attr('readonly', true);
  $('#K_divLogistica textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#K_divLogistica .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
  /* painel planejamento */
  $('#L_divPlanejamento input:not(.zoom-tdi)').attr('readonly', true);
  $('#L_divPlanejamento textarea:not(.zoom-tdi)').attr('readonly', true);
  $('#L_divPlanejamento .zoom-tdi').parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });

  /* bloqueia radios */
  var radioNames = [];
  $('input[type="radio"]').each(function () {
    var name = $(this).attr('name');
    $('input[name=' + name + ']').prop('disabled', true);
    if (radioNames.indexOf(name) === -1) {
      radioNames.push(name);
    }
  });
  console.log(radioNames);
}

function marcarSteps(atividade) {
  const steps = {
    [ATIVIDADES.ABERTURA]: ['#stepInicio'],
    [ATIVIDADES.ANALISE_COMPRAS]: ['#stepInicio', '#stepCompras'],
    [ATIVIDADES.ANALISE_COMERCIAL]: ['#stepInicio', '#stepCompras', '#stepComercial'],
    [ATIVIDADES.ANALISE_TECNICO]: ['#stepInicio', '#stepCompras', '#stepComercial', '#stepTecnico'],
    [ATIVIDADES.ANALISE_QUALIDADE]: ['#stepInicio', '#stepCompras', '#stepComercial', '#stepTecnico', '#stepQualidade'],
    [ATIVIDADES.ANALISE_FISCAL]: ['#stepInicio', '#stepCompras', '#stepComercial', '#stepTecnico', '#stepQualidade', '#stepFiscal'],
    [ATIVIDADES.ANALISE_COMEX]: ['#stepInicio', '#stepCompras', '#stepComercial', '#stepTecnico', '#stepQualidade', '#stepFiscal', '#stepComex'],
    [ATIVIDADES.ANALISE_CONTABIL]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
    ],
    [ATIVIDADES.ANALISE_CUSTOS]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
      '#stepCustos',
    ],
    [ATIVIDADES.ANALISE_LOGISTICA]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
      '#stepCustos',
      '#stepLogistica',
    ],
    [ATIVIDADES.ANALISE_PLANEJAMENTO]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
      '#stepCustos',
      '#stepLogistica',
      '#stepPlanejamento',
    ],
    [ATIVIDADES.INTEGRACAO_PROTHEUS]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
      '#stepCustos',
      '#stepLogistica',
      '#stepPlanejamento',
      '#stepIntegracao',
    ],
    [ATIVIDADES.TI]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
      '#stepCustos',
      '#stepLogistica',
      '#stepPlanejamento',
      '#stepIntegracao',
      '#stepTI',
    ],
    [ATIVIDADES.FIM]: [
      '#stepInicio',
      '#stepCompras',
      '#stepComercial',
      '#stepTecnico',
      '#stepQualidade',
      '#stepFiscal',
      '#stepComex',
      '#stepContabil',
      '#stepCustos',
      '#stepLogistica',
      '#stepPlanejamento',
      '#stepIntegracao',
      '#stepTI',
      '#stepFim',
    ],
  };

  const stepsToMark = steps[atividade] || [];
  stepsToMark.forEach((step, index) => {
    if (index < stepsToMark.length - 1) {
      $(step).addClass('done');
    } else {
      $(step).addClass('active');
    }
  });
}

function sequenciaTable(id, label) {
  //isso aqui coloca o numero azul bonitinho na tabela, a sequencia de cada linha
  $(`input[id^='${id}___']`).each(function (index, element) {
    const row = $(element).attr('id').split('___')[1];
    $(element).val(index + 1);
    $(`#${label}___${row}`).text(strzero((index + 1).toString(),2));
  });
  return true;
}

function addNewTableRow(id) {
  let ATIVIDADE = getTask();
  let row;
  if (id === 'tbFornecedor' && ATIVIDADE === ATIVIDADES.ANALISE_COMPRAS) {
    row = wdkAddChild(id);
  } else if (id === 'tbCliente' && ATIVIDADE === ATIVIDADES.ANALISE_COMERCIAL) {
    row = wdkAddChild(id);
  } else if (id === 'tbEnsaio' && ATIVIDADE === ATIVIDADES.ANALISE_QUALIDADE) {
    row = wdkAddChild(id);
  } else {
    Swal.fire({
      title: 'Atenção',
      html: `Você não possui permissão para incluir novos registros nesta atividade.`,
      icon: 'error',
    });
    return;
  }

  const tables = [
    {
      id: 'tbCliente',
      sequencia: sequenciaTable('sequenciaCliente', 'sequenciaClienteLabel'),
    },
    {
      id: 'tbFornecedor',
      sequencia: sequenciaTable('sequenciaFornecedor', 'sequenciaFornecedorLabel'),
    },
    {
      id: 'tbEnsaio',
      sequencia: sequenciaTable('sequenciaEnsaio', 'sequenciaEnsaioLabel'),
    },
  ];

  tables.forEach((table) => {
    if (id === table.id) {
      evitaDigitarZoom();
      if (table.id === 'tbFornecedor') {
        switch (ATIVIDADE) {
          case ATIVIDADES.ANALISE_COMPRAS:
            $('[id^="C16_fatorConversao___"]').mask('00.00', { reverse: true });
            $('[id^="C10_codProdutoFornecedor___"]').prop('readonly', false);
            $('[id^="C16_fatorConversao___"]').prop('readonly', false);
            $('[id^="C13_fab_rev_perm___"]').prop('disabled', false);
            $('[id^="C17_tipoConversao___"]').prop('disabled', false);
            atualizarCampoHidden(`C13_fab_rev_perm___${row}`, `hd_C13_fab_rev_perm___${row}`);
            atualizarCampoHidden(`C17_tipoConversao___${row}`, `hd_C17_tipoConversao___${row}`);
            $(`#F63_skip_lote___${row}`).parent().find('.input-group-addon').css({ 'pointer-events': 'none', cursor: 'not-allowed' });
            break;
          default:
            break;
        }
      }
      if (table.id === 'tbCliente') {
        switch (ATIVIDADE) {
          case ATIVIDADES.ANALISE_COMERCIAL:
            $('[id^="D10_descricaoCliente___"]').prop('readonly', false);
            $('[id^="D9_codProdutoCliente___"]').prop('readonly', false);
            break;
          default:
            break;
        }
      }
      if (table.id === 'tbEnsaio') {
        switch (ATIVIDADE) {
          case ATIVIDADES.ANALISE_QUALIDADE:
            $('#F73_ensaio___'+row).val('00000003');
            $('#F73_ensaioHidden___'+row).val('00000003');
            $('#F74_desc_ensaio___'+row).val('INSPEÇÃO VISUAL');
            $("#F78_texto___"+row).val('CONFORME CHECKLIST DE RECEBIMENTO');

            $('#F75_laboratorio___'+row).val('LABFIS');
            $('#F75_laboratorioHidden___'+row).val('LABFIS');
            $('#F76_desc_laboratorio___'+row).val('LABORATORIO FISICO');
            // $("#F77_seq_labor___"+row).prop('readonly', true);
            $('[id^="F78_texto___"]').prop('readonly', false);
            calculaSequenciaLaboratorioEnsaio();
            break;
          default:
            break;
        }
      }
      return table.sequencia;
    }
  });

  return row;
}

function removeTrash() {
  let ATIVIDADE = getTask();
  if (ATIVIDADE !== ATIVIDADES.ANALISE_COMPRAS) {
    $('.trash-fornecedor').hide();
  }
  if (ATIVIDADE !==  ATIVIDADES.ANALISE_COMERCIAL) {
    $('.trash-cliente').hide();
  }
  if (ATIVIDADE !== ATIVIDADES.ANALISE_QUALIDADE) {
    $('.trash-ensaio').hide();
  }
}

async function findFolder(idPastaRaiz, nomePasta) {
  var c1 = DatasetFactory.createConstraint('parentDocumentId', idPastaRaiz, idPastaRaiz, ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint('deleted', false, false, ConstraintType.MUST);
  var c3 = DatasetFactory.createConstraint('activeVersion', true, true, ConstraintType.MUST);
  var c4 = DatasetFactory.createConstraint('documentDescription', nomePasta, nomePasta, ConstraintType.MUST);
  var c5 = DatasetFactory.createConstraint('userSecurityId', 'admin_protheus', 'admin_protheus', ConstraintType.MUST);
  var sortingFields = new Array('documentDescription');
  var constraints = new Array(c1, c2, c3, c4, c5);
  const dataset = await carregaDatasetDinamico('document', null, constraints, sortingFields);
  return dataset;
}

async function findFiles(idPasta) {
  var c1 = DatasetFactory.createConstraint('parentDocumentId', idPasta, idPasta, ConstraintType.MUST);
  var c2 = DatasetFactory.createConstraint('deleted', false, false, ConstraintType.MUST);
  var c3 = DatasetFactory.createConstraint('activeVersion', true, true, ConstraintType.MUST);
  var c4 = DatasetFactory.createConstraint('userSecurityId', 'admin_protheus', 'admin_protheus', ConstraintType.MUST);
  var sortingFields = new Array('documentDescription');
  var constraints = new Array(c1, c2, c3, c4);
  const dataset = await carregaDatasetDinamico('document', null, constraints, sortingFields);
  return dataset;
}

async function openFotoModal(campoId) {
  const loading = FLUIGC.loading(window, {
    textMessage: 'Buscando imagens no GED...',
  });
  try {
    loading.show();
    const pastaRaiz = await findFolder(0, 'protheus_reposit');
    if (!pastaRaiz || pastaRaiz.length === 0) {
      loading.hide();
      return Swal.fire({
        title: 'Atenção',
        html: `Pasta raiz das imagens Protheus não encontrada.`,
        icon: 'error',
      });
    }

    const imagens = await findFiles(pastaRaiz[0]['documentPK.documentId']);
    let imagensHtml = '';
    for (const item of imagens) {
      const physicalPath = await carregaDatasetDinamico('dsPhysicalFilePath', [String(item['documentPK.documentId'])]);
      if (!physicalPath || physicalPath.length === 0) continue;
      imagensHtml += `
        <div class="swiper-slide">
          <label class="info">${item['documentDescription']}</label>
          <br>
          <div style="display: flex; justify-content: center; align-items: center;">
            <img src="${physicalPath[0].URL}" alt="${item['documentDescription']}" style="width: 100px; height: auto;" value="${item['documentPK.documentId']}">
          </div>
        </div>
      `;
    }

    const modalContent = `
    <div class="modal-body" style="overflow: auto; max-height: 800px; margin: 0px auto;">
      <div class="swiper-container">
        <div class="swiper-wrapper">
        ${imagensHtml ? imagensHtml : '<p>Nenhuma imagem encontrada.</p>'}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  `;

    const fluigModal = FLUIGC.modal({
      title: 'Escolher imagem do Produto',
      content: modalContent,
      id: 'fluigModal',
      size: 'large',
      actions: [
        {
          label: 'Selecionar Imagem',
          bind: 'data-select-image',
          autoClose: false,
        },
        {
          label: 'Fechar',
          bind: 'data-close',
          autoClose: true,
        },
      ],
    });
    loading.hide();

    $(document).off('click', '[data-select-image]');
    $(document).on('click', '[data-select-image]', function () {
      const idDocumentoSelecionado = $('.swiper-slide-active img').attr('value');
      const urlDocumentoSelecionado = $('.swiper-slide-active img').attr('src');
      const descDocumentoSelecionado = $('.swiper-slide-active img').attr('alt');
      if (idDocumentoSelecionado) {
        console.log('ID Documento selecionado:', idDocumentoSelecionado);
        $(`#${campoId}_fotoHidden`).val(idDocumentoSelecionado);
        $(`#${campoId}_fotoUrlHidden`).val(urlDocumentoSelecionado);
        $(`#${campoId}_fotoDescHidden`).val(descDocumentoSelecionado.split('.')[0].toUpperCase());
        //remove div com miniatura da foto
        if ($(`#${campoId}_divMiniatura`).length) {
          $(`#${campoId}_divMiniatura`).remove();
        }
        //adiciona miniatura com base na url da imagem
        $(`#${campoId}_divSelecionaFoto`).append(`
          <div id="${campoId}_divMiniatura" class="media">
          <a class="pull-left" href="#">
          <img class="media-object" style="max-width: 100%; max-height: 500px; object-fit: contain;" src="${urlDocumentoSelecionado}" alt="Imagem selecionada pelo usuário">
          </a>
          <div class="media-body">
              <h4 class="media-heading">Imagem selecionada</h4>
              <label>ID: ${idDocumentoSelecionado}</label>
          </div>
      </div>`);
      } else {
        $(`#${campoId}_fotoHidden`).val('');
        $(`#${campoId}_fotoUrlHidden`).val('');
        $(`#${campoId}_fotoDescHidden`).val('');
        alert('Nenhuma imagem selecionada!');
      }
      $('[data-close]').click();
    });

    setTimeout(() => {
      const swiper = new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }, 500);
  } catch (error) {
    loading.hide();
    console.error(error);
  }
}

function preencheTipoControleQualidade() {
  const tipoProduto = $('#B4_tipoHidden').val();
  //Se tipo de produto for MP, PA ou EM, Campo tipo de controle qualidade deve vir marcado sigaquality
  if (tipoProduto == 'MP' || tipoProduto == 'PA' || tipoProduto == 'EM') {
    $("#hd_F7_tipo_cqOp").val('Q');
  } else {
    $("#hd_F7_tipo_cqOp").val('M');
  }
  atualizarCampoRadio('F7_tipo_cqOp', 'hd_F7_tipo_cqOp');
}

function atualizaAsteriscosObrigatoriedadeDinamicamente() {
  $("input, select, textarea").on("change input", function () {
    const idCamposObrigatorios = camposObrigatorios();
    const isRequired = idCamposObrigatorios.includes($(this).attr("id"));
    const inputId = $(this).attr("id");

    if (inputId) {
      toggleRequired(inputId, isRequired);
    }
  });
}

function toggleRequired(inputId, shouldRequire) {
  const label = $(`label[for="${inputId}"]`);

  if (shouldRequire && !label.hasClass("required")) {
    label.addClass("required");
  } else if (!shouldRequire && label.hasClass("required")) {
    label.removeClass("required");
  }
}

function calculaSequenciaLaboratorioEnsaio() {
  const labCount = {}; // Store sequence count per laboratorio
	
  $("input[id^='F73_ensaio___']").each(function () {
    const row = $(this).attr("id").split("___")[1];
    const laboratorio = $(`#F75_laboratorioHidden___${row}`).val();

    if (!labCount[laboratorio]) {
      labCount[laboratorio] = 1;
    } else {
      labCount[laboratorio]++;
    }
    debugger;

    $(`#F77_seq_labor___${row}`).val(strzero(labCount[laboratorio].toString(),2));
  });
}

function replicaInformacoesPainelQualidade() {
  $("#B2_descricao").on("change input", function () {
    const descricao = $(this).val();
    $("#F67_descricao").val(descricao);
  });

  $("#B2_descricao_ingles").on("change input", function () {
    const descricao = $(this).val();
    $("#F68_desc_ingles").val(descricao);
  });

  $("#B2_descricao_espanhol").on("change input", function () {
    const descricao = $(this).val();
    $("#F69_desc_espanhol").val(descricao);
  });

  $("#B4_tipo").on("change input", function () {
    const tipo = $(this).val();
    $("#F70_tipo").val(tipo);
  });

  $("#B5_unidadeMedida1").on("change input", function () {
    const unidade = $(this).val();
    $("#F71_un_medida").val(unidade);
  });
  
}

function strzero(cString, nTam){
	while (cString.length < nTam){
		cString = "0" + cString;
	}
	return cString;
}