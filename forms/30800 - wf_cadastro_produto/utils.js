var tdizoom = (function () {
  var zoommodal = null;
  var loading = FLUIGC.loading('#loading-zoom');
  return {
    /**
     * Função open
     * @description Aplica a personalização criada pela TOTVSIP ao campo do tipo Zoom. Utilize o tdizoom.open para zoom comum e tdizoomCheck.open para zoom com opção de multipla escolha.
     * @memberof TDIZOOM
     * @param {*} dataset Dataset a ser consultado
     * @param {*} fields Campos a serem mostrados
     * @param {*} resultfields
     * @param {*} title Título
     * @param {*} filters Filtros
     * @param {*} type Tipo
     * @param {*} likefield likefield
     * @param {*} likevalue likevalue
     * @param {*} searchby Pesquisar por
     * @returns Retorna HTML com o campo zoom personalizado
     * @example tdizoom.open("nomeDataset", "campoDataset1,nomeColuna1,campoDataset2,nomeColuna2", "campoDataset1,campoDataset3", "Titulo", "filtro,valorfiltro", "nome_do_campo");
     * @example TDIZOOM, ZOOM
     * @example
     * @author
     */
    //TODO: Rever descrição, descrever parâmetros e verificar o exemplo
    open: function (dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby) {
      isHeaderVisible = $('#workflowview-header', window.parent.document).is(':visible');
      isFixedVisible = $('.fixedTopBar', window.parent.document).is(':visible');
      isHeaderHide = null;
      isFixedHide = null;
      if (isHeaderVisible) {
        $('#workflowview-header', window.parent.document).hide();
        isHeaderHide = true;
      }
      if (isFixedVisible) {
        $('.fixedTopBar', window.parent.document).hide();
        isFixedHide = true;
      }

      //alert(window.innerHeight);
      mobile = typeof mobile !== 'undefined' ? mobile : 'false';
      if (mobile == 'true') {
        //$("form").hide();
      }

      console.log(likefield);

      loading.show();

      var showfields = [];
      var globaldataset = [];
      var current = 0;

      if (zoommodal != null) {
        zoommodal.remove();
        zoommodal = null;

        $('.table-zoom > thead').html('');
        $('.table-zoom > tbody').html('');
      }

      var html = "<body class='fluig-style-guide' style='z-index:-1'>";
      html += "<div class='input-group'>";
      html += "<span class='input-group-addon'><span class='fluigicon fluigicon-search'></span></span>";
      html +=
        "<input autocomplete='off' type='text' class='form-control' id='search' value='' placeholder='Digite o texto e utilize o <Enter> para buscar'>";
      html += '</div>';
      if (typeof miniZoom != 'undefined') {
        html += "<div class='' id='loading-zoom' style='overflow-y: auto; height: 120px;'>";
      } else {
        html += "<div class='' id='loading-zoom' style='overflow-y: auto; height: 300px;'>";
      }
      html += "<table  class='table table-hover table-zoom'>";
      html += '<thead>';
      html += '</thead>';
      html += '<tbody>';
      html += '</tbody>';
      html += '</table>';
      html += '</div>';
      html += '</body>';
      html += '</body>';

      html += ' <div>';
      html += "		<span class='form-control-static pull-left'>";
      html += "			<font color='#FF0000' >Para a busca mais detalhada digitar palavra ou parte dela no campo de busca. </font>";
      html += '		</span>';
      html += ' </div>';

      var sizeZoom = 'full';
      if (typeof miniZoom != 'undefined') {
        sizeZoom = 'large';
      }

      var zoommodal = FLUIGC.modal(
        {
          title: title,
          content: html,
          formModal: false,
          size: sizeZoom,
          id: 'modal-zoom-' + type,
          actions: [
            {
              label: 'Selecionar',
              classType: 'zoom-selected btn-warning',
              autoClose: false,
            },
            {
              label: 'Limpar',
              classType: 'zoom-close',
              autoClose: false,
            },
            {
              label: 'Top',
              classType: 'zoom-top btn-primary',
              autoClose: false,
            },
          ],
        },
        function (err, data) {
          if (err) {
            FLUIGC.toast({ title: 'Erro:', message: err, type: 'danger' });
          } else {
            var trimarray = function (fields) {
              for (var i = 0; i < fields.length; i++) {
                fields[i] = fields[i].trim();
              }
              return fields;
            };

            var urlrequest = function () {
              var request = '/ecm/api/rest/ecm/dataset/',
                json = {};

              if (dataset != null) {
                request += 'getDatasetZoom';
                json.datasetId = dataset;
              } else if (cardDatasetId != null) {
                request += 'getCardDatasetValues';
                json.cardDatasetId = cardDatasetId;
              }

              if (resultfields != null && resultfields.length > 0) {
                json.resultFields = trimarray(resultfields.split(','));
              }

              if (filters != null && filters.length > 0) {
                json.filterFields = trimarray(filters.split(','));
              }

              if (likefield != null && likefield.length > 0 && likevalue != null && likevalue.length > 0) {
                json.likeField = likefield;
                json.likeValue = likevalue;
              }

              var searchValue = $('#search').val();
              if (searchValue && searchValue.length > 0) {
                json.searchValue = searchValue;

                if (searchby && searchby != '') {
                  json.searchField = searchby;
                } else {
                  json.searchField = fields.split(',')[0];
                }
              } else if (searchValue == '') {
                json.searchValue = '';

                if (searchby && searchby != '') {
                  json.searchField = searchby;
                } else {
                  json.searchField = fields.split(',')[0];
                }
              }

              return (request += '?json=' + encodeURIComponent(JSON.stringify(json)));
            };

            var searchtable = function (text) {
              var keys = typeof zoomKeyUp !== 'undefined' ? zoomKeyUp : 1;
              if (text.length >= keys || text.length == 0) {
                var table = $('.table-zoom > tbody');
                table.find('tr').each(function (index, row) {
                  var allCells = $(row).find('td');
                  if (allCells.length > 0) {
                    var found = false;
                    allCells.each(function (index, td) {
                      var regExp = new RegExp(text, 'i');
                      if (regExp.test($(td).text())) {
                        found = true;
                        return false;
                      }
                    });
                    if (found == true) $(row).show();
                    else $(row).hide();
                  }
                });
              }
            };

            var setup = function (lista) {
              $('.table-zoom > thead').html('');
              var l = lista.split(',');
              var html = '<tr>';
              for (var i = 0; i < l.length; i++) {
                showfields.push(l[i]);
                html += '<th>' + l[i + 1] + '</th>';
                i++;
              }
              html += '</tr>';
              $('.table-zoom > thead').append(html);
            };

            var readydataset = function (dataset) {
              globaldataset = dataset;
              for (var i = 0; i < dataset.length; i++) {
                var row = dataset[i];
                if (i == 0) {
                  var classe = 'active';
                } else {
                  var classe = '';
                }
                var html = '<tr data-dataset=' + i + " class='" + classe + "'>";
                for (var x = 0; x < showfields.length; x++) {
                  html += '<td>' + row[showfields[x]] + '</td>';
                }
                html += '</tr>';
                $('.table-zoom > tbody').append(html);
              }
              $('.table-zoom > tbody > tr').click(function () {
                $('.table-zoom > tbody > tr').removeClass('active');
                $(this).addClass('active');
                current = $(this).data('dataset');
              });
              $('.table-zoom > tbody > tr').dblclick(function () {
                var row = globaldataset[$(this).data('dataset')];
                row['type'] = type;
                zoommodal.remove();
                setSelectedZoomItem(row);
                if (isHeaderHide) {
                  $('#workflowview-header', window.parent.document).show();
                }
                if (isFixedHide) {
                  $('.fixedTopBar', window.parent.document).show();
                }

                if (mobile == 'true') {
                  //$("form").show();
                }
                $('#' + type)
                  .nextAll('input')
                  .first()
                  .focus();
              });
              $('#search').focus();
              loading.hide();
            };
            var finished = true;
            var dosearch = function () {
              finished = false;
              var url = urlrequest();
              $('.table-zoom > tbody').html('');

              console.log('url', url);

              loading.show();

              $.ajax({
                type: 'GET',
                dataType: 'json',
                url: url,
                data: '',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                  console.log('dataset error', XMLHttpRequest, textStatus, errorThrown);
                  finished = true;
                },
                success: function (data, status, xhr) {
                  console.log('dataset sucess', data, status, xhr);
                  var dataset = data['invdata'];
                  const isHourRelated = dataset.some((itm) => itm?.DESCRICAO?.includes('HS')); //If we sort hour then 22h comes before 3h
                  let sortQuery;
                  if (dataset && dataset.length && dataset[0]['NOME']) sortQuery = 'NOME';
                  else if (dataset && dataset.length && dataset[0]['CODIGO']) sortQuery = 'CODIGO';
                  else if (dataset && dataset.length && dataset[0]['DESCRICAO'] && !isHourRelated) sortQuery = 'DESCRICAO';
                  if (Array.isArray(dataset)) dataset = dataset.sortByProperty(sortQuery);
                  readydataset(dataset);
                  finished = true;
                },
              });
            };

            var timeout;
            $('#search').keyup(function (e) {
              console.log('search', e);
              clearTimeout(timeout);
              var keycode;
              if (window.event) {
                keycode = window.event.keyCode;
              } else if (e) {
                keycode = e.which;
              } else {
                return true;
              }
              console.log('search', keycode);
              if (keycode == 13) {
                if (finished) {
                  dosearch();
                }
              } else {
                timeout = setTimeout(searchtable($(this).val()), 500);
              }
            });

            $('.zoom-selected').click(function () {
              var row = globaldataset[current];
              row['type'] = type;
              zoommodal.remove();
              setSelectedZoomItem(row);
              if (isHeaderHide) {
                $('#workflowview-header', window.parent.document).show();
              }
              if (isFixedHide) {
                $('.fixedTopBar', window.parent.document).show();
              }

              if (mobile == 'true') {
                //$("form").show();
              }
              $('#' + type)
                .nextAll('input')
                .first()
                .focus();
            });

            $('.zoom-close').click(function () {
              if (isHeaderHide) {
                $('#workflowview-header', window.parent.document).show();
              }
              if (isFixedHide) {
                $('.fixedTopBar', window.parent.document).show();
              }
              if (mobile == 'true') {
                //$("form").show();
              }
              $('#' + type).val('');
              //			 			$("#"+type).val($("#search").val());
              //			 			$("#"+type).trigger("change");
              removedZoomItem(type);
              zoommodal.remove();
              $('#' + type).focus();
            });

            $('.zoom-top').click(function () {
              $('#loading-zoom').scrollTop(0);
            });

            $('.modal-header .close').click(function () {
              if (isHeaderHide) {
                $('#workflowview-header', window.parent.document).show();
              }
              if (isFixedHide) {
                $('.fixedTopBar', window.parent.document).show();
              }
              if (mobile == 'true') {
                //$("form").show();
              }
            });

            setup(fields);
            dosearch();
          }
        },
      );
      Array.prototype.sortByProperty = function (p) {
        return this.slice(0).sort(function (a, b) {
          return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
        });
      };
    },
    /**
     * Função trigger
     * @description Realiza o gatilho do campo zoom personalizado baseado nos parametros informados. (chama as funções padrões setSelectedZoomItem e removedZoomItem)
     * @memberof TDIZOOM
     * @param {*} dataset Dataset a ser consultado
     * @param {*} searchby Pesquisar por
     * @param {*} searchValue Valor a ser pesquisado
     * @param {*} filters Filtro
     * @param {*} type Tipo
     * @example tdizoom.trigger("nomeDataset", "campoDatasetPesquisar", "valorPesquisar", "filtro,valorfiltro", "nome_do_campo");
     * @example TDIZOOM, ZOOM
     * @example
     * @author Alisson Hausmann
     */
    trigger: function (dataset, searchby, searchValue, filters, type) {
      var trimarray = function (fields) {
        for (var i = 0; i < fields.length; i++) {
          fields[i] = fields[i].trim();
        }
        return fields;
      };
      var urlrequest = function () {
        var request = '/ecm/api/rest/ecm/dataset/';
        var json = {};

        if (dataset != null) {
          request += 'getDatasetZoom';
          json.datasetId = dataset;
        } else if (cardDatasetId != null) {
          request += 'getCardDatasetValues';
          json.cardDatasetId = cardDatasetId;
        }

        if (filters != null && filters.length > 0) {
          json.filterFields = trimarray(filters.split(','));
        }

        if (searchValue && searchValue.length > 0) {
          json.searchValue = searchValue;
          json.searchField = searchby;
        } else if (searchValue == '') {
          json.searchValue = '';
          json.searchField = searchby;
        }
        return (request += '?json=' + encodeURI(JSON.stringify(json)));
      };

      var dosearch = function () {
        var url = urlrequest();
        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: url,
          data: '',
          error: function () {
            removedZoomItem(type);
          },
          success: function (data) {
            var dataset = data['invdata'];
            if (dataset.length > 0 && searchValue.trim() != '') {
              var row = dataset[0];
              row['type'] = type;
              setSelectedZoomItem(row);
            } else {
              removedZoomItem(type);
            }
          },
        });
      };
      dosearch();
    },
  };
})();

