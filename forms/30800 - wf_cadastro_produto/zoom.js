function setSelectedZoomItem(item) {
  // se for pai x filho
  if (item.type.includes('___')) {
    const type = item.type.split('___')[0];
    const row = item.type.split('___')[1];
    if (type === 'D7_cliente') {
      $(`#D7_cliente___${row}`).val(item.CODIGO);
      $(`#D7_clienteHidden___${row}`).val(item.CODIGO);
      $(`#D8_loja___${row}`).val(item.LOJA);
      $(`#D10_descricaoCliente___${row}`).val(item.DESCRICAO);
    } else if (type === 'D11_clienteCodFabricante') {
      $(`#D11_clienteCodFabricante___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#D11_clienteCodFabricanteHidden___${row}`).val(item.CODIGO);
      $(`#D12_lojaFabricante___${row}`).val(item.LOJA);
    } else if (type === 'D13_clienteCentroCusto') {
      $(`#D13_clienteCentroCusto___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#D13_clienteCentroCustoHidden___${row}`).val(item.CODIGO);
    } else if (type === 'C8_fornecedor') {
      $(`#C8_fornecedor___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#C8_fornecedorHidden___${row}`).val(item.CODIGO);
      $(`#C9_loja___${row}`).val(item.LOJA);
    } else if (type === 'C11_fabricante') {
      $(`#C11_fabricante___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#C11_fabricanteHidden___${row}`).val(item.CODIGO);
      $(`#C12_loja_fabricante___${row}`).val(item.LOJA);
    } else if (type === 'C14_situacao') {
      $(`#C14_situacao___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#C14_situacaoHidden___${row}`).val(item.CODIGO);
    } else if (type === 'C15_unidade') {
      $(`#C15_unidade___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#C15_unidadeHidden___${row}`).val(item.CODIGO);
    } else if (type === 'F63_skip_lote') {
      $(`#F63_skip_lote___${row}`).val(item.CODIGO + ' - ' + item.DESCRICAO);
      $(`#F63_skip_loteHidden___${row}`).val(item.CODIGO);
    } else if (type == 'F73_ensaio') {
      $('#F73_ensaio___'+row).val(item.CODIGO);
      $('#F73_ensaioHidden___'+row).val(item.CODIGO);
      $('#F74_desc_ensaio___'+row).val(item.DESCRICAO);
    } else if (type == 'F75_laboratorio') {
      $('#F75_laboratorio___'+row).val(item.CODIGO);
      $('#F75_laboratorioHidden___'+row).val(item.CODIGO);
      $("#F76_desc_laboratorio___"+row).val(item.DESCRICAO);
      calculaSequenciaLaboratorioEnsaio();
    }
  }
  // se nao for pai x filho
  else {
    /* PAINEL ABERTURA */
    if (item.type === 'zoomEmpresa') {
      $('#zoomEmpresa').val(item.CODIGO);
      $('#empresaFilial').val(item.FILIAL);
      $('#empresaNome').val(item.NOME);
      $('#empresaCgc').val(item.CGC);
      $('#codTenantId').val(item.TENANTID);
    }
    else if (item.type == 'B1_codProduto') {
    	var consUser 		= DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
      var consId   		= DatasetFactory.createConstraint("validaEdicao", "1", "1", ConstraintType.MUST);
    	var consCodigo   	= DatasetFactory.createConstraint("B1_codProduto", item.CODIGO, item.CODIGO, ConstraintType.MUST);
    	var consAtivo   	= DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
      var dsCabForm = DatasetFactory.getDataset('dsCadastroProduto', null,[consUser,consId,consCodigo,consAtivo],null);
      if (dsCabForm?.values?.length > 0) {
        	Swal.fire({
			    title: "Atenção",
			    html: 'Já existe(m) edições em aberto para este produto.',
			    icon: "warning"
			  });
      } else{
	      $('#B1_codProduto').val(item.CODIGO);
	      $('#B2_descricao').val(item.DESCRICAO).trigger('change');
	      preencheEdicaoCampos();
	    }
    }
    else if (item.type == 'B3_catalogoProduto') {
      $('#B3_catalogoProduto').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#B3_catalogoProdutoHidden').val(item.CODIGO);
      preencheDescricao();
    }
    else if (item.type == 'B4_tipo') {
      $('#B4_tipo').val(item.CODIGO + ' - ' + item.DESCRICAO).trigger('change');
      $('#B4_tipoHidden').val(item.CODIGO);
      ocultaNutriAnimal();
      caminhoProcesso();
      preencheRastro();
      preencheDescricao();
      preencheTipoControleQualidade();
    }
    else if (item.type == 'B5_unidadeMedida1') {
      $('#B5_unidadeMedida1').val(item.CODIGO + ' - ' + item.DESCRICAO).trigger('change');
      $('#B5_unidadeMedida1Hidden').val(item.CODIGO);
      preencheDescricao();
    }
    else if (item.type == 'B6_unidadeMedida2') {
      $('#B6_unidadeMedida2').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#B6_unidadeMedida2Hidden').val(item.CODIGO);
    }
    else if (item.type == 'B10_armPadrao') {
      $('#B10_armPadrao').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#B10_armPadraoHidden').val(item.CODIGO);
      $('#F29_resp_tecnico').val(item.CODRESP + ' - ' + item.RESPONSAVEL);
      $('#F29_resp_tecnicoHidden').val(item.CODRESP);
    }
    else if (item.type == 'B11_centroCusto') {
      $('#B11_centroCusto').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#B11_centroCustoHidden').val(item.CODIGO);
      preencheDescricao();
    }
    /* PAINEL COMPRAS */
    else if (item.type == 'C3_origem') {
      $('#C3_origem').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#C3_origemHidden').val(item.CODIGO);
      preencheProdImport();
    }
    /* PAINEL COMERCIAL */
    else if (item.type == 'D3_finalidade') {
      $('#D3_finalidade').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#D3_finalidadeHidden').val(item.CODIGO);
    }
    /* PAINEL TECNICO */
    else if (item.type == 'E3_embalagemPremix') {
      $('#E3_embalagemPremix').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#E3_embalagemPremixHidden').val(item.CODIGO);
    }
    else if (item.type == 'E4_tipoEnsaque') {
      $('#E4_tipoEnsaque').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#E4_tipoEnsaqueHidden').val(item.CODIGO);
    }
    else if (item.type == 'E8_especieDest') {
      $('#E8_especieDest').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#E8_especieDestHidden').val(item.CODIGO);
    }
    /* PAINEL QUALIDADE */
    else if (item.type == 'F4_pos_ipi') {
      $('#F4_pos_ipi').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F4_pos_ipiHidden').val(item.CODIGO);
    }
    else if (item.type == 'F5_ex_ncm') {
      $('#F5_ex_ncm').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F5_ex_ncmHidden').val(item.CODIGO);
    }
    else if (item.type == 'F13_especie_dest') {
      $('#F13_especie_dest').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F13_especie_destHidden').val(item.CODIGO);
    }
    else if (item.type == 'F17_num_onu') {
      $('#F17_num_onu').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F17_num_onuHidden').val(item.CODIGO);
      $("label[for='F35_kit']").addClass("required");
      $("label[for='F36_grupo_epi']").addClass("required");
      $("label[for='F41_sub_classe_risco']").addClass("required");
    }
    else if (item.type == 'F26_codigo_dcb') {
      $('#F26_codigo_dcb').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F26_codigo_dcbHidden').val(item.CODIGO);
    }
    else if (item.type == 'F28_classe_familia_prd') {
      $('#F28_classe_familia_prd').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F28_classe_familia_prdHidden').val(item.CODIGO);
    }
    else if (item.type == 'F29_resp_tecnico') {
      $('#F29_resp_tecnico').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F29_resp_tecnicoHidden').val(item.CODIGO);
    }
    else if (item.type == 'F34_codigo_IBAMA') {
      $('#F34_codigo_IBAMA').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F34_codigo_IBAMAHidden').val(item.CODIGO);
    }
    else if (item.type == 'F43_classe_imp') {
      $('#F43_classe_imp').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F43_classe_impHidden').val(item.CODIGO);
    }
    else if (item.type == 'F45_processo_obtencao') {
      $('#F45_processo_obtencao').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F45_processo_obtencaoHidden').val(item.CODIGO);
    }
    else if (item.type == 'F46_aplicacao_imp') {
      $('#F46_aplicacao_imp').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F46_aplicacao_impHidden').val(item.CODIGO);
    }
    else if (item.type == 'F47_finalidade') {
      $('#F47_finalidade').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F47_finalidadeHidden').val(item.CODIGO);
    }
    else if (item.type == 'F50_condicao_armz') {
      $('#F50_condicao_armz').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F50_condicao_armzHidden').val(item.CODIGO);
    }
    else if (item.type == 'F72_un_med_amostra') {
      $('#F72_un_med_amostra').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#F72_un_med_amostraHidden').val(item.CODIGO);
    }
    else if (item.type == 'F80_categoria_prd') {
      $('#F80_categoria_prd').val(item.CLASSIFICACAOPROD);
      $('#F80_categoria_prdHidden').val(item.CLASSIFICACAOPROD);
      $('#F81_convenio').val(item.CONVENIO);
    }
    /* PAINEL FISCAL */
    else if (item.type == 'G4_grupoTrib') {
      $('#G4_grupoTrib').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#G4_grupoTribHidden').val(item.CODIGO);
    }
    else if (item.type == 'G11_codServIss') {
      $('#G11_codServIss').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#G11_codServIssHidden').val(item.CODIGO);
    }
    else if (item.type == 'G12_cest') {
      $('#G12_cest').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#G12_cestHidden').val(item.CODIGO);
    }
    else if (item.type == 'G16_tipoServico') {
      $('#G16_tipoServico').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#G16_tipoServicoHidden').val(item.CODIGO);
    }
    else if (item.type == 'G18_nbs') {
      $('#G18_nbs').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#G18_nbsHidden').val(item.CODIGO);
    }
    /* PAINEL CONTÁBIL */
    else if (item.type == 'I3_contaContabil') {
      $('#I3_contaContabil').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#I3_contaContabilHidden').val(item.CODIGO);
    }
    else if (item.type == 'I4_itemConta') {
      $('#I4_itemConta').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#I4_itemContaHidden').val(item.CODIGO);
    }
    else if (item.type == 'I5_classeValor') {
      $('#I5_classeValor').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#I5_classeValorHidden').val(item.CODIGO);
    }
    /* PAINEL CUSTOS */
    else if (item.type == 'J4_contaOrcament') {
      $('#J4_contaOrcament').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#J4_contaOrcamentHidden').val(item.CODIGO);
    }
    /* PAINEL LOGÍSTICA */
    else if (item.type == 'K10_zonaArmaz') {
      $('#K10_zonaArmaz').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K10_zonaArmazHidden').val(item.CODIGO);
    }
    else if (item.type == 'K11_servEntr') {
      $('#K11_servEntr').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K11_servEntrHidden').val(item.CODIGO);
    }
    else if (item.type == 'K12_servTrans') {
      $('#K12_servTrans').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K12_servTransHidden').val(item.CODIGO);
    }
    else if (item.type == 'K13_servSaida') {
      $('#K13_servSaida').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K13_servSaidaHidden').val(item.CODIGO);
    }
    else if (item.type == 'K15_servEmb') {
      $('#K15_servEmb').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K15_servEmbHidden').val(item.CODIGO);
    }
    else if (item.type == 'K16_endSaida') {
      $('#K16_endSaida').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K16_endSaidaHidden').val(item.CODIGO);
    }
    else if (item.type == 'K18_endereco_entrada') {
      $('#K18_endereco_entrada').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#K18_endereco_entradaHidden').val(item.CODIGO);
    }
    /* PAINEL PLANEJAMENTO */
    else if (item.type == 'L3_grupo') {
      $('#L3_grupo').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L3_grupoHidden').val(item.CODIGO);
    }
    else if (item.type == 'L10_aglu_mrp') {
      $('#L10_aglu_mrp').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L10_aglu_mrpHidden').val(item.CODIGO);
    }
    else if (item.type == 'L12_tipo_rotulo') {
      $('#L12_tipo_rotulo').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L12_tipo_rotuloHidden').val(item.CODIGO);
    }
    else if (item.type == 'L13_tipo_rotulo_premix') {
      $('#L13_tipo_rotulo_premix').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L13_tipo_rotulo_premixHidden').val(item.CODIGO);
    }
    else if (item.type == 'L14_tipo_ensaque_premix') {
      $('#L14_tipo_ensaque_premix').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L14_tipo_ensaque_premixHidden').val(item.CODIGO);
    }
    else if (item.type == 'L17_form_est_seg') {
      $('#L17_form_est_seg').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L17_form_est_segHidden').val(item.CODIGO);
    }
    else if (item.type == 'L18_form_prazo') {
      $('#L18_form_prazo').val(item.CODIGO + ' - ' + item.DESCRICAO);
      $('#L18_form_prazoHidden').val(item.CODIGO);
    }
  }
  console.log(item);
}

function removedZoomItem(removedItem) {
  // se for pai x filho
  if (removedItem?.includes('___')) {
    const type = removedItem.split('___')[0];
    const row = removedItem.split('___')[1];
    if (type === 'D7_cliente') {
      $(`#D7_cliente___${row}`).val('');
      $(`#D7_clienteHidden___${row}`).val('');
      $(`#D8_loja___${row}`).val('');
      $(`#D10_descricaoCliente___${row}`).val('');
    } else if (type === 'D11_clienteCodFabricante') {
      $(`#D11_clienteCodFabricante___${row}`).val('');
      $(`#D11_clienteCodFabricanteHidden___${row}`).val('');
      $(`#D12_lojaFabricante___${row}`).val('');
    } else if (type === 'D13_clienteCentroCusto') {
      $(`#D13_clienteCentroCusto___${row}`).val('');
      $(`#D13_clienteCentroCustoHidden___${row}`).val('');
    } else if (type === 'C8_fornecedor') {
      $(`#C8_fornecedor___${row}`).val('');
      $(`#C8_fornecedorHidden___${row}`).val('');
      $(`#C9_loja___${row}`).val('');
    } else if (type === 'C11_fabricante') {
      $(`#C11_fabricante___${row}`).val('');
      $(`#C11_fabricanteHidden___${row}`).val('');
      $(`#C12_loja_fabricante___${row}`).val('');
    } else if (type === 'C14_situacao') {
      $(`#C14_situacao___${row}`).val('');
      $(`#C14_situacaoHidden___${row}`).val('');
    } else if (type === 'C15_unidade') {
      $(`#C15_unidade___${row}`).val('');
      $(`#C15_unidadeHidden___${row}`).val('');
    } else if (type === 'F63_skip_lote') {
      $(`#F63_skip_lote___${row}`).val('');
      $(`#F63_skip_loteHidden___${row}`).val('');
    } else if (type == 'F73_ensaio') {
      $(`#F73_ensaio___${row}`).val('');
      $(`#F73_ensaioHidden___${row}`).val('');
    } else if (type == 'F75_laboratorio') {
      $(`#F75_laboratorio___${row}`).val('');
      $(`#F75_laboratorioHidden___${row}`).val('');
      $(`#F76_desc_laboratorio___${row}`).val('');
      calculaSequenciaLaboratorioEnsaio();
    }
  }
  // se nao for pai x filho
  else {
    /* PAINEL ABERTURA */
    if (removedItem == 'zoomEmpresa') {
      $('#zoomEmpresa').val('');
      $('#empresaFilial').val('');
      $('#empresaNome').val('');
      $('#empresaCgc').val('');
      $('#codTenantId').val('');
    }
    else if (removedItem == 'B1_codProduto') {
      limparCampos();
      $('input[name="tipoSolicitacao"][value="I"]').prop('checked', true);
      $('#codTipoSolicitacao').val('I');
    }
    else if (removedItem == 'B3_catalogoProduto') {
      $('#B3_catalogoProduto').val('');
      $('#B3_catalogoProdutoHidden').val('');
    }
    else if (removedItem == 'B4_tipo') {
      $('#B4_tipo').val('');
      $('#B4_tipoHidden').val('');
    }
    else if (removedItem == 'B5_unidadeMedida1') {
      $('#B5_unidadeMedida1').val('');
      $('#B5_unidadeMedida1Hidden').val('');
    }
    else if (removedItem == 'B6_unidadeMedida2') {
      $('#B6_unidadeMedida2').val('');
      $('#B6_unidadeMedida2Hidden').val('');
    }
    else if (removedItem == 'B10_armPadrao') {
      $('#B10_armPadrao').val('');
      $('#B10_armPadraoHidden').val('');
      $('#F29_resp_tecnico').val('');
      $('#F29_resp_tecnicoHidden').val('');
    }
    else if (removedItem == 'B11_centroCusto') {
      $('#B11_centroCusto').val('');
      $('#B11_centroCustoHidden').val('');
    }
    /* PAINEL COMPRAS */
    else if (removedItem == 'C3_origem') {
      $('#C3_origem').val('');
      $('#C3_origemHidden').val('');
    }
    /* PAINEL COMERCIAL */
    else if (removedItem == 'D3_finalidade') {
      $('#D3_finalidade').val('');
      $('#D3_finalidadeHidden').val('');
    }
    /* PAINEL TECNICO */
    else if (removedItem == 'E3_embalagemPremix') {
      $('#E3_embalagemPremix').val('');
      $('#E3_embalagemPremixHidden').val('');
    }
    else if (removedItem == 'E4_tipoEnsaque') {
      $('#E4_tipoEnsaque').val('');
      $('#E4_tipoEnsaqueHidden').val('');
    }
    else if (removedItem == 'E8_especieDest') {
      $('#E8_especieDest').val('');
      $('#E8_especieDestHidden').val('');
    }
    /* PAINEL QUALIDADE */
    else if (removedItem == 'F4_pos_ipi') {
      $('#F4_pos_ipi').val('');
      $('#F4_pos_ipiHidden').val('');
    }
    else if (removedItem == 'F5_ex_ncm') {
      $('#F5_ex_ncm').val('');
      $('#F5_ex_ncmHidden').val('');
    }
    else if (removedItem == 'F13_especie_dest') {
      $('#F13_especie_dest').val('');
      $('#F13_especie_destHidden').val('');
    }
    else if (removedItem == 'F17_num_onu') {
      $('#F17_num_onu').val('');
      $('#F17_num_onuHidden').val('');
      $("label[for='F35_kit']").removeClass("required");
      $("label[for='F36_grupo_epi']").removeClass("required");
      $("label[for='F41_sub_classe_risco']").removeClass("required");
    }
    else if (removedItem == 'F26_codigo_dcb') {
      $('#F26_codigo_dcb').val('');
      $('#F26_codigo_dcbHidden').val('');
    }
    else if (removedItem == 'F28_classe_familia_prd') {
      $('#F28_classe_familia_prd').val('');
      $('#F28_classe_familia_prdHidden').val('');
    }
    else if (removedItem == 'F29_resp_tecnico') {
      $('#F29_resp_tecnico').val('');
      $('#F29_resp_tecnicoHidden').val('');
    }
    else if (removedItem == 'F34_codigo_IBAMA') {
      $('#F34_codigo_IBAMA').val('');
      $('#F34_codigo_IBAMAHidden').val('');
    }
    else if (removedItem == 'F43_classe_imp') {
      $('#F43_classe_imp').val('');
      $('#F43_classe_impHidden').val('');
    }
    else if (removedItem == 'F45_processo_obtencao') {
      $('#F45_processo_obtencao').val('');
      $('#F45_processo_obtencaoHidden').val('');
    }
    else if (removedItem == 'F46_aplicacao_imp') {
      $('#F46_aplicacao_imp').val('');
      $('#F46_aplicacao_impHidden').val('');
    }
    else if (removedItem == 'F47_finalidade') {
      $('#F47_finalidade').val('');
      $('#F47_finalidadeHidden').val('');
    }
    else if (removedItem == 'F50_condicao_armz') {
      $('#F50_condicao_armz').val('');
      $('#F50_condicao_armzHidden').val('');
    }
    else if (removedItem == 'F72_un_med_amostra') {
      $('#F72_un_med_amostra').val('');
      $('#F72_un_med_amostraHidden').val('');
    }
    else if (removedItem == 'F80_categoria_prd') {
      $('#F80_categoria_prd').val('');
      $('#F80_categoria_prdHidden').val('');
      $('#F81_convenio').val('');
    }
    /* PAINEL FISCAL */
    else if (removedItem == 'G4_grupoTrib') {
      $('#G4_grupoTrib').val('');
      $('#G4_grupoTribHidden').val('');
    }
    else if (removedItem == 'G11_codServIss') {
      $('#G11_codServIss').val('');
      $('#G11_codServIssHidden').val('');
    }
    else if (removedItem == 'G12_cest') {
      $('#G12_cest').val('');
      $('#G12_cestHidden').val('');
    }
    else if (removedItem == 'G16_tipoServico') {
      $('#G16_tipoServico').val('');
      $('#G16_tipoServicoHidden').val('');
    }
    else if (removedItem == 'G18_nbs') {
      $('#G18_nbs').val('');
      $('#G18_nbsHidden').val('');
    }
    /* PAINEL CONTÁBIL */
    else if (removedItem == 'I3_contaContabil') {
      $('#I3_contaContabil').val('');
      $('#I3_contaContabilHidden').val('');
    }
    else if (removedItem == 'I4_itemConta') {
      $('#I4_itemConta').val('');
      $('#I4_itemContaHidden').val('');
    }
    else if (removedItem == 'I5_classeValor') {
      $('#I5_classeValor').val('');
      $('#I5_classeValorHidden').val('');
    }
    /* PAINEL CUSTOS */
    else if (removedItem == 'J4_contaOrcament') {
      $('#J4_contaOrcament').val('');
      $('#J4_contaOrcamentHidden').val('');
    }
    /* PAINEL LOGÍSTICA */
    else if (removedItem == 'K10_zonaArmaz') {
      $('#K10_zonaArmaz').val('');
      $('#K10_zonaArmazHidden').val('');
    }
    else if (removedItem == 'K11_servEntr') {
      $('#K11_servEntr').val('');
      $('#K11_servEntrHidden').val('');
    }
    else if (removedItem == 'K12_servTrans') {
      $('#K12_servTrans').val('');
      $('#K12_servTransHidden').val('');
    }
    else if (removedItem == 'K13_servSaida') {
      $('#K13_servSaida').val('');
      $('#K13_servSaidaHidden').val('');
    }
    else if (removedItem == 'K15_servEmb') {
      $('#K15_servEmb').val('');
      $('#K15_servEmbHidden').val('');
    }
    else if (removedItem == 'K16_endSaida') {
      $('#K16_endSaida').val('');
      $('#K16_endSaidaHidden').val('');
    }
    else if (removedItem == 'K18_endereco_entrada') {
      $('#K18_endereco_entrada').val('');
      $('#K18_endereco_entradaHidden').val('');
    }
    /* PAINEL PLANEJAMENTO */
    else if (removedItem == 'L3_grupo') {
      $('#L3_grupo').val('');
      $('#L3_grupoHidden').val('');
    }
    else if (removedItem == 'L10_aglu_mrp') {
      $('#L10_aglu_mrp').val('');
      $('#L10_aglu_mrpHidden').val('');
    }
    else if (removedItem == 'L12_tipo_rotulo') {
      $('#L12_tipo_rotulo').val('');
      $('#L12_tipo_rotuloHidden').val('');
    }
    else if (removedItem == 'L13_tipo_rotulo_premix') {
      $('#L13_tipo_rotulo_premix').val('');
      $('#L13_tipo_rotulo_premixHidden').val('');
    }
    else if (removedItem == 'L14_tipo_ensaque_premix') {
      $('#L14_tipo_ensaque_premix').val('');
      $('#L14_tipo_ensaque_premixHidden').val('');
    }
    else if (removedItem == 'L17_form_est_seg') {
      $('#L17_form_est_seg').val('');
      $('#L17_form_est_segHidden').val('');
    }
    else if (removedItem == 'L18_form_prazo') {
      $('#L18_form_prazo').val('');
      $('#L18_form_prazoHidden').val('');
    }
  }
  console.log(removedItem);
}