function evitaDigitarZoom() {
  $('.zoom-tdi').on('keypress', function () {
    event.preventDefault();
    FLUIGC.toast({
      title: '',
      message: 'Clique na lupa para buscar',
      type: 'info',
    });
  });
  $('.datetime').on('keypress', function () {
    event.preventDefault();
    FLUIGC.toast({
      title: '',
      message: 'Clique no campo para buscar',
      type: 'info',
    });
  });
}
// Função genérica para verificar qual radio button está preenchido e atribuir valor a um campo hidden
function atualizarCampoHidden(radioName, hiddenFieldId) {
  $('input[name="' + radioName + '"]').on('change', function () {
    var selectedValue = $('input[name="' + radioName + '"]:checked').val() ?? '';
    $('#' + hiddenFieldId).val(selectedValue);
  });
}

function atualizarCampoRadio(radioName, idHiddenField) {
  const value = $('#'+idHiddenField).val();
  if (value) {
    $(`input[name="${radioName}"][value="${value}"]`).prop('checked', true);
  } else {
    $(`input[name="${radioName}"]`).prop('checked', false);
  }
}

// Função genérica para verificar qual caminho o processo irá seguir, de acordo com o tipo de produto
function verificaCaminhoProcesso() {
  var caminho = $('#hd_B4_tipo').val();
  if (caminho == 'caminho3') {
    $('#L28_retorno8').parent().hide();
    $('#stepTecnico').hide();
    $('#F85_retorno3').parent().hide();
    $('#G22_retorno3').parent().hide();
    $('#H10_retorno3').parent().hide();
    $('#L28_retorno7').parent().hide();
    $('#stepQualidade').hide();
    $('#G22_retorno4').parent().hide();
    $('#H10_retorno4').parent().hide();
    $('#L28_retorno6').parent().hide();
    $('#stepLogistica').hide();
    $('#L28_retorno1').parent().hide();
    $('#stepPlanejamento').hide();
  } else if (caminho == 'caminho2') {
    $('#stepTecnico').hide();
    $('#F85_retorno3').parent().hide();
    $('#G22_retorno3').parent().hide();
    $('#H10_retorno3').parent().hide();
    $('#L28_retorno7').parent().hide();
  } else {
  }
}