/* PAINEL ABERTURA */
function zoomCodProduto(row) {
  tdizoom.open(
    'dsProdutos' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Produtos' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B1_codProduto' /* nome_do_campo */,
  );
}
function zoomCatalogoProd(row) {
  tdizoom.open(
    'dsCatalogoProd' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Catálogo de Produto' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B3_catalogoProduto' /* nome_do_campo */,
  );
}
function zoomTipoPrd(row) {
  tdizoom.open(
    'dsTipos' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Tipo' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B4_tipo' /* nome_do_campo */,
  );
}
function zoomUnidadeMed1(row) {
  tdizoom.open(
    'dsUnidadeMedida1' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    '1ª Unidade Medida' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B5_unidadeMedida1' /* nome_do_campo */,
  );
}
function zoomUnidadeMed2(row) {
  tdizoom.open(
    'dsUnidadeMedida2' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    '2ª Unidade Medida' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B6_unidadeMedida2' /* nome_do_campo */,
  );
}
function zoomArmPadrao(row) {
  tdizoom.open(
    'dsArmazem' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição,RESPONSAVEL,Responsável,CODRESP,Cód.Responsável' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Armazém Padrão' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B10_armPadrao' /* nome_do_campo */,
  );
}
function zoomCentroCusto(row) {
  tdizoom.open(
    'dsCentroCusto' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Centro de Custo' /* Titulo */,
    null /* filtro,valorfiltro */,
    'B11_centroCusto' /* nome_do_campo */,
  );
}
/* PAINEL COMPRAS */
function zoomOrigem(row) {
  tdizoom.open(
    'dsOrigemProd' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Origem' /* Titulo */,
    null /* filtro,valorfiltro */,
    'C3_origem' /* nome_do_campo */,
  );
}
/* PAINEL COMERCIAL */
function zoomFinalidade(row) {
  tdizoom.open(
    'dsFinalidadeVenda' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Finalidade' /* Titulo */,
    null /* filtro,valorfiltro */,
    'D3_finalidade' /* nome_do_campo */,
  );
}
/* PAINEL TECNICO */
function zoomEmbPremix(row) {
  tdizoom.open(
    'dsEmbalagemPremix' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Embalagem Premix' /* Titulo */,
    null /* filtro,valorfiltro */,
    'E3_embalagemPremix' /* nome_do_campo */,
  );
}
function zoomTipoEnsaque(row) {
  tdizoom.open(
    'dsTipoEnsaque' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Tipo Ensaque' /* Titulo */,
    null /* filtro,valorfiltro */,
    'E4_tipoEnsaque' /* nome_do_campo */,
  );
}
function zoomEspecieDest(row) {
  tdizoom.open(
    'dsEspecieDest' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Espécie Dest.' /* Titulo */,
    null /* filtro,valorfiltro */,
    'E8_especieDest' /* nome_do_campo */,
  );
}
/* PAINEL QUALIDADE */
function zoomPosIpiNcm(row) {
  tdizoom.open(
    'dsPosNcm' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Pos. IPI/NCM' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F4_pos_ipi' /* nome_do_campo */,
  );
}
function zoomExNcm(row) {
  tdizoom.open(
    'dsExNcm' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Ex. NCM' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F5_ex_ncm' /* nome_do_campo */,
  );
}
function zoomEspecieDest2(row) {
  tdizoom.open(
    'dsEspecieDest' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Espécie Dest.' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F13_especie_dest' /* nome_do_campo */,
  );
}
function zoomOnu(row) {
  tdizoom.open(
    'dsOnu' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'N° ONU' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F17_num_onu' /* nome_do_campo */,
  );
}
function zoomCodigoDcb(row) {
  tdizoom.open(
    'dsCodigoDcb' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Código DCB' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F26_codigo_dcb' /* nome_do_campo */,
  );
}
function zoomClasseFamPrd(row) {
  tdizoom.open(
    'dsClasseFamProd' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Classe Família Prod.' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F28_classe_familia_prd' /* nome_do_campo */,
  );
}
function zoomRespTecnic(row) {
  tdizoom.open(
    'dsRespTecnic' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Resp Tecnic.' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F29_resp_tecnico' /* nome_do_campo */,
  );
}
function zoomCodigoIbama(row) {
  tdizoom.open(
    'dsCodigoIbama' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Código IBAMA' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F34_codigo_IBAMA' /* nome_do_campo */,
  );
}
function zoomClasseImp(row) {
  tdizoom.open(
    'dsClasseImp' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Classe (IMP)' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F43_classe_imp' /* nome_do_campo */,
  );
}
function zoomProcObtencao(row) {
  tdizoom.open(
    'dsProcessoObtencao' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Processo Obtenção' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F45_processo_obtencao' /* nome_do_campo */,
  );
}
function zoomAplicacaoImp(row) {
  tdizoom.open(
    'dsAplicacaoImp' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Aplicação (IMP)' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F46_aplicacao_imp' /* nome_do_campo */,
  );
}
function zoomFinalidade2(row) {
  tdizoom.open(
    'dsFinalidadeQualidade' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Finalidade' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F47_finalidade' /* nome_do_campo */,
  );
}
function zoomCondArmazenagem(row) {
  tdizoom.open(
    'dsCondArmazenagem' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Condição de Armazenagem' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F50_condicao_armz' /* nome_do_campo */,
  );
}
function zoomUnMedAmostra(row) {
  tdizoom.open(
    'dsUnidadeMedida1' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Un. Medida Amostra' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F72_un_med_amostra' /* nome_do_campo */,
  );
}
function zoomEnsaio(row) {
  tdizoom.open(
    'dsEnsaio' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Ensaio' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F73_ensaio___'+row /* nome_do_campo */,
  );
}
function zoomLaboratorio(row) {
  tdizoom.open(
    'dsLaboratorio' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Laboratório' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F75_laboratorio___'+row /* nome_do_campo */,
  );
}
function zoomCategoriaPrd(row) {
  tdizoom.open(
    'dsCategoriaProd' /* nomeDataset */,
    'CLASSIFICACAOPROD,Classificação Prod.,CONVENIO,Convênio,DIVISAO,Divisão' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Categoria Produto' /* Titulo */,
    null /* filtro,valorfiltro */,
    'F80_categoria_prd' /* nome_do_campo */,
  );
}
/* PAINEL FISCAL */
function zoomGrupoTrib(row) {
  tdizoom.open(
    'dsGrupoTributario' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Grupo Trib.' /* Titulo */,
    null /* filtro,valorfiltro */,
    'G4_grupoTrib' /* nome_do_campo */,
  );
}
function zoomCodServIss(row) {
  tdizoom.open(
    'dsCodServIss' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Cód. Serv. ISS' /* Titulo */,
    null /* filtro,valorfiltro */,
    'G11_codServIss' /* nome_do_campo */,
  );
}
function zoomCest(row) {
  tdizoom.open(
    'dsCest' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'CEST' /* Titulo */,
    null /* filtro,valorfiltro */,
    'G12_cest' /* nome_do_campo */,
  );
}
function zoomTipoServico(row) {
  tdizoom.open(
    'dsTipoServ' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Tipo de Serviço' /* Titulo */,
    null /* filtro,valorfiltro */,
    'G16_tipoServico' /* nome_do_campo */,
  );
}
function zoomNbs(row) {
  tdizoom.open(
    'dsNbs' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'NBS' /* Titulo */,
    null /* filtro,valorfiltro */,
    'G18_nbs' /* nome_do_campo */,
  );
}
/* PAINEL CONTÁBIL */
function zoomContaContabil(row) {
  tdizoom.open(
    'dsContaContabil' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Conta Contábil' /* Titulo */,
    null /* filtro,valorfiltro */,
    'I3_contaContabil' /* nome_do_campo */,
  );
}
function zoomItemConta(row) {
  tdizoom.open(
    'dsItemConta' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Item Conta' /* Titulo */,
    null /* filtro,valorfiltro */,
    'I4_itemConta' /* nome_do_campo */,
  );
}
function zoomClasseValor(row) {
  tdizoom.open(
    'dsClasseValor' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Classe Valor' /* Titulo */,
    null /* filtro,valorfiltro */,
    'I5_classeValor' /* nome_do_campo */,
  );
}
/* PAINEL CUSTOS */
function zoomContaOrcament(row) {
  tdizoom.open(
    'dsContaOrcamentaria' /* nomeDataset */,
    'CODIGO,Código,DESCRICAO,Descrição' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,DESCRICAO' /* campoDataset1,campoDataset3 */,
    'Conta Orçamentária' /* Titulo */,
    null /* filtro,valorfiltro */,
    'J4_contaOrcament' /* nome_do_campo */,
  );
}
/* PAINEL LOGÍSTICA */
function zoomZonaArmaz(row) {
  tdizoom.open(
    'dsZonaArmazenagem', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Zona Armazenagem', // Titulo
    null, // filtro,valorfiltro
    'K10_zonaArmaz', // nome_do_campo
  );
}
function zoomServEntr(row) {
  tdizoom.open(
    'dsServEntrada', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Serv. Entrada', // Titulo
    null, // filtro,valorfiltro
    'K11_servEntr', // nome_do_campo
  );
}
function zoomServTrans(row) {
  tdizoom.open(
    'dsServTransf', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Serv. Transporte', // Titulo
    null, // filtro,valorfiltro
    'K12_servTrans', // nome_do_campo
  );
}
function zoomServSaida(row) {
  tdizoom.open(
    'dsServSaida', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Serv. Saída', // Titulo
    null, // filtro,valorfiltro
    'K13_servSaida', // nome_do_campo
  );
}
function zoomServEmb(row) {
  tdizoom.open(
    'dsServEmb', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Serviço/Emb.', // Titulo
    null, // filtro,valorfiltro
    'K15_servEmb', // nome_do_campo
  );
}
function zoomEndSaida(row) {
  tdizoom.open(
    'dsEndSaida', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Endereço Saída', // Titulo
    null, // filtro,valorfiltro
    'K16_endSaida', // nome_do_campo
  );
}
function zoomEndEntrada(row) {
  tdizoom.open(
    'dsEndSaida', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Endereço Entrada', // Titulo
    null, // filtro,valorfiltro
    'K18_endereco_entrada', // nome_do_campo
  );
}
/* PAINEL PLANEJAMENTO */
function zoomGrupo(row) {
  tdizoom.open(
    'dsGrupoProd', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Grupo', // Titulo
    null, // filtro,valorfiltro
    'L3_grupo', // nome_do_campo
  );
}
function zoomAgluMrp(row) {
  tdizoom.open(
    'dsAgluMrp', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Aglu. MRP', // Titulo
    null, // filtro,valorfiltro
    'L10_aglu_mrp', // nome_do_campo
  );
}
function zoomTipoRotulo(row) {
  tdizoom.open(
    'dsTipoRotulo', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Tipo Rótulo', // Titulo
    null, // filtro,valorfiltro
    'L12_tipo_rotulo', // nome_do_campo
  );
}
function zoomTipoRotuloPremix(row) {
  tdizoom.open(
    'dsTipoRotulo', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Tipo Rótulo Premix', // Titulo
    null, // filtro,valorfiltro
    'L13_tipo_rotulo_premix', // nome_do_campo
  );
}
function zoomTipoEnsaquePremix(row) {
  tdizoom.open(
    'dsTipoEnsaque', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Tipo Ensaque Premix', // Titulo
    null, // filtro,valorfiltro
    'L14_tipo_ensaque_premix', // nome_do_campo
  );
}
function zoomFormEstSeg(row) {
  tdizoom.open(
    'dsFormulas', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Form Est Seg', // Titulo
    null, // filtro,valorfiltro
    'L17_form_est_seg', // nome_do_campo
  );
}
function zoomFormPrazo(row) {
  tdizoom.open(
    'dsFormulas', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset3
    'Form Prazo', // Titulo
    null, // filtro,valorfiltro
    'L18_form_prazo', // nome_do_campo
  );
}