function aplicarMascaraNumerica() {
  $('#B7_qntdeEmbalagens').mask('000000000', { reverse: true });
  $('#B8_fatorConversao').mask('00.00', { reverse: true });
  $('#F88_fatorConversao').mask('0000.00', { reverse: true });
  $('#B9_pesoBruto').mask('0000000.0000', { reverse: true });
  $('#C5_lote_minimo').mask('000000000.00', { reverse: true });
  $('#C6_lote_econom').mask('000000000.00', { reverse: true });
  $('#D5_margem_bruto').mask('000.00', { reverse: true });
  $('#E6_diasValidade').mask('0000', { reverse: true });
  $('#F6_nota_minima').mask('0', { reverse: true });
  // $('#F11_dias_validade').mask('0000', { reverse: true }); //! SOLICITADO REMOCAO DO CAMPO - MIT006 - Arcanjo ID178
  $('#F44_grau_pureza').mask('000.00', { reverse: true });
  $('#F58_concentracao').mask('000.00', { reverse: true });
  $('#F59_densidade').mask('000.00', { reverse: true });
  $('#F60_prazo_cq').mask('00', { reverse: true });
  $('#G3_aliqIpi').mask('000.00', { reverse: true });
  $('#G7_csll').mask('000.00', { reverse: true });
  $('#G8_cofins').mask('000.00', { reverse: true });
  $('#G9_pis').mask('000.00', { reverse: true });
  $('#G10_aliqIss').mask('000.00', { reverse: true });
  $('#J6_varCambial').mask('000.00', { reverse: true });
  $('#K7_largura').mask('00000.00', { reverse: true });
  $('#K8_comprimento').mask('00000.00', { reverse: true });
  $('#K9_altura').mask('00000.00', { reverse: true });
  $('#L8_dias_es').mask('000', { reverse: true });
  $('#L15_ponto_pedido').mask('0000000.0000', { reverse: true });
  $('#L16_seguranca').mask('0000000.0000', { reverse: true });
  $('#L19_entrega').mask('00000', { reverse: true });
  $('#L21_tolerancia').mask('000', { reverse: true });
  $('#L24_prazo_validade').mask('000', { reverse: true });
  $('#L25_estoque_maximo').mask('0000000.0000', { reverse: true });

  // Adiciona tratamento para garantir que apenas números sejam permitidos
  /* $('#B7_qntdeEmbalagens, #B8_fatorConversao, #B9_pesoBruto').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  }); */
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