function zoomCliente(row) {
  tdizoom.open(
    'dsClientes', // nomeDataset
    'CODIGO,Código,LOJA,Loja,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,LOJA,DESCRICAO', // campoDataset1,campoDataset2
    'Cliente', // Titulo
    null, // filtro,valorfiltro
    `D7_cliente___${row}`, // nome_do_campo
  );
}

function zoomClienteCodFabricante(row) {
  tdizoom.open(
    'dsFabricantes', // nomeDataset
    'CODIGO,Código,LOJA,Loja,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,LOJA,DESCRICAO', // campoDataset1,campoDataset2
    'Fabricantes', // Titulo
    null, // filtro,valorfiltro
    `D11_clienteCodFabricante___${row}`, // nome_do_campo
  );
}

function zoomClienteCentroCusto(row) {
  tdizoom.open(
    'dsCentroCusto', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset2
    'Cliente: Centro Custo', // Titulo
    null, // filtro,valorfiltro
    `D13_clienteCentroCusto___${row}`, // nome_do_campo
  );
}
function zoomFornecedor(row) {
  tdizoom.open(
    'dsFornecedor', // nomeDataset
    'CODIGO,Código,LOJA,Loja,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,LOJA,DESCRICAO', // campoDataset1,campoDataset2
    'Fornecedor: Busca Fornecedor', // Titulo
    null, // filtro,valorfiltro
    `C8_fornecedor___${row}`, // nome_do_campo
  );
}
function zoomFabricante(row) {
  tdizoom.open(
    'dsFabricantes', // nomeDataset
    'CODIGO,Código,LOJA,Loja,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,LOJA,DESCRICAO', // campoDataset1,campoDataset2
    'Fornecedor: Busca Fabricante', // Titulo
    null, // filtro,valorfiltro
    `C11_fabricante___${row}`, // nome_do_campo
  );
}
function zoomSituacao(row) {
  tdizoom.open(
    'dsSituacao', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset2
    'Fornecedor: Situação', // Titulo
    null, // filtro,valorfiltro
    `C14_situacao___${row}`, // nome_do_campo
  );
}
function zoomUnidade(row) {
  tdizoom.open(
    'dsUnidadeMedida1', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset2
    'Fornecedor: Unidade', // Titulo
    null, // filtro,valorfiltro
    `C15_unidade___${row}`, // nome_do_campo
  );
}

function zoomEmpresa(row) {
  tdizoom.open(
    'dsEmpresas' /* nomeDataset */,
    'CODIGO,Empresa,FILIAL,Filial,NOME,Nome,CGC,CGC' /* campoDataset1,nomeColuna1,campoDataset2,nomeColuna2 */,
    'CODIGO,TENANTID,FILIAL,NOME,CGC' /* campoDataset1,campoDataset3 */,
    'Empresa' /* Titulo */,
    null /* filtro,valorfiltro */,
    'zoomEmpresa' /* nome_do_campo */,
  );
}

function LocateZoomWithInputId(buttonElement, functionName) {
  const input = $(buttonElement).closest('.input-group').find('.zoom-tdi');
  if (input.length > 0) {
    const inputId = input.attr('id');
    const id = inputId.split('___')[1];
    const functionToCall = window[functionName];

    if (typeof functionToCall === 'function') {
      functionToCall(id);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Função não encontrada',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Campo não encontrado',
    });
  }
}
function zoomSkipLote(row) {
  tdizoom.open(
    'dsSkipLote', // nomeDataset
    'CODIGO,Código,DESCRICAO,Descrição', // campoDataset1,nomeColuna1,campoDataset2,nomeColuna2
    'CODIGO,DESCRICAO', // campoDataset1,campoDataset2
    'Fornecedor: Skip Lote', // Titulo
    null, // filtro,valorfiltro
    `F63_skip_lote___${row}`, // nome_do_campo
  );
}
